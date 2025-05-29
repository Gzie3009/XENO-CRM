import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import useStore from "@/store/useStore";
import api from "@/utils/API";
import { toast } from "sonner";

const SegmentsPage = () => {
  const { segments, setSegments } = useStore();
  const [loading, setLoading] = useState(true);

  const getSegments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/segment");
      if (response.status === 200) {
        setSegments(response.data);
      } else {
        toast.error("Failed to fetch segments");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error fetching segments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSegments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Segments</h1>
        <NavLink to="/segments/new">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create New Segment
          </Button>
        </NavLink>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
        </div>
      ) : segments.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-muted-foreground">No segments found yet.</p>
          <NavLink to="/segments/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Segment
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => (
            <Card key={segment.id}>
              <CardHeader>
                <CardTitle>{segment.name}</CardTitle>
                <CardDescription>Rule: {segment.rulePreview}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Audience Size:{" "}
                  <Badge variant="secondary">{segment.audienceSize}</Badge>
                </p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SegmentsPage;
