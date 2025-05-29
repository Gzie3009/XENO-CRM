const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middlewares/auth");

// Apply authentication middleware to all customer routes
router.use(authMiddleware.protect);

// Customer routes
router.post("/", customerController.createCustomer);
router.get("/total", customerController.getTotalCustomers);

module.exports = router;
