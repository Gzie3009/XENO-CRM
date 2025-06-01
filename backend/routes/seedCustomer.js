require("dotenv").config();
const mongoose = require("mongoose");
const Customer = require("../models/customer"); // Adjust path as needed
const { faker } = require("@faker-js/faker");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const generateCustomers = async (count) => {
  const customers = [];

  for (let i = 0; i < count; i++) {
    const customer = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      totalSpend: faker.number.int({ min: 0, max: 10000 }),
      visits: faker.number.int({ min: 1, max: 50 }),
      lastPurchaseDate: faker.date.recent({ days: 90 }),
    };
    customers.push(customer);
  }

  try {
    await Customer.insertMany(customers);
    console.log(`Successfully inserted ${count} customers`);
  } catch (err) {
    console.error("Error inserting customers:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Generate 1000 fake customers
generateCustomers(1000);
