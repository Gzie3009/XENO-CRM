const Customer = require("../models/customer");
const {
  buildMongoQuery,
  aggregatedQueryPipeline,
} = require("../utils/CustomQuery");
const { sendMessage } = require("../config/kafkaProducer"); // Import the sendMessage function

function validateEmail(email) {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return emailRegex.test(email);
}

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!req.body.name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!req.body.phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }
    if (!req.body.totalSpend) {
      return res.status(400).json({ error: "Total spend is required" });
    }
    if (typeof req.body.totalSpend !== "number" || req.body.totalSpend < 0) {
      return res
        .status(400)
        .json({ error: "Total spend must be a non-negative number" });
    }
    if (!req.body.visits) {
      return res.status(400).json({ error: "Visits is required" });
    }
    if (typeof req.body.visits !== "number" || req.body.visits < 0) {
      return res
        .status(400)
        .json({ error: "Visits must be a non-negative number" });
    }
    if (!req.body.lastPurchaseDate) {
      return res.status(400).json({ error: "Last purchase date is required" });
    }
    // Validate email format
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Prepare data for Kafka
    const customerData = req.body;
    const KAFKA_TOPIC_CUSTOMER = "customer-ingestion"; // Define the topic here or pass it

    // Send data to Kafka topic
    await sendMessage(KAFKA_TOPIC_CUSTOMER, customerData);

    // Respond with 202 Accepted
    res.status(202).json({
      message: "Customer data accepted for processing.",
      data: req.body,
    });
  } catch (error) {
    console.error("Error in createCustomer controller:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({
      error: "Failed to process customer data due to an internal server error.",
      details: error.message,
    });
  }
};

// Get all customers
exports.getTotalCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().countDocuments();
    res.status(200).json({ totalCustomers: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.countAudience = async (req, res) => {
  try {
    const { rules, includeAll } = req.body;

    let pipeline = [];

    if (!includeAll) {
      if (!rules) {
        return res.status(400).json({ error: "Rules are required" });
      }
      const parsedRules = typeof rules === "string" ? JSON.parse(rules) : rules;
      const convertedQuery = buildMongoQuery(parsedRules);
      pipeline = aggregatedQueryPipeline(convertedQuery);
    } else {
      // Return all customers with their orders
      pipeline = [
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customerId",
            as: "orders",
          },
        },
      ];
    }

    const result = await Customer.aggregate(pipeline).count("count");
    res.status(200).json({ result: result[0]?.count || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
