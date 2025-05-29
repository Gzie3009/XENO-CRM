import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const randomColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
  "bg-orange-100 text-orange-800",
];

function getRandomColorClass() {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
}

export default function MetadataForm({
  objective,
  setObjective,
  segmentDescription,
  setSegmentDescription,
}) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <h2 className="text-xl font-semibold">Segment Metadata</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="segmentName">Objective</Label>
          <Input
            id="segmentName"
            value={objective}
            onChange={(e) => {
              setObjective(e.target.value);
            }}
            className="mt-2"
            placeholder="e.g. Bring back high value customers"
          />
        </div>
        <div>
          <Label htmlFor="segmentDescription">Description</Label>
          <Textarea
            id="segmentDescription"
            value={segmentDescription}
            onChange={(e) => {
              setSegmentDescription(e.target.value);
            }}
            className="mt-2"
            placeholder="Write a brief about this audience segment..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
