import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming react-router for dynamic routes
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Dummy data - in a real app, you'd fetch this based on the :id param
const campaignsData = {
  'CAMP001': {
    id: 'CAMP001', 
    name: 'Q4 Holiday Promo', 
    segmentName: 'High Value Customers', 
    segmentRules: 'Spend > $1000 AND Visits > 10', 
    messageTemplate: 'Email Template A: Subject - Exclusive Holiday Deals!', 
    audienceSize: 150, 
    totalSent: 148, 
    totalDelivered: 145,
    totalOpened: 100,
    totalClicked: 30,
    totalFailed: 2, 
    createdTime: '2023-11-15 10:00 AM',
    aiSummary: 'This campaign performed well with high-value customers, achieving a good open rate. Consider a follow-up for non-openers.',
    aiTags: ['Successful', 'High Engagement', 'Holiday Season'],
    customerLogs: [
      { customerId: 'CUST001', customerName: 'John Doe', status: 'Delivered', timestamp: '2023-11-15 10:01 AM', openedAt: '2023-11-15 10:05 AM', clickedAt: null },
      { customerId: 'CUST002', customerName: 'Jane Smith', status: 'Sent', timestamp: '2023-11-15 10:01 AM', openedAt: null, clickedAt: null }, // Simulating not yet delivered or opened
      { customerId: 'CUST003', customerName: 'Alice Johnson', status: 'Failed', reason: 'Invalid Email', timestamp: '2023-11-15 10:01 AM', openedAt: null, clickedAt: null },
      { customerId: 'CUST004', customerName: 'Bob Brown', status: 'Delivered', timestamp: '2023-11-15 10:02 AM', openedAt: '2023-11-15 11:30 AM', clickedAt: '2023-11-15 11:32 AM' },
    ]
  },
  // ... more campaign data if needed for testing other IDs
};

const CampaignDetailPage = () => {
  const { id } = useParams(); // Get campaign ID from URL
  const campaign = campaignsData[id];

  if (!campaign) {
    return <div className="container mx-auto p-4">Campaign not found.</div>;
  }

  const deliveryRate = campaign.audienceSize > 0 ? (campaign.totalDelivered / campaign.audienceSize) * 100 : 0;
  const openRate = campaign.totalDelivered > 0 ? (campaign.totalOpened / campaign.totalDelivered) * 100 : 0;
  const clickRate = campaign.totalOpened > 0 ? (campaign.totalClicked / campaign.totalOpened) * 100 : 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{campaign.name}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Metadata</CardTitle>
          <CardDescription>Details about the campaign setup.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div><strong>Segment:</strong> {campaign.segmentName}</div>
          <div><strong>Segment Rules:</strong> <Badge variant="outline">{campaign.segmentRules}</Badge></div>
          <div><strong>Message Template:</strong> {campaign.messageTemplate}</div>
          <div><strong>Created:</strong> {campaign.createdTime}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold">{campaign.audienceSize}</p>
              <p className="text-sm text-muted-foreground">Audience Size</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{campaign.totalSent}</p>
              <p className="text-sm text-muted-foreground">Total Sent</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-green-600">{campaign.totalDelivered}</p>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-600">{campaign.totalFailed}</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Delivery Rate ({deliveryRate.toFixed(1)}%)</span>
                <span className="text-sm text-muted-foreground">{campaign.totalDelivered} / {campaign.audienceSize}</span>
              </div>
              <Progress value={deliveryRate} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Open Rate ({openRate.toFixed(1)}%)</span>
                <span className="text-sm text-muted-foreground">{campaign.totalOpened} / {campaign.totalDelivered}</span>
              </div>
              <Progress value={openRate} className="w-full" indicatorClassName="bg-blue-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Click-through Rate ({clickRate.toFixed(1)}%)</span>
                <span className="text-sm text-muted-foreground">{campaign.totalClicked} / {campaign.totalOpened}</span>
              </div>
              <Progress value={clickRate} className="w-full" indicatorClassName="bg-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {campaign.aiSummary && (
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic mb-2">{campaign.aiSummary}</p>
            <div className="space-x-2">
              {campaign.aiTags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Delivery Log</CardTitle>
          <CardDescription>Status for each customer in the campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Opened At</TableHead>
                <TableHead>Clicked At</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaign.customerLogs.map((log) => (
                <TableRow key={log.customerId}>
                  <TableCell>{log.customerName}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'Failed' ? 'destructive' : log.status === 'Delivered' ? 'success' : 'default'}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.openedAt || '-'}</TableCell>
                  <TableCell>{log.clickedAt || '-'}</TableCell>
                  <TableCell>{log.reason || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
};

export default CampaignDetailPage;