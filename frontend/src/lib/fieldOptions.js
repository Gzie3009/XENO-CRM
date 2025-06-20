export const fieldOptions = {
  // Order model fields
  "orders.amount": { label: "Order Amount", type: "number" },
  "orders.status": { label: "Order Status", type: "string" },
  "orders.orderDate": { label: "Order Date", type: "date" },

  // Order items subfields (fully qualified)
  "orders.items.productId": { label: "Product ID", type: "string" },
  "orders.items.name": { label: "Product Name", type: "string" },
  "orders.items.quantity": { label: "Quantity", type: "number" },
  "orders.items.price": { label: "Price", type: "number" },
  "orders.items.category": { label: "Category", type: "string" },

  // Customer model fields
  name: { label: "Customer Name", type: "string" },
  email: { label: "Customer Email", type: "string" },
  phone: { label: "Customer Phone", type: "string" },
  totalSpend: { label: "Total Spend", type: "number" },
  visits: { label: "Visits", type: "number" },
  lastPurchaseDate: { label: "Last Purchase Date", type: "date" },
  createdAt: { label: "Customer Created At", type: "date" },
};
