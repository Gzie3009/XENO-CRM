const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order creation and processing
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       description: Order details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - amount
 *               - items
 *               - status
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: ID of the customer placing the order
 *                 example: "607d1f77bcf86cd799439011"
 *               amount:
 *                 type: number
 *                 description: Total amount of the order
 *                 example: 99.99
 *               items:
 *                 type: array
 *                 description: List of items in the order
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - name
 *                     - quantity
 *                     - price
 *                     - category
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "609c1f45a10b2c5a30b7f123"
 *                     name:
 *                       type: string
 *                       example: "Blue T-shirt"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 19.99
 *                     category:
 *                       type: string
 *                       example: "Clothing"
 *               status:
 *                 type: string
 *                 enum: [PLACED, DELIVERED, CANCELLED]
 *                 description: Status of the order
 *                 example: "PLACED"
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the order was placed (optional)
 *                 example: "2025-06-01T10:00:00Z"
 *     responses:
 *       202:
 *         description: Order data accepted for processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order data accepted for processing.
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error - missing or invalid fields
 *       500:
 *         description: Internal server error
 */
router.post("/", orderController.createOrder);

module.exports = router;
