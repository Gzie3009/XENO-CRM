import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router

const campaignsData = [
  { id: 'CAMP001', name: 'Q4 Holiday Promo', segment: 'High Value Customers', status: 'Sent', createdTime: '2023-11-15 10:00 AM', sent: 148, failed: 2, audience: 150 },
  { id: 'CAMP002', name: 'New User Welcome', segment: 'Recent Signups', status: 'Sent', createdTime: '2023-11-10 02:30 PM', sent: 80, failed: 5, audience: 85 },
  { id: 'CAMP003', name: 'Re-engagement Email', segment: 'Inactive Users', status: 'Draft', createdTime: '2023-11-05 09:15 AM', sent: 0, failed: 0, audience: 230 },
  { id: 'CAMP004', name: 'Black Friday Early Access', segment: 'VIP Customers', status: 'Scheduled', createdTime: '2023-10-28 05:00 PM', sent: 0, failed: 0, audience: 75 },
].sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)); // Sort by most recent

const CampaignsPage = () => {
  const navigate = useNavigate();

  const handleViewDetails = (campaignId) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return 'success'; // Assuming you have a 'success' variant or will add one
      case 'draft':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'scheduled':
        return 'outline'; // Or another appropriate variant
      default:
        return 'default';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        {/* <Button>Create New Campaign</Button> // This might be on the Segments page or a dedicated page */}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Time</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Failed</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaignsData.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{campaign.segment}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
              </TableCell>
              <TableCell>{campaign.createdTime}</TableCell>
              <TableCell>{campaign.audience}</TableCell>
              <TableCell>{campaign.sent}</TableCell>
              <TableCell>{campaign.failed > 0 ? <span className="text-red-600">{campaign.failed}</span> : campaign.failed}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(campaign.id)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignsPage;