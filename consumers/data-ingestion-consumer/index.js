// worker.js
require("dotenv").config();
const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");

const Customer = require("./models/customer");
const Order = require("./models/order");

// Config
const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(",") || [
  "localhost:9092",
];
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID;
const KAFKA_TOPICS = ["customer-ingestion", "order-ingestion"];
const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;
const MONGO_URI = process.env.MONGO_URI;

// Kafka setup
const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
  ssl: {},
  sasl: {
    mechanism: "scram-sha-256",
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD,
  },
});

const consumer = kafka.consumer({ groupId: KAFKA_GROUP_ID });

let messageBuffer = [];
let processingTimeout = null;
const BATCH_SIZE = 100;
const BATCH_INTERVAL_MS = 1500;

const processBatch = async () => {
  if (messageBuffer.length === 0) return;

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
      console.log(`✅ Upserted ${customerOps.length} customers`);
    } catch (err) {
      console.error("❌ Customer bulkWrite error:", err);
    }
  }

  if (orderInserts.length > 0) {
    const validOrders = [];
    for (const order of orderInserts) {
      const exists = await Customer.exists({ _id: order.customerId });
      if (exists) validOrders.push(order);
    }

    if (validOrders.length > 0) {
      try {
        await Order.insertMany(validOrders);
        console.log(`📦 Inserted ${validOrders.length} orders`);
      } catch (err) {
        console.error("❌ Order insert error:", err);
      }
    }
  }
};

const runWorker = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await consumer.connect();
    console.log("✅ Kafka consumer connected");

    await consumer.subscribe({ topics: KAFKA_TOPICS, fromBeginning: false });
    console.log(`📡 Subscribed to: ${KAFKA_TOPICS.join(", ")}`);

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
  } catch (err) {
    console.error("❌ Worker setup error:", err);
    await shutdown();
    process.exit(1);
  }
};

const shutdown = async () => {
  console.log("\n🛑 Shutting down...");
  if (processingTimeout) {
    clearTimeout(processingTimeout);
    await processBatch();
  }
  await consumer.disconnect().catch(console.error);
  await mongoose.disconnect().catch(console.error);
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

runWorker();
