const router = require("express").Router();
const campaignController = require("../controllers/campaignController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Campaign management and delivery tracking
 */

/**
 * @swagger
 * /api/campaigns/delivery-receipt:
 *   post:
 *     summary: Receive and process delivery receipts for messages
 *     tags: [Campaigns]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *         description: Vendor API key for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - communicationLogId
 *               - status
 *             properties:
 *               communicationLogId:
 *                 type: string
 *                 description: ID of the communication log entry
 *                 example: "607d1f77bcf86cd799439011"
 *               status:
 *                 type: string
 *                 enum: [SENT, FAILED]
 *                 description: Delivery status of the message
 *                 example: "SENT"
 *     responses:
 *       200:
 *         description: Delivery receipt updated successfully
 *       400:
 *         description: Missing or invalid parameters
 *       401:
 *         description: Unauthorized - invalid or missing API key
 *       404:
 *         description: Communication log not found
 *       500:
 *         description: Internal server error
 */
router.post("/delivery-receipt", campaignController.deliveryReceiptHandler);

/**
 * @swagger
 * /api/campaigns:
 *   get:
 *     summary: Get a list of all campaigns
 *     tags: [Campaigns]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of campaigns returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware.protect, campaignController.getAllCampaigns);

/**
 * @swagger
 * /api/campaigns/{id}:
 *   get:
 *     summary: Get details of a specific campaign by ID
 *     tags: [Campaigns]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campaign ID
 *         schema:
 *           type: string
 *           example: "607d1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: Campaign details returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Campaign ID is required
 *       404:
 *         description: Campaign not found
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware.protect, campaignController.getCampaignById);

module.exports = router;
