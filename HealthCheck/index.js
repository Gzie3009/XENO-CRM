const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// List of health check endpoints
const endpoints = [
  "https://xeno-crm-d3ev.onrender.com/health",
  "https://xeno-crm-consumer-campaign-delivery.onrender.com/health",
  "https://xeno-crm-consumer-data-ingestion.onrender.com/health",
  "https://xeno-crm-vendor-backend-bndb.onrender.com",
  "https://xeno-crm-backend-s4zc.onrender.com",
];

// Route to trigger health checks
app.get("/health", async (req, res) => {
  const timestamp = new Date().toISOString();
  const results = [];

  await Promise.all(
    endpoints.map(async (url) => {
      const entry = { url, status: null, responseTimeMs: null, error: null };
      const start = Date.now();
      try {
        const response = await axios.get(url);
        entry.status = response.status;
        entry.responseTimeMs = Date.now() - start;
      } catch (err) {
        entry.error = err.message;
        entry.responseTimeMs = Date.now() - start;
      }
      results.push(entry);
    })
  );

  const analytics = {
    timestamp,
    totalChecked: results.length,
    healthy: results.filter((r) => r.status === 200).length,
    unhealthy: results.filter((r) => r.status !== 200 || r.error).length,
    details: results,
  };

  res.json(analytics);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Health check server running on port ${PORT}`);
});
