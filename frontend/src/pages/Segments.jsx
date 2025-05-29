import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const segmentsData = [
  { id: 1, name: 'High Value Customers', rulePreview: 'Spend > $1000 AND Visits > 10', audienceSize: 150 },
  { id: 2, name: 'Recent Signups', rulePreview: 'Signup Date within last 30 days', audienceSize: 85 },
  { id: 3, name: 'Inactive Users', rulePreview: 'Last Visit > 90 days ago', audienceSize: 230 },
];

const SegmentsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Segments</h1>
        <Button>Create New Segment</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {segmentsData.map((segment) => (
          <Card key={segment.id}>
            <CardHeader>
              <CardTitle>{segment.name}</CardTitle>
              <CardDescription>Rule: {segment.rulePreview}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Audience Size: <Badge variant="secondary">{segment.audienceSize}</Badge>
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SegmentsPage;