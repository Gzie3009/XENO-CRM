const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer ingestion and analytics
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - totalSpend
 *               - visits
 *               - lastPurchaseDate
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               totalSpend:
 *                 type: number
 *               visits:
 *                 type: number
 *               lastPurchaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       202:
 *         description: Customer data accepted for processing
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", customerController.createCustomer);

/**
 * @swagger
 * /api/customers/total:
 *   get:
 *     summary: Get total number of customers
 *     tags: [Customers]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Total number of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCustomers:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get(
  "/total",
  authMiddleware.protect,
  customerController.getTotalCustomers
);

/**
 * @swagger
 * /api/customers/audience-count:
 *   post:
 *     summary: Get count of audience based on rules
 *     tags: [Customers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rules:
 *                 type: object
 *               includeAll:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Audience count returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/audience-count",
  authMiddleware.protect,
  customerController.countAudience
);

module.exports = router;
