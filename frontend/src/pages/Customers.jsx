import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const customersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', spend: '$500', visits: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', spend: '$1200', visits: 12 },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-555-5555', spend: '$80', visits: 2 },
];

const CustomersPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Input type="text" placeholder="Filter customers..." className="max-w-sm" />
        </div>
        <div className="space-x-2">
          <Button>Ingest via Form</Button>
          <Button variant="outline">Ingest via File</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Spend</TableHead>
            <TableHead>Visits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersData.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.spend}</TableCell>
              <TableCell>{customer.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination (Placeholder) */}
      <div className="mt-4 flex justify-center">
        <Button variant="outline">Previous</Button>
        <span className="mx-4 self-center">Page 1 of 10</span>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
};

export default CustomersPage;