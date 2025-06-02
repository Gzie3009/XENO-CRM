const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const aiController = require("../controllers/aiController");

router.use(authMiddleware.protect);

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI-powered generation of templates and rules
 */

/**
 * @swagger
 * /api/ai/generate-templates:
 *   post:
 *     summary: Generate message templates
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messageDescription
 *               - segmentDescription
 *               - objective
 *             properties:
 *               messageDescription:
 *                 type: string
 *                 example: "Welcome message for new segment"
 *               segmentDescription:
 *                 type: string
 *                 example: "Customers who bought electronics in last 6 months"
 *               objective:
 *                 type: string
 *                 example: "Increase repeat purchases"
 *     responses:
 *       200:
 *         description: Generated message templates returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: JSON object containing generated templates
 *       400:
 *         description: Missing or invalid input fields
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Internal server error
 */
router.post("/generate-templates", aiController.generateTemplates);

/**
 * @swagger
 * /api/ai/generate-rules:
 *   post:
 *     summary: Generate structured rules from natural language
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ruleDescription
 *               - objective
 *               - description
 *             properties:
 *               ruleDescription:
 *                 type: string
 *                 example: "Customers who have spent more than $1000 in last year"
 *               objective:
 *                 type: string
 *                 example: "Identify high-value customers"
 *               description:
 *                 type: string
 *                 example: "Segment customers based on purchase amount and frequency"
 *     responses:
 *       200:
 *         description: Structured rules returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: JSON object containing parsed rules
 *       400:
 *         description: Missing or invalid input fields
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Internal server error
 */
router.post("/generate-rules", aiController.generateRulesFromNaturalLanguage);

module.exports = router;
