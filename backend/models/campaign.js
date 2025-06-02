const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - segmentId
 *         - name
 *         - messageTemplate
 *         - totalAudienceSize
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         segmentId:
 *           type: string
 *           description: MongoDB ObjectId referencing the Segment
 *         summary:
 *           type: string
 *           description: Brief summary of the campaign
 *         name:
 *           type: string
 *           description: Name of the campaign
 *         messageTemplate:
 *           type: string
 *           description: Template of the message to send in the campaign
 *         totalAudienceSize:
 *           type: integer
 *           description: Total number of customers targeted by the campaign
 *         deliveryStats:
 *           type: object
 *           properties:
 *             sentCount:
 *               type: integer
 *               default: 0
 *               description: Number of messages successfully sent
 *             failedCount:
 *               type: integer
 *               default: 0
 *               description: Number of messages failed to send
 *         status:
 *           type: string
 *           enum:
 *             - INITIATED
 *             - COMPLETED
 *           default: INITIATED
 *           description: Current status of the campaign
 *         initiatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when campaign was started
 *         completedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when campaign was completed
 */

const campaignSchema = new mongoose.Schema({
  segmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Segment",
    required: true,
  },
  summary: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  messageTemplate: {
    type: String,
    required: true,
  },
  totalAudienceSize: {
    type: Number,
    required: true,
    default: 0,
  },
  deliveryStats: {
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ["INITIATED", "COMPLETED"],
    default: "INITIATED",
  },
  initiatedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
