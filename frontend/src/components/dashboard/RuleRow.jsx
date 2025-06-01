import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { fieldOptions } from "@/lib/fieldOptions";

const getOperators = (type) => {
  switch (type) {
    case "number":
      return ["=", "!=", ">", "<", ">=", "<="];
    case "string":
      return ["=", "!=", "contains", "starts_with", "ends_with"];
    case "date":
      return ["=", "!=", "before", "after", "on_or_before", "on_or_after"];
    default:
      return ["="];
  }
};

export default function RuleRow({ rule, index, onUpdate, onDelete }) {
  const fieldConfig = fieldOptions[rule.field] || {
    label: "Order Amount",
    type: "number",
  };

  const [operatorOptions, setOperatorOptions] = useState([]);
  const [inputValue, setInputValue] = useState();

  // Updates when field is changed
  const handleFieldChange = (val) => {
    const newFieldConfig = fieldOptions[val];
    const newOperators = getOperators(newFieldConfig.type);
    const newValue = newFieldConfig.type === "number" ? 0 : "";

    onUpdate({
      field: val,
      operator: newOperators[0],
      value: newValue,
    });
  };

  const handleOperatorChange = (val) => {
    onUpdate({
      ...rule,
      operator: val,
    });
  };

  const handleValueChange = (val) => {
    let parsedValue = val;
    if (fieldConfig.type === "number") parsedValue = Number(val);
    if (fieldConfig.type === "date") parsedValue = val; // Keep as string for now
    setInputValue(parsedValue);
    onUpdate({
      ...rule,
      value: parsedValue,
    });
  };

  useEffect(() => {
    const fieldType = fieldOptions[rule.field]?.type || "number";
    const newOperators = getOperators(fieldType);
    setOperatorOptions(newOperators);
  }, [rule.field]);

  const inputType =
    fieldConfig.type === "number"
      ? "number"
      : fieldConfig.type === "date"
      ? "date"
      : "text";

  return (
    <div className="flex items-center gap-2 w-full mt-2">
      {/* Field Select */}
      <Select value={rule.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Field" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fieldOptions).map(([key, { label }]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Operator Select */}
      <Select value={rule.operator || ""} onValueChange={handleOperatorChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {operatorOptions.map((op) => (
            <SelectItem key={op} value={op}>
              {op}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Value Input */}
      <Input
        type={inputType}
        value={inputValue}
        onChange={(e) => handleValueChange(e.target.value)}
        className="w-[220px]"
      />

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(index)}
        className="text-red-500"
      >
        <X />
      </Button>
    </div>
  );
}
