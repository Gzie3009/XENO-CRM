const { Kafka } = require("kafkajs");
require("dotenv").config();

// Kafka Producer Configuration from .env
const KAFKA_BROKERS = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : ["localhost:9092"];
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID + "-backend";

// Initialize Kafka Producer
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

const producer = kafka.producer();

// Function to connect the Kafka producer
async function connectProducer() {
  try {
    await producer.connect();
    console.log("Kafka Producer Connected (Backend)!");
  } catch (error) {
    console.error("Failed to connect Kafka Producer (Backend):", error);
    throw error;
  }
}

// Function to send a message to a Kafka topic
async function sendMessage(topic, message) {
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic ${topic}:`, message);
  } catch (error) {
    console.error(`Error sending message to topic ${topic}:`, error);
    throw error;
  }
}

async function disconnectProducer() {
  try {
    await producer.disconnect();
    console.log("Kafka Producer Disconnected (Backend).");
  } catch (error) {
    console.error("Error disconnecting Kafka Producer (Backend):", error);
  }
}

module.exports = {
  connectProducer,
  sendMessage,
  disconnectProducer,
};
