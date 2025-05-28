const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  segmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Segment" },
  name: String,
  messageTemplate: String,
  status: {
    type: String,
    enum: ["PENDING", "RUNNING", "COMPLETED"],
    default: "PENDING",
  },
  summary: String, // AI-generated summary
  suggestedTimes: [String], // Optional AI-driven recommendations
  tags: [String], // Auto-generated labels like “Win-back”
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Campaign", campaignSchema);
