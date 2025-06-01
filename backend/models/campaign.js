const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  segmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Segment",
    required: true,
  },
  summary:{
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
