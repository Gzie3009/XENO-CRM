import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Info } from "lucide-react";
import { motion } from "framer-motion";

const AudiencePreview = ({ audienceSize, totalUsers }) => {
  const [animatedSize, setAnimatedSize] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const percentage = totalUsers > 0 ? (audienceSize / totalUsers) * 100 : 0;

    // Animate audience size
    const sizeAnimation = setTimeout(() => {
      setAnimatedSize(audienceSize);
    }, 300);

    // Animate percentage
    const percentageAnimation = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);

    return () => {
      clearTimeout(sizeAnimation);
      clearTimeout(percentageAnimation);
    };
  }, [audienceSize, totalUsers]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const getAudienceStatus = (percentage) => {
    if (percentage === 0) return { label: "No users", color: "default" };
    if (percentage < 1) return { label: "Very small", color: "default" };
    if (percentage < 5) return { label: "Small", color: "secondary" };
    if (percentage < 20) return { label: "Medium", color: "default" };
    if (percentage < 50) return { label: "Large", color: "primary" };
    return { label: "Very large", color: "destructive" };
  };

  const audienceStatus = getAudienceStatus(animatedPercentage);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Audience Preview</CardTitle>
            <CardDescription>
              Estimated users matching your criteria
            </CardDescription>
          </div>
          <Badge variant={audienceStatus.color}>{audienceStatus.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <motion.span
              key={audienceSize}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              {formatNumber(animatedSize)}
            </motion.span>
          </div>
          <span className="text-muted-foreground mb-1">
            of {formatNumber(totalUsers)} users
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Percentage of total users</span>
            <span className="font-medium">
              {animatedPercentage.toFixed(2)}%
            </span>
          </div>
          <Progress value={animatedPercentage} className="h-2" />
        </div>

        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md text-sm">
          <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-muted-foreground">
            This is an estimate based on your current audience data. Actual
            campaign reach may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudiencePreview;
