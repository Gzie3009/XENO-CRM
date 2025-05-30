const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");
const express = require("express"); // Import Express
require("dotenv").config();

// Kafka Configuration from .env
const KAFKA_BROKERS = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : ["localhost:9092"];
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID;
const KAFKA_TOPICS = ["customer-ingestion", "order-ingestion"];

// MongoDB Configuration from .env
const MONGO_URI = process.env.MONGO_URI;

console.log(KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_GROUP_ID, MONGO_URI);

// Express Server Configuration
const PORT = process.env.PORT || 4001; // Consumer will listen on this port for health checks

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
  // Add SASL configuration if using a managed Kafka service (e.g., Confluent Cloud)
  // sasl: {
  //   mechanism: 'plain', // Or 'scram-sha-256', 'scram-sha-512'
  //   username: process.env.KAFKA_API_KEY,
  //   password: process.env.KAFKA_API_SECRET,
  // },
  // ssl: true, // Typically true for managed services
});

const consumer = kafka.consumer({ groupId: KAFKA_GROUP_ID });

const Customer = require("./models/customer");
const Order = require("./models/order");

const app = express();
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  const kafkaReady = consumer.isConnected(); // Check if KafkaJS consumer is connected
  const mongoReady = mongoose.connection.readyState === 1; // 1 means 'connected'

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

const runConsumer = async () => {
  try {
    // Start the Express server first for health checks
    await startExpressServer();

    // Connect to Kafka
    await consumer.connect();
    console.log("Kafka Consumer Connected!");

    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected via Mongoose!");

    // Subscribe to topics
    await consumer.subscribe({ topics: KAFKA_TOPICS, fromBeginning: true });
    console.log(`Subscribed to Kafka topics: ${KAFKA_TOPICS.join(", ")}`);

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          console.log(`Received message from topic ${topic}:`, data);

          switch (topic) {
            case "customer-ingestion":
              const customerDataToSave = {
                ...data,
                updatedAt: new Date(),
                lastPurchaseDate: data.lastPurchaseDate
                  ? new Date(data.lastPurchaseDate)
                  : new Date(),
              };
              await Customer.findOneAndUpdate(
                { email: customerDataToSave.email },
                customerDataToSave,
                { upsert: true, new: true, setDefaultsOnInsert: true }
              );
              console.log(
                `Customer data upserted for: ${customerDataToSave.email}`
              );
              break;
            case "order-ingestion":
              const customer = await Customer.findOne({
                _id: data.customerId,
              });
              if (!customer) {
                console.warn(
                  `Order received for non-existent customer id: ${data.customerId}. Skipping.`
                );
                return;
              }
              const orderDataToSave = {
                ...data,
                customerId: customer._id,
                orderDate: data.orderDate
                  ? new Date(data.orderDate)
                  : new Date(),
                updatedAt: new Date(),
              };
              await Order.create(orderDataToSave);
              console.log(`New order created for customer: ${customer.email}`);
              break;
            default:
              console.warn(`Received message from unknown topic: ${topic}`);
          }
        } catch (parseOrDbError) {
          console.error(
            "Error processing message or saving to DB:",
            parseOrDbError
          );
          console.error("Raw message:", message.value.toString());
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

// Handle graceful shutdown for both Kafka and MongoDB
const gracefulShutdown = async () => {
  console.log("\nShutting down consumer...");
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




