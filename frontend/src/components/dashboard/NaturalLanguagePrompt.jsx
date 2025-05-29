import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function NaturalLanguagePrompt({
  aiPrompt,
  setAiPrompt,
  setSegment,
  loading,
  setLoading,
}) {
  const handleAIPrompt = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-to-rule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (data?.rules) setSegment(data.rules);
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
            {loading ? "Converting..." : "Generate Rules"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
