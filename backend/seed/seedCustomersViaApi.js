require("dotenv").config();
const { faker } = require("@faker-js/faker");

// If you're using Node.js < 18, install node-fetch: `npm install node-fetch`
const fetch = require("node-fetch");

const API_URL = "http://localhost:4000/api/customers/";

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

  let success = 0;

  for (const customer of customers) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Failed to insert:", response.status, errorBody);
      } else {
        success++;
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  console.log(`✅ Successfully sent ${success} customers to API`);
};

generateCustomers(10);
