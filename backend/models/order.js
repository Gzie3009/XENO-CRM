const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  amount: Number,
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
      category: String,
    },
  ],
  status: {
    type: String,
    enum: ["PLACED", "DELIVERED", "CANCELLED"],
    default: "PLACED",
  },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
