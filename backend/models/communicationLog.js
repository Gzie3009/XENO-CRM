const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     CommunicationLog:
 *       type: object
 *       required:
 *         - campaignId
 *         - customerId
 *         - messageSent
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         campaignId:
 *           type: string
 *           description: MongoDB ObjectId referencing the Campaign
 *         customerId:
 *           type: string
 *           description: MongoDB ObjectId referencing the Customer
 *         messageSent:
 *           type: string
 *           description: The message content sent to the customer
 *         deliveryStatus:
 *           type: string
 *           enum:
 *             - PENDING
 *             - SENT
 *             - FAILED
 *           default: PENDING
 *           description: Status of message delivery
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Date and time when the communication was logged
 */

const communicationLogSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  messageSent: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["PENDING", "SENT", "FAILED"],
    default: "PENDING",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
