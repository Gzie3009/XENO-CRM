import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RuleRow } from "./RuleRow";
import { Trash } from "lucide-react";

export function RuleGroup({ group, onChange, onDelete }) {
  const updateRule = (index, newRule) => {
    const newRules = [...group.rules];
    newRules[index] = newRule;
    onChange({ ...group, rules: newRules });
  };

  const deleteRule = (index) => {
    const newRules = group.rules.filter((_, i) => i !== index);
    onChange({ ...group, rules: newRules });
  };

  const addRule = () => {
    onChange({
      ...group,
      rules: [...group.rules, { field: "", operator: "", value: "" }],
    });
  };

  const addGroup = () => {
    onChange({
      ...group,
      rules: [...group.rules, { operator: "AND", rules: [] }],
    });
  };

  return (
    <div className="border p-4 rounded-xl mb-4 overflow-x-auto ">
      <div className="flex items-center mb-4">
        <Select
          value={group.operator}
          onValueChange={(val) => onChange({ ...group, operator: val })}
        >
          <SelectTrigger className="w-[100px] mr-2">
            <SelectValue placeholder="AND/OR" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={addRule}>
          + Rule
        </Button>
        <Button variant="outline" onClick={addGroup} className="ml-2">
          + Group
        </Button>
        {onDelete && (
          <Button
            variant="destructive"
            className="ml-2 md:ml-auto"
            onClick={onDelete}
          >
            <Trash />
          </Button>
        )}
      </div>

      {group.rules.map((rule, index) =>
        rule.rules ? (
          <RuleGroup
            key={index}
            group={rule}
            onChange={(newGroup) => updateRule(index, newGroup)}
            onDelete={() => deleteRule(index)}
          />
        ) : (
          <RuleRow
            key={index}
            rule={rule}
            onChange={(newRule) => updateRule(index, newRule)}
            onDelete={() => deleteRule(index)}
          />
        )
      )}
    </div>
  );
}
