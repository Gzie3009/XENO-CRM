import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RuleGroup } from "@/components/dashboard/RuleGroup";

export default function RuleBuilder({ segment, setSegment }) {
  return (
    <Card className="mb-6 h-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Segment Rule Builder</h2>
      </CardHeader>
      <CardContent>
        <RuleGroup group={segment} onChange={setSegment} />
      </CardContent>
    </Card>
  );
}
