const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerId
 *         - amount
 *         - items
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         customerId:
 *           type: string
 *           description: ID of the customer placing the order
 *         amount:
 *           type: number
 *           description: Total amount of the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *         status:
 *           type: string
 *           enum: [PLACED, DELIVERED, CANCELLED]
 *           default: PLACED
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Date when the order was placed
 */


const orderSchema = new mongoose.Schema({
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
