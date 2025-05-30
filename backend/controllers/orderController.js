const { sendMessage } = require("../config/kafkaProducer");

const KAFKA_TOPIC_ORDER = "order-ingestion";

exports.createOrder = async (req, res) => {
  try {
    if (!req.body.customerId) {
      return res
        .status(400)
        .json({ error: "userId is required for the order." });
    }
    if (
      !req.body.amount ||
      typeof req.body.amount !== "number" ||
      req.body.amount <= 0
    ) {
      return res.status(400).json({ error: "Valid order amount is required." });
    }
    if (
      !req.body.items ||
      !Array.isArray(req.body.items) ||
      req.body.items.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Order must contain at least one item." });
    }
    if (
      req.body.items.some(
        (item) =>
          !item.productId ||
          !item.name ||
          !item.quantity ||
          !item.price ||
          !item.category
      )
    ) {
      return res.status(400).json({
        error:
          "All order items must have productId, name, quantity, price, and category.",
      });
    }

    if (!req.body.status || typeof req.body.status !== "string") {
      return res.status(400).json({ error: "Valid status is required." });
    }
    if (
      req.body.status !== "PLACED" &&
      req.body.status !== "DELIVERED" &&
      req.body.status !== "CANCELLED"
    ) {
      return res.status(400).json({
        error: "Status must be one of PLACED, DELIVERED, or CANCELLED.",
      });
    }

    const orderData = {
      ...req.body,
      orderDate: req.body.orderDate || new Date().toISOString(),
    };

    await sendMessage(KAFKA_TOPIC_ORDER, orderData);

    res.status(202).json({
      message: "Order data accepted for processing.",
      data: req.body,
    });
  } catch (error) {
    console.error("Error in createOrder controller:", error);
    res.status(500).json({
      error: "Failed to process order data due to an internal server error.",
      details: error.message,
    });
  }
};
