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
  "customer.name": { label: "Customer Name", type: "string" },
  "customer.email": { label: "Customer Email", type: "string" },
  "customer.phone": { label: "Customer Phone", type: "string" },
  "customer.totalSpend": { label: "Total Spend", type: "number" },
  "customer.visits": { label: "Visits", type: "number" },
  "customer.lastPurchaseDate": { label: "Last Purchase Date", type: "date" },
  "customer.createdAt": { label: "Customer Created At", type: "date" },
};
