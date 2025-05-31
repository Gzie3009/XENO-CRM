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
