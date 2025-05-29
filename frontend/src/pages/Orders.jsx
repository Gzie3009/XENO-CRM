import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ordersData = [
  { id: 'ORD001', date: '2023-10-26', customer: 'John Doe', amount: '$150.00', items: 3, status: 'Shipped' },
  { id: 'ORD002', date: '2023-10-25', customer: 'Jane Smith', amount: '$75.50', items: 1, status: 'Processing' },
  { id: 'ORD003', date: '2023-10-24', customer: 'Alice Johnson', amount: '$220.00', items: 5, status: 'Delivered' },
];

const OrdersPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="mb-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <Input type="text" placeholder="Filter by customer..." className="max-w-xs" />
          <Input type="date" placeholder="Start Date" className="max-w-xs" />
          <Input type="date" placeholder="End Date" className="max-w-xs" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button>Ingest via Form</Button>
          <Button variant="outline">Bulk Upload</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination (Placeholder) */}
      <div className="mt-4 flex justify-center">
        <Button variant="outline">Previous</Button>
        <span className="mx-4 self-center">Page 1 of 5</span>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
};

export default OrdersPage;