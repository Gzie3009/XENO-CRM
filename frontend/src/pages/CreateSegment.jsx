import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import MetadataForm from "@/components/dashboard/MetadataForm";
import NaturalLanguagePrompt from "@/components/dashboard/NaturalLanguagePrompt";
import RuleBuilder from "@/components/dashboard/RuleBuilder";
import AudiencePreview from "@/components/dashboard/AudiencePreview";
import api from "@/utils/API";
import { useNavigate } from "react-router-dom";
import MessageEditor from "@/components/dashboard/MessageEditor";
import { Bus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateSegmentPage = () => {
  const [segment, setSegment] = useState({
    operator: "AND",
    rules: [],
  });

  const [objective, setObjective] = useState("");
  const [segmentDescription, setSegmentDescription] = useState("");
  const [segmentLabel, setSegmentLabel] = useState("");

  const [audienceSize, setAudienceSize] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [messageTemplate, setMessageTemplate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!objective) {
        toast.info("Please provide an objective for the segment.");
        return;
      }
      if (!segmentDescription) {
        toast.info("Please provide a description for the segment.");
        return;
      }
      if (!messageTemplate) {
        toast.info("Please provide a message template for the segment.");
        return;
      }

      const fullSegment = {
        objective: objective,
        description: segmentDescription,
        rules: segment,
        messageTemplate: messageTemplate,
      };

      const response = await api.post("/segment", fullSegment);
      if (response.status === 201) {
        toast.success("Campaign Started Successfully!");
        navigate(`/campaigns`);
      }
    } catch (error) {
      console.error("Error submitting segment:", error);
      toast.error("Error submitting segment");
    } finally {
      setLoading(false);
    }
  };

  const getTotalCustomers = async () => {
    try {
      const response = await api.get("/customers/total");
      if (response.status === 200) {
        setTotalCustomers(response.data.totalCustomers);
      }
    } catch (error) {
      console.error("Error fetching total customers:", error);
    }
  };

  useEffect(() => {
    getTotalCustomers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-10 pb-5 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create Customer Segment
      </h1>

      {/* Row 1: Metadata and NLP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MetadataForm
          objective={objective}
          setObjective={setObjective}
          segmentDescription={segmentDescription}
          setSegmentDescription={setSegmentDescription}
          label={segmentLabel}
          setLabel={setSegmentLabel}
        />
        <NaturalLanguagePrompt
          setSegment={setSegment}
          objective={objective}
          description={segmentDescription}
        />
      </div>

      {/* Row 2: Rules + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RuleBuilder
          setAudienceSize={setAudienceSize}
          segment={segment}
          setSegment={setSegment}
        />
        <AudiencePreview
          audienceSize={audienceSize}
          totalUsers={totalCustomers}
        />
      </div>
      <MessageEditor
        messageTemplate={messageTemplate}
        setMessageTemplate={setMessageTemplate}
        objective={objective}
        segmentDescription={segmentDescription}
      />
      <Separator className="mt-4" />
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex gap-x-2"
        >
          {loading ? (
            <>
              Starting...
              <Loader2 className="animate-spin mr-2" />
            </>
          ) : (
            <>
              Start Campaign <Bus />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateSegmentPage;
