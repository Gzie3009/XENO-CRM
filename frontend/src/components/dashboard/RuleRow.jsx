import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash } from "lucide-react";

export function RuleRow({ rule, onChange, onDelete }) {
  return (
    <div className="flex gap-2 items-center my-2">
      <Select
        value={rule.field}
        onValueChange={(val) => onChange({ ...rule, field: val })}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Field" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="spend">Spend</SelectItem>
          <SelectItem value="visits">Visits</SelectItem>
          <SelectItem value="last_active_days_ago">Inactive Days</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={rule.operator}
        onValueChange={(val) => onChange({ ...rule, operator: val })}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Op" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=">">&gt;</SelectItem>
          <SelectItem value="<">&lt;</SelectItem>
          <SelectItem value="=">=</SelectItem>
        </SelectContent>
      </Select>

      <Input
        className="w-[100px]"
        value={rule.value}
        onChange={(e) => onChange({ ...rule, value: e.target.value })}
      />
      <Button variant="destructive" onClick={onDelete}>
        <Trash></Trash>
      </Button>
    </div>
  );
}
