require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const cookieParser = require("cookie-parser");

const customerRoutes = require("../routes/customerRoutes");
const orderRoutes = require("../routes/orderRoutes");
const authRoutes = require("../routes/authRoutes");

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

// API documentation route
app.get("/api-docs", (req, res) => {
  res.json({
    message: "API Documentation",
    endpoints: {
      customers: {
        create: "POST /api/customers",
        getAll: "GET /api/customers",
        getOne: "GET /api/customers/:id",
        update: "PUT /api/customers/:id",
        delete: "DELETE /api/customers/:id",
      },
      orders: {
        create: "POST /api/orders",
        getAll: "GET /api/orders",
        getOne: "GET /api/orders/:id",
        update: "PUT /api/orders/:id",
        delete: "DELETE /api/orders/:id",
      },
    },
  });
});

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
