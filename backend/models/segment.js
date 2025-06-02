const mongoose = require("mongoose");


/**
 * @swagger
 * components:
 *   schemas:
 *     Segment:
 *       type: object
 *       required:
 *         - userId
 *         - objective
 *         - rules
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         userId:
 *           type: string
 *           description: ID of the user who created the segment
 *         objective:
 *           type: string
 *           description: Purpose of the segment
 *         description:
 *           type: string
 *           description: Optional description of the segment
 *         rules:
 *           type: string
 *           description: Stringified JSON rules for audience filtering
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the segment was created
 */


const segmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  objective: String,
  description: String,
  rules: String,
  createdAt: { type: Date, default: Date.now },
});

const Segment = mongoose.model("Segment", segmentSchema);
module.exports = Segment;
