const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  objective: String,
  description: String,
  rules: String,
  createdAt: { type: Date, default: Date.now },
});

const Segment = mongoose.model("Segment", segmentSchema);
module.exports = Segment;
