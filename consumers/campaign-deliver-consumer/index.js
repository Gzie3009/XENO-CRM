require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { Kafka } = require("kafkajs");
const morgan = require("morgan");

const Campaign = require("./models/campaign");
const CommunicationLog = require("./models/communicationLog");
const customer = require("./models/customer");

const app = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 5001;

// Kafka setup
const KAFKA_BROKERS = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : ["localhost:9092"];
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || "campaign-consumer";
const KAFKA_TOPIC_CAMPAIGN_TRIGGER =
  process.env.KAFKA_TOPIC_CAMPAIGN_TRIGGER || "campaign-trigger";
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || "campaign-delivery-group";
const DUMMY_VENDOR_API_URL =
  process.env.DUMMY_VENDOR_API_URL ||
  "http://localhost:4008/send-campaign-message";

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
  ssl: {},
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

const consumer = kafka.consumer({
  groupId: KAFKA_GROUP_ID,
  fromBeginning: false,
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

// Dummy vendor API sender
async function sendToDummyVendorAPI(logId, email, phone, message) {
  try {
    await axios.post(
      DUMMY_VENDOR_API_URL,
      {
        communicationLogId: logId,
        email,
        phone,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.VENDOR_API_KEY,
        },
      }
    );
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error(`❌ Error for log ${logId}:`, message);
  }
}

// Kafka consumer logic
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: KAFKA_TOPIC_CAMPAIGN_TRIGGER,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        const { campaignId, customerFetchPipeline, messageTemplate } = payload;

        const customers = await customer.aggregate(customerFetchPipeline);
        console.log(
          `🎯 Campaign ${campaignId} — ${customers.length} customers`
        );

        if (customers.length === 0) {
          await Campaign.findByIdAndUpdate(campaignId, {
            status: "COMPLETED",
            completedAt: new Date(),
            "deliveryStats.totalAudienceSize": 0,
          });
          return;
        }

        await Campaign.findByIdAndUpdate(campaignId, { status: "IN_PROGRESS" });

        for (const customer of customers) {
          const personalizedMessage = messageTemplate
            .replace("{{name}}", customer.name || "Customer")
            .replace("{{email}}", customer.email)
            .replace("{{phone}}", customer.phone)
            .replace("{{lastPurchaseDate}}", customer.lastPurchaseDate);

          const newLog = new CommunicationLog({
            campaignId: campaignId,
            customerId: customer._id,
            messageSent: personalizedMessage,
            deliveryStatus: "PENDING",
            timestamp: new Date(),
          });

          await newLog.save();

          await sendToDummyVendorAPI(
            newLog._id.toString(),
            customer.email,
            customer.phone,
            personalizedMessage
          );
        }

        console.log(`✅ Campaign ${campaignId} messages dispatched.`);
      } catch (err) {
        console.error("❌ Error processing Kafka message:", err);
      }
    },
  });
};

app.get("/health", (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({
    status: "ok",
    mongo: mongoStatus,
    kafkaTopics: KAFKA_TOPIC_CAMPAIGN_TRIGGER,
  });
});

// Start server and Kafka consumer
const start = async () => {
  await connectDB();
  await runConsumer();

  app.listen(PORT, () => {
    console.log(`🚀 Express server listening on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error("❌ Worker startup failed:", err);
  process.exit(1);
});

// Graceful shutdown
["SIGINT", "SIGTERM"].forEach((sig) =>
  process.on(sig, async () => {
    console.log("\n🔁 Shutting down gracefully...");
    await consumer.disconnect();
    await mongoose.disconnect();
    process.exit(0);
  })
);
