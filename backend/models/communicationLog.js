const mongoose = require("mongoose");

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
  message: String,
  status: {
    type: String,
    enum: ["SENT", "FAILED", "PENDING"],
    default: "PENDING",
  },
  sentAt: Date,
  deliveryReceiptReceivedAt: Date,
});

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
