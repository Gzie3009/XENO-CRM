const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the customer
 *         name:
 *           type: string
 *           description: Customer's full name
 *         email:
 *           type: string
 *           description: Customer's email address
 *         phone:
 *           type: string
 *           description: Customer's phone number
 *         totalSpend:
 *           type: number
 *           default: 0
 *           description: Total money spent by the customer
 *         visits:
 *           type: number
 *           default: 0
 *           description: Total number of visits by the customer
 *         lastPurchaseDate:
 *           type: string
 *           format: date-time
 *           description: Last date the customer made a purchase
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the customer was created
 *       example:
 *         _id: "6653fd68e59d212f84cf5e77"
 *         name: "Jane Doe"
 *         email: "jane@example.com"
 *         phone: "+1234567890"
 *         totalSpend: 1250.5
 *         visits: 7
 *         lastPurchaseDate: "2024-06-01T10:00:00Z"
 *         createdAt: "2024-05-20T14:00:00Z"
 */

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
