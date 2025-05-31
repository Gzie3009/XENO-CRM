require("dotenv").config();
const express = require("express");
const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");
const CommunicationLog = require("./models/communicationLog");
const Campaign = require("./models/campaign");

const app = express();
const PORT = process.env.PORT || 5010;

// Kafka config
const kafka = new Kafka({
  clientId:
    process.env.KAFKA_CLIENT_ID_DELIVERY_RECEIPT ||
    "delivery-receipt-consumer-client",
  brokers: process.env.KAFKA_BROKERS
    ? process.env.KAFKA_BROKERS.split(",")
    : ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID_DELIVERY_RECEIPT,
  fromBeginning: false,
});
const KAFKA_TOPIC =
  process.env.KAFKA_TOPIC_DELIVERY_RECEIPT || "campaign-delivery-receipts";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected (Delivery Receipt Consumer)");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

// Buffer & batching
let messageBuffer = [];
let processingTimeout = null;
const BATCH_SIZE = 100;
const BATCH_INTERVAL_MS = 1500;

const processBatch = async () => {
  if (messageBuffer.length === 0) {
    processingTimeout = null;
    return;
  }

  const currentBatch = [...messageBuffer];
  messageBuffer = [];

  console.log(
    `📦 Processing batch of ${currentBatch.length} delivery receipts`
  );

  const communicationLogIds = currentBatch.map(
    (item) => item.communicationLogId
  );

  try {
    // Fetch related logs to get campaignIds
    const logs = await CommunicationLog.find(
      { _id: { $in: communicationLogIds } },
      "_id campaignId"
    ).lean();

    const logIdToCampaignIdMap = {};
    logs.forEach((log) => {
      logIdToCampaignIdMap[log._id.toString()] = log.campaignId.toString();
    });

    const campaignStats = {}; // { [campaignId]: { delivered: 0, failed: 0 } }

    const operations = currentBatch
      .map((item) => {
        const campaignId = logIdToCampaignIdMap[item.communicationLogId];
        if (!campaignId) return null;

        // Track delivery stats
        if (!campaignStats[campaignId]) {
          campaignStats[campaignId] = { delivered: 0, failed: 0 };
        }
        if (item.status === "SENT") campaignStats[campaignId].delivered++;
        if (item.status === "FAILED") campaignStats[campaignId].failed++;

        return {
          updateOne: {
            filter: { _id: item.communicationLogId },
            update: {
              $set: {
                deliveryStatus: item.status,
                timestamp: new Date(item.timestamp),
              },
            },
          },
        };
      })
      .filter(Boolean); // remove nulls

    // Perform bulk update of logs
    const result = await CommunicationLog.bulkWrite(operations);
    console.log(`✅ Bulk update: ${result.modifiedCount} logs updated.`);

    // Now update each campaign
    for (const [campaignId, stats] of Object.entries(campaignStats)) {
      await Campaign.findByIdAndUpdate(campaignId, {
        $inc: {
          "deliveryStats.sentCount": stats.delivered,
          "deliveryStats.failedCount": stats.failed,
        },
      });

      // Check if campaign is done
      const campaign = await Campaign.findById(campaignId).lean();
      const totalDelivered =
        (campaign.deliveryStats.sentCount || 0) + stats.delivered;
      const totalFailed =
        (campaign.deliveryStats.failedCount || 0) + stats.failed;

      if (totalDelivered + totalFailed >= campaign.totalAudienceSize) {
        await Campaign.findByIdAndUpdate(campaignId, {
          status: "COMPLETED",
          completedAt: new Date(),
        });
        console.log(`✅ Campaign ${campaignId} marked as COMPLETED`);
      }
    }
  } catch (error) {
    console.error("❌ Error processing batch:", error);
  } finally {
    processingTimeout = null;
  }
};

// Kafka consumer runner
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { communicationLogId, status, reason, timestamp } = JSON.parse(
          message.value.toString()
        );
        messageBuffer.push({ communicationLogId, status, reason, timestamp });

        if (messageBuffer.length >= BATCH_SIZE) {
          if (processingTimeout) clearTimeout(processingTimeout);
          await processBatch();
        } else if (!processingTimeout) {
          processingTimeout = setTimeout(processBatch, BATCH_INTERVAL_MS);
        }
      } catch (error) {
        console.error("❌ Error parsing message:", error);
      }
    },
  });
};

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Delivery Receipt Consumer is running." });
});

// Start server and consumer
const start = async () => {
  await connectDB();
  await runConsumer();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("❌ Startup error:", err);
  process.exit(1);
});

// Graceful shutdown
["SIGINT", "SIGTERM"].forEach((sig) =>
  process.on(sig, async () => {
    console.log(`\n🔻 Shutting down on ${sig}...`);
    if (processingTimeout) {
      clearTimeout(processingTimeout);
      await processBatch();
    }
    await consumer.disconnect();
    await mongoose.disconnect();
    console.log("✅ Shutdown complete");
    process.exit(0);
  })
);
