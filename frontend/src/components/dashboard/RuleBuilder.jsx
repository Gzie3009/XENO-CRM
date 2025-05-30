"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RuleGroup } from "@/components/dashboard/RuleGroup";
import { Button } from "../ui/button";
import { toast } from "sonner";
import api from "@/utils/API";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RuleBuilder({ setAudienceSize, segment, setSegment }) {
  const [loading, setLoading] = useState(false);

  const countAudience = async () => {
    const isEmptyRules =
      !segment || !Array.isArray(segment.rules) || segment.rules.length === 0;

    const payload = isEmptyRules ? { includeAll: true } : { rules: segment };

    setLoading(true);
    console.log("Counting audience based on:", payload);
    try {
      const response = await api.post("/customers/audience-count", payload);
      if (response.status === 200) {
        const count = response.data.result;
        setAudienceSize(count);
        toast.success(`Audience size: ${count}`);
      } else {
        toast.error("Failed to count audience. Please try again.");
      }
    } catch (error) {
      toast.error("Error counting audience. Please try again.");
      console.error("Error counting audience:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 h-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Segment Rule Builder</h2>
      </CardHeader>
      <CardContent>
        <RuleGroup group={segment} onChange={setSegment} />
      </CardContent>
      <CardFooter>
        <Button onClick={countAudience} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Counting...
            </>
          ) : (
            "Count Audience"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
