const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  rules: mongoose.Schema.Types.Mixed, // Store JSON logic or condition trees
  previewCount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Segment", segmentSchema);
