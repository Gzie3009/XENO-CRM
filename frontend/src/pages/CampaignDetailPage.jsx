import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  CheckCircle,
  XCircle,
  Target,
  MessageSquare,
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  Zap,
} from "lucide-react";
import { useParams } from "react-router-dom";
import api from "@/utils/API";

const CampaignDetailPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getCampaignDetails = async (id) => {
    try {
      const response = await api.get(`/campaign/${id}`);
      if (response.status === 200) {
        setCampaign(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch campaign details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCampaignDetails(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <Card key={idx} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="h-6 w-full" />
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Campaign Not Found
            </h2>
            <p className="text-gray-600">
              The requested campaign could not be located.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const deliveryRate =
    campaign.totalAudienceSize > 0
      ? (campaign.deliveryStats.sentCount / campaign.totalAudienceSize) * 100
      : 0;

  const failureRate =
    campaign.totalAudienceSize > 0
      ? (campaign.deliveryStats.failedCount / campaign.totalAudienceSize) * 100
      : 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCampaignDuration = () => {
    if (!campaign.completedAt) return "In Progress";
    const start = new Date(campaign.initiatedAt);
    const end = new Date(campaign.completedAt);
    const durationMs = end - start;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="bg-black p-3 rounded-xl shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {campaign.name}
              </h1>
              <p className="text-lg text-gray-600">
                {campaign.segmentId?.objective}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge>
              <CheckCircle className="h-3 w-3" />
              {campaign.status}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              ID: {campaign._id.slice(-8)}
            </Badge>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-700">
                    {campaign.totalAudienceSize}
                  </p>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    Total Audience
                  </p>
                </div>
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-700">
                    {campaign.deliveryStats.sentCount}
                  </p>
                  <p className="text-sm font-medium text-green-600 mt-1">
                    Successfully Delivered
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-red-700">
                    {campaign.deliveryStats.failedCount}
                  </p>
                  <p className="text-sm font-medium text-red-600 mt-1">
                    Failed Deliveries
                  </p>
                </div>
                <div className="bg-red-500 p-3 rounded-xl">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-purple-700">
                    {deliveryRate.toFixed(1)}%
                  </p>
                  <p className="text-sm font-medium text-purple-600 mt-1">
                    Delivery Rate
                  </p>
                </div>
                <div className="bg-purple-500 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Summary */}
        {campaign.summary && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-indigo-900">
                <Zap className="h-5 w-5" />
                AI-Generated Summary
              </CardTitle>
              <CardDescription className="text-indigo-700">
                Intelligent analysis of your campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-indigo-100">
                <p className="text-gray-800 leading-relaxed text-lg italic">
                  "{campaign.summary}"
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Details */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-5 w-5 text-gray-700" />
                Campaign Details
              </CardTitle>
              <CardDescription>
                Complete information about this campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Segment Objective
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {campaign.segmentId?.objective}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message Template
                  </span>
                  <div className="max-w-xs">{campaign.messageTemplate}</div>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Initiated At
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formatDate(campaign.initiatedAt)}
                  </span>
                </div>

                {campaign.completedAt && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Completed At
                    </span>
                    <span className="text-gray-900 font-medium">
                      {formatDate(campaign.completedAt)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-600 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Duration
                  </span>
                  <span className="text-gray-900 font-medium">
                    {getCampaignDuration()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-gray-700" />
                Performance Analytics
              </CardTitle>
              <CardDescription>
                Visual breakdown of campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Delivery Success Rate
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {deliveryRate.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={deliveryRate} className="h-3 bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${deliveryRate}%` }}
                    />
                  </Progress>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{campaign.deliveryStats.sentCount} delivered</span>
                    <span>{campaign.totalAudienceSize} total</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Failure Rate
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      {failureRate.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={failureRate} className="h-3 bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${failureRate}%` }}
                    />
                  </Progress>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{campaign.deliveryStats.failedCount} failed</span>
                    <span>{campaign.totalAudienceSize} total</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Campaign Health Score
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${deliveryRate}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-bold text-blue-700">
                    {deliveryRate > 90
                      ? "Excellent"
                      : deliveryRate > 75
                      ? "Good"
                      : deliveryRate > 50
                      ? "Fair"
                      : "Poor"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metadata */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
            <CardTitle className="text-xl">Technical Details</CardTitle>
            <CardDescription>Internal identifiers and metadata</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Campaign ID</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {campaign._id}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Segment ID</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {campaign.segmentId?._id}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">User ID</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {campaign.segmentId?.userId}
                  </code>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">
                    Segment Created
                  </span>
                  <span className="text-sm text-gray-800">
                    {formatDate(campaign.segmentId?.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Status</span>
                  <Badge>
                    <CheckCircle className="h-3 w-3" />
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
