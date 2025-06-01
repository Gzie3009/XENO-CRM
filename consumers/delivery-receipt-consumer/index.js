require("dotenv").config();
const express = require("express");
const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");
const CommunicationLog = require("./models/communicationLog");
const Campaign = require("./models/campaign");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;

// Kafka setup
const kafka = new Kafka({
  clientId:
    process.env.KAFKA_CLIENT_ID_DELIVERY_RECEIPT ||
    "delivery-receipt-consumer-client",
  brokers: process.env.KAFKA_BROKERS
    ? process.env.KAFKA_BROKERS.split(",")
    : ["localhost:9092"],
  ssl: {},
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID_DELIVERY_RECEIPT,
  fromBeginning: false,
});
const KAFKA_TOPIC = process.env.KAFKA_TOPIC_DELIVERY_RECEIPT;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected (Delivery Worker)");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

// Batching logic
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
    const logs = await CommunicationLog.find(
      { _id: { $in: communicationLogIds } },
      "_id campaignId"
    ).lean();

    const logIdToCampaignIdMap = {};
    logs.forEach((log) => {
      logIdToCampaignIdMap[log._id.toString()] = log.campaignId.toString();
    });

    const campaignStats = {};

    const operations = currentBatch
      .map((item) => {
        const campaignId = logIdToCampaignIdMap[item.communicationLogId];
        if (!campaignId) return null;

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
      .filter(Boolean);

    const result = await CommunicationLog.bulkWrite(operations);
    console.log(`✅ Bulk update: ${result.modifiedCount} logs updated.`);

    for (const [campaignId, stats] of Object.entries(campaignStats)) {
      await Campaign.findByIdAndUpdate(campaignId, {
        $inc: {
          "deliveryStats.sentCount": stats.delivered,
          "deliveryStats.failedCount": stats.failed,
        },
      });

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

// Kafka consumer logic
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

// Health check endpoint
app.get("/health", async (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const kafkaState = consumer ? "connected" : "disconnected";

  res.json({
    status: "ok",
    mongo: mongoState === 1 ? "connected" : "disconnected",
    kafka: kafkaState,
  });
});

// Start everything
let server;

const startServer = async () => {
  await connectDB();
  await runConsumer();

  server = app.listen(PORT, () => {
    console.log(`🚀 Express server listening on port ${PORT}`);
  });
};

startServer().catch((err) => {
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

    if (consumer) await consumer.disconnect();
    if (mongoose.connection.readyState === 1) await mongoose.disconnect();
    if (server) server.close(() => console.log("🛑 HTTP server closed"));

    console.log("✅ Graceful shutdown complete");
    process.exit(0);
  })
);
