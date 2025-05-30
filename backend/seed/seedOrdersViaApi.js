require("dotenv").config();
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Customer = require("../models/customer");

// Use node-fetch for Node <18
const fetch = require("node-fetch");

mongoose.connect(
  "mongodb+srv://esportspubggaming1234:QMDVztHAavlbch7P@cluster0.detew.mongodb.net/xeno-crm?retryWrites=true&w=majority&appName=Cluster0"
);

const API_URL = "http://localhost:4000/api/orders";

const generateOrders = async (count) => {
  const customers = await Customer.find({}, "_id").lean();
  if (customers.length === 0) {
    console.error("No customers found. Please generate customers first.");
    mongoose.connection.close();
    return;
  }

  const statuses = ["PLACED", "DELIVERED", "CANCELLED"];
  const categories = ["Electronics", "Clothing", "Food", "Books", "Home"];

  let success = 0;

  for (let i = 0; i < count; i++) {
    const randomCustomer =
      customers[Math.floor(Math.random() * customers.length)];

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

    const amount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      customerId: randomCustomer._id,
      amount: amount,
      items: items,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      orderDate: faker.date.recent({ days: 60 }),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error(`❌ Failed to insert order (${res.status}):`, error);
      } else {
        success++;
      }
    } catch (err) {
      console.error("❌ Request error:", err.message);
    }
  }

  console.log(`✅ Successfully sent ${success}/${count} orders`);
  mongoose.connection.close();
};

// Generate 5000 fake orders
generateOrders(10);
