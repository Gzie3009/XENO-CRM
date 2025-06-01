import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import api from "@/utils/API";
import { useState } from "react";

export default function NaturalLanguagePrompt({
  objective,
  description,
  setSegment,
}) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAIPrompt = async () => {
    setLoading(true);
    try {
      const response = await api.post("/ai/generate-rules", {
        ruleDescription: aiPrompt,
        objective,
        description,
      });
      if (response.status === 200) {
        setSegment(response.data);
      }
    } catch (err) {
      console.error("AI conversion failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full mb-6 ">
      <CardHeader className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Natural Language to Rules</h2>
        <p className="text-sm text-muted-foreground">
          Describe your audience. Example: "People who haven’t shopped in 6
          months and spent over ₹5K"
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Describe your audience segment..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAIPrompt} disabled={loading}>
            <Sparkles className="w-4 h-4 mr-2" />
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Generating..." : "Generate Rules"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
