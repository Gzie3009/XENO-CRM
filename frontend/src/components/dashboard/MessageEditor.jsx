import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import api from "@/utils/API";

const availableTags = [
  "{{name}}",
  "{{phone}}",
  "{{email}}",
  "{{lastPurchaseDate}}",
];

const MessageEditor = ({
  messageTemplate,
  setMessageTemplate,
  objective,
  segmentDescription,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const [generatedTemplates, setGeneretedTemplates] = useState([]);
  const handleSelectTemplate = (template) => {
    setMessageTemplate(template);
    setShowDialog(false);
  };

  const insertTag = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const updatedText =
      messageTemplate.slice(0, start) + tag + messageTemplate.slice(end);

    setMessageTemplate(updatedText);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + tag.length;
    }, 0);
  };

  const handleGenerateTemplate = async () => {
    if (!description.trim()) {
      toast.info("Please enter a message description.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/ai/generate-templates", {
        messageDescription: description,
        segmentDescription,
        objective,
      });
      if (response.status === 200) {
        setGeneretedTemplates(response.data);
        toast.success("Templates Generated Successfully!");
      } else {
        toast.error("Something went wrong, Try Again.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>Message Personalization</div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-gray-100">
                <Sparkles className="w-4 h-4" />
                <p className="hidden sm:flex ml-2">Generate AI Templates</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Template</DialogTitle>
                <DialogDescription>
                  Enter a short description or intent of the message you'd like
                  to generate.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Label htmlFor="desc">Message Description</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Remind user of cart abandonment"
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateTemplate} disabled={loading}>
                  {loading ? "Generating..." : "Generate"}
                  {loading && <Loader2 className="animate-spin" />}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="messageTemplate">Message Template</Label>
          <Textarea
            id="messageTemplate"
            ref={textareaRef}
            className="mt-2"
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            placeholder="Hi {{name}}, we noticed you last purchased on {{lastPurchaseDate}}..."
            rows={5}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              onClick={() => insertTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        {generatedTemplates.length > 0 && (
          <div className="space-y-2 mt-4">
            {generatedTemplates.map((template, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectTemplate(template)}
                className="cursor-pointer p-3 border rounded-md hover:bg-muted transition"
              >
                {template}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageEditor;
