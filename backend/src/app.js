require("dotenv").config();
const express = require("express");
const connectDB = require("../config/db");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const customerRoutes = require("../routes/customerRoutes");
const orderRoutes = require("../routes/orderRoutes");
const authRoutes = require("../routes/authRoutes");
const segmentRoutes = require("../routes/segmentRoutes");
const aiRoutes = require("../routes/aiRoutes");
const campaignRoutes = require("../routes/campaignRoutes");

const {
  connectProducer,
  disconnectProducer,
} = require("../config/kafkaProducer");

const cors = require("cors");
const morgan = require("morgan");

const app = express();
const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "XENO CRM API",
      version: "1.0.0",
      description: "API documentation for the Mini CRM backend",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ["./models/*.js", "./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

connectDB();

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
app.use("/api/campaign", campaignRoutes);

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
