import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Send,
  Users,
  Mail,
  RefreshCw,
  CheckCircle,
  Pause,
  Clock,
  XCircle,
  AlertCircle,
  Activity,
  TrendingUp,
  Plus,
  Search,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "@/utils/API";

const CampaignsPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  const getCampaigns = async () => {
    try {
      const response = await api.get("/campaign");
      if (response.status === 200) {
        setCampaigns(response.data);
      }
    } catch (e) {
      console.error("Error fetching campaigns:", e);
      toast.error("Failed to fetch campaigns");
    }
  };
  useEffect(() => {
    getCampaigns();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4" />;
      case "INITIATED":
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.segmentId.objective.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || c.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(
    (c) => c.status === "INITIATED"
  ).length;
  const totalAudience = campaigns.reduce(
    (sum, c) => sum + c.totalAudienceSize,
    0
  );
  const totalSent = campaigns.reduce(
    (sum, c) => sum + c.deliveryStats.sentCount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="mt-2">
            <div className="text-sm text-gray-500 mb-1">
              CRM / <span className="text-gray-700 font-medium">Campaigns</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Megaphone className="text-gray-800" />
              Campaign Management
            </h1>
          </div>
          <NavLink to={"/segments/new"}>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </NavLink>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Campaigns</p>
                  <p className="text-2xl font-bold">{totalCampaigns}</p>
                </div>
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {activeCampaigns}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Audience</p>
                  <p className="text-2xl font-bold">
                    {totalAudience.toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages Sent</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalSent.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>Filter Campaigns</CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search campaigns..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "completed", "initiated"].map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? "default" : "outline"}
                    onClick={() => setFilter(status)}
                  >
                    {status.replace("_", " ").toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 flex items-center gap-x-2">
                      <Sparkles />
                      Campaign Label
                    </th>
                    <th className="px-4 py-3">Objective</th>
                    <th className="px-4 py-3">Start Date</th>
                    <th className="px-4 py-3">Audience</th>
                    <th className="px-4 py-3">Sent</th>
                    <th className="px-4 py-3">Failed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCampaigns.map((c) => (
                    <tr
                      onClick={() => {
                        if (c.status === "COMPLETED")
                          navigate(`/campaigns/${c._id}`);
                      }}
                      key={c._id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-4 py-3 flex items-center gap-2">
                        {getStatusIcon(c.status)}
                        <span className="text-xs font-medium">{c.status}</span>
                      </td>
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3">
                        <div className="text-gray-800">
                          {c.segmentId.objective}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {c.segmentId.description}
                        </div>
                      </td>
                      <td className="px-4 py-3">{formatDate(c.initiatedAt)}</td>
                      <td className="px-4 py-3">{c.totalAudienceSize}</td>
                      <td className="px-4 py-3 text-green-600">
                        {c.deliveryStats.sentCount}
                      </td>
                      <td className="px-4 py-3 text-red-500">
                        {c.deliveryStats.failedCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignsPage;
