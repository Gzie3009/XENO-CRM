require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const cookieParser = require("cookie-parser");

const customerRoutes = require("../routes/customerRoutes");
const orderRoutes = require("../routes/orderRoutes");
const authRoutes = require("../routes/authRoutes");
const segmentRoutes = require("../routes/segmentRoutes");
const aiRoutes = require("../routes/aiRoutes");

const cors = require("cors");

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
