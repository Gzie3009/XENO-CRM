require("dotenv").config();
const express = require("express");
const connectDB = require("../config/db");
const cookieParser = require("cookie-parser");

const customerRoutes = require("../routes/customerRoutes");
const orderRoutes = require("../routes/orderRoutes");
const authRoutes = require("../routes/authRoutes");
const segmentRoutes = require("../routes/segmentRoutes");
const aiRoutes = require("../routes/aiRoutes");
const {
  connectProducer,
  disconnectProducer,
} = require("../config/kafkaProducer");

const cors = require("cors");
const morgan = require("morgan");

const app = express();

// In your backend (Node.js/Express)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/segment", segmentRoutes);
app.use("/api/ai", aiRoutes);

connectProducer()
  .then(() => {
    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\nShutting down backend server...");
      await disconnectProducer(); // Disconnect Kafka Producer
      server.close(() => {
        console.log("Backend server gracefully closed.");
        process.exit(0);
      });
    });
    process.on("SIGTERM", async () => {
      console.log("\nShutting down backend server...");
      await disconnectProducer(); // Disconnect Kafka Producer
      server.close(() => {
        console.log("Backend server gracefully closed.");
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error(
      "Failed to start backend due to Kafka Producer connection error:",
      err
    );
    process.exit(1); // Exit if Kafka connection fails on startup
  });

module.exports = app;
