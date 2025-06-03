require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("../models/order"); // Adjust path as needed
const Customer = require("../models/customer"); // Adjust path as needed
const { faker } = require("@faker-js/faker");
// Connect to MongoDB
const MONGODB_URI = "mongodb://localhost:27017/mydatabase";
mongoose.connect(MONGODB_URI);

const generateOrders = async (count) => {
  // Get all customer IDs
  const customers = await Customer.find({}, "_id").lean();
  if (customers.length === 0) {
    console.error("No customers found. Please generate customers first.");
    mongoose.connection.close();
    return;
  }

  const orders = [];
  const statuses = ["PLACED", "DELIVERED", "CANCELLED"];
  const categories = ["Electronics", "Clothing", "Food", "Books", "Home"];

  for (let i = 0; i < count; i++) {
    // Random customer
    const randomCustomer =
      customers[Math.floor(Math.random() * customers.length)];

    // Random number of items (1-5)
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = [];

    for (let j = 0; j < itemCount; j++) {
      items.push({
        productId: faker.string.uuid(),
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: faker.number.float({ min: 5, max: 500, precision: 0.01 }),
        category: categories[Math.floor(Math.random() * categories.length)],
      });
    }

    // Calculate total amount
    const amount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      userId: new mongoose.Types.ObjectId(), // Random user ID since we don't have users
      customerId: randomCustomer._id,
      amount: amount,
      items: items,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      orderDate: faker.date.recent({ days: 60 }),
    };

    orders.push(order);
  }

  try {
    await Order.insertMany(orders);
    console.log(`Successfully inserted ${count} orders`);
  } catch (err) {
    console.error("Error inserting orders:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Generate 5000 fake orders
generateOrders(1);
