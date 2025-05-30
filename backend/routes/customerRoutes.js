const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middlewares/auth");

// Customer routes
router.post("/", customerController.createCustomer);
router.get(
  "/total",
  authMiddleware.protect,
  customerController.getTotalCustomers
);
router.post(
  "/audience-count",
  authMiddleware.protect,
  customerController.countAudience
);

module.exports = router;
