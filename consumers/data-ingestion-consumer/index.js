const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const KAFKA_BROKERS = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : ["localhost:9092"];
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID;
const KAFKA_TOPICS = ["customer-ingestion", "order-ingestion"];

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4001;

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
});

const consumer = kafka.consumer({
  groupId: KAFKA_GROUP_ID,
  fromBeginning: false,
});
const Customer = require("./models/customer");
const Order = require("./models/order");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  const kafkaReady = consumer.isConnected();
  const mongoReady = mongoose.connection.readyState === 1;

  if (kafkaReady && mongoReady) {
    res.status(200).json({
      status: "OK",
      kafka: "connected",
      mongodb: "connected",
      message: "Consumer is healthy and connected.",
    });
  } else {
    res.status(503).json({
      status: "Service Unavailable",
      kafka: kafkaReady ? "connected" : "disconnected",
      mongodb: mongoReady ? "connected" : "disconnected",
      message: "Consumer is not fully connected to all services.",
    });
  }
});

const startExpressServer = () => {
  return new Promise((resolve, reject) => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error(`Failed to start Express server on port ${PORT}:`, err);
        return reject(err);
      }
      console.log(`Express health check server listening on port ${PORT}`);
      resolve();
    });
  });
};

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

  const customerOps = [];
  const orderInserts = [];

  for (const { topic, data } of currentBatch) {
    if (topic === "customer-ingestion") {
      customerOps.push({
        updateOne: {
          filter: { email: data.email },
          update: {
            ...data,
            updatedAt: new Date(),
            lastPurchaseDate: data.lastPurchaseDate
              ? new Date(data.lastPurchaseDate)
              : new Date(),
          },
          upsert: true,
          setDefaultsOnInsert: true,
        },
      });
    } else if (topic === "order-ingestion") {
      orderInserts.push({
        ...data,
        orderDate: data.orderDate ? new Date(data.orderDate) : new Date(),
        updatedAt: new Date(),
      });
    }
  }

  if (customerOps.length > 0) {
    try {
      await Customer.bulkWrite(customerOps);
      console.log(`✅ Bulk upserted ${customerOps.length} customers`);
    } catch (err) {
      console.error("❌ Customer bulkWrite error:", err);
    }
  }

  if (orderInserts.length > 0) {
    const validOrders = [];
    for (const order of orderInserts) {
      const customerExists = await Customer.exists({ _id: order.customerId });
      if (customerExists) validOrders.push(order);
    }

    if (validOrders.length > 0) {
      try {
        await Order.insertMany(validOrders);
        console.log(`📦 Bulk inserted ${validOrders.length} orders`);
      } catch (err) {
        console.error("❌ Order insertMany error:", err);
      }
    }
  }

  processingTimeout = null;
};

const runConsumer = async () => {
  try {
    await startExpressServer();
    await consumer.connect();
    console.log("Kafka Consumer Connected!");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected via Mongoose!");
    await consumer.subscribe({ topics: KAFKA_TOPICS, fromBeginning: false });
    console.log(`Subscribed to Kafka topics: ${KAFKA_TOPICS.join(", ")}`);

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          messageBuffer.push({ topic, data });

          if (messageBuffer.length >= BATCH_SIZE) {
            if (processingTimeout) clearTimeout(processingTimeout);
            await processBatch();
          } else if (!processingTimeout) {
            processingTimeout = setTimeout(processBatch, BATCH_INTERVAL_MS);
          }
        } catch (err) {
          console.error("❌ Failed to parse message:", err);
        }
      },
    });
  } catch (criticalError) {
    console.error(
      "Critical error during consumer setup or connection:",
      criticalError
    );
    await consumer
      .disconnect()
      .catch((e) => console.error("Error disconnecting Kafka consumer:", e));
    await mongoose
      .disconnect()
      .catch((e) => console.error("Error disconnecting Mongoose:", e));
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  console.log("\nShutting down consumer...");
  if (processingTimeout) {
    clearTimeout(processingTimeout);
    await processBatch();
  }
  if (consumer) {
    await consumer.disconnect();
    console.log("Kafka Consumer Disconnected.");
  }
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    console.log("MongoDB Connection Closed.");
  }
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

runConsumer();
