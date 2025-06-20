const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  phone: String,
  totalSpend: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  lastPurchaseDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Customer", customerSchema);
