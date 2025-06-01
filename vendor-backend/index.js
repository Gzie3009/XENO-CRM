require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
const PORT = process.env.DUMMY_VENDOR_PORT || 4008;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const VENDOR_API_KEY = process.env.VENDOR_API_KEY;
const DELIVERY_RECEIPT_API_URL =
  process.env.DELIVERY_RECEIPT_API_URL ||
  "http://localhost:4000/api/campaign/delivery-receipt";

app.use(express.json());

app.use(cors({ origin: CLIENT_URL }));

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey != VENDOR_API_KEY) {
    return res.status(401).json({ message: "Unauthorized: Invalid API Key" });
  }
  next();
};

app.post("/send-campaign-message", authenticateApiKey, async (req, res) => {
  const { communicationLogId, email, phone, message } = req.body;

  if (!communicationLogId || !email || !message) {
    return res.status(400).json({
      message: "Missing required fields: communicationLogId, email, message",
    });
  }

  const simulateSuccess = Math.random() < 0.9; // 90% success, 10% failure
  const status = simulateSuccess ? "SENT" : "FAILED";
  const failureReason = simulateSuccess ? null : "Simulated delivery failure";

  try {
    await axios.post(
      DELIVERY_RECEIPT_API_URL,
      {
        communicationLogId,
        status,
        reason: failureReason,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": VENDOR_API_KEY,
        },
      }
    );

    res.status(200).json({
      message: "Message processed and receipt sent to backend",
      communicationLogId,
      simulatedStatus: status,
    });
  } catch (error) {
    console.error(
      `Error hitting Delivery Receipt API for ${communicationLogId}:`,
      error.message
    );
    res.status(500).json({
      message: "Failed to send delivery receipt",
      details: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Dummy Vendor Backend is running");
});

app.listen(PORT, () => {
  console.log(`Dummy Vendor Backend running on port ${PORT}`);
});
