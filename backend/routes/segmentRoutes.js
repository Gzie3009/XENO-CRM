const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const segmentController = require("../controllers/segmentController");

router.use(authMiddleware.protect);

/**
 * @swagger
 * tags:
 *   name: Segments
 *   description: Segment creation and management
 */

/**
 * @swagger
 * /api/segments:
 *   post:
 *     summary: Create a new segment and initiate campaign
 *     tags: [Segments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Segment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - objective
 *               - description
 *               - rules
 *               - messageTemplate
 *             properties:
 *               objective:
 *                 type: string
 *                 example: "Increase repeat purchases"
 *               description:
 *                 type: string
 *                 example: "Customers who made at least 2 orders in last 6 months"
 *               rules:
 *                 type: object
 *                 description: Filter rules for segment (complex nested query)
 *                 example:
 *                   rules:
 *                     - field: "orders.count"
 *                       operator: "gte"
 *                       value: 2
 *               messageTemplate:
 *                 type: string
 *                 example: "Hey {{name}}, thanks for being a loyal customer! Here's a discount for you."
 *     responses:
 *       201:
 *         description: Segment created successfully and campaign initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Segment created successfully
 *       400:
 *         description: Missing or invalid required fields
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post("/", segmentController.createSegment);

module.exports = router;
