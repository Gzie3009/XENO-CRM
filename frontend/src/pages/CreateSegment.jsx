import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from 'lucide-react';

const CreateSegmentPage = () => {
  const [segmentName, setSegmentName] = useState('');
  const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);
  const [logic, setLogic] = useState('AND'); // 'AND' or 'OR'

  const handleAddRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const handleRemoveRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleRuleChange = (index, property, value) => {
    const newRules = rules.map((rule, i) => (
      i === index ? { ...rule, [property]: value } : rule
    ));
    setRules(newRules);
  };

  // Dummy audience preview
  const audiencePreviewCount = Math.floor(Math.random() * 500) + 50; 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Segment</h1>

      <Card>
        <CardHeader>
          <CardTitle>Segment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="segmentName" className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
            <Input 
              id="segmentName" 
              type="text" 
              placeholder="e.g., High Spenders Q4"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Rules</h3>
            <div className="flex items-center mb-2">
              <span className="mr-2">Logic:</span>
              <Select value={logic} onValueChange={setLogic}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {rules.map((rule, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2 p-3 border rounded-md">
                <Select 
                  value={rule.field}
                  onValueChange={(value) => handleRuleChange(index, 'field', value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spend">Total Spend</SelectItem>
                    <SelectItem value="visits">Total Visits</SelectItem>
                    <SelectItem value="last_purchase_date">Last Purchase Date</SelectItem>
                    <SelectItem value="signup_date">Signup Date</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                  </SelectContent>
                </Select>

                <Select 
                  value={rule.operator}
                  onValueChange={(value) => handleRuleChange(index, 'operator', value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">">{'>'}</SelectItem>
                    <SelectItem value="<">{'<'}</SelectItem>
                    <SelectItem value="=">{'='}</SelectItem>
                    <SelectItem value="!=">{'!='}</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                  </SelectContent>
                </Select>

                <Input 
                  type="text" 
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveRule(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddRule} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Rule
            </Button>
          </div>

          <div className="mt-6 p-4 border rounded-md bg-muted/40">
            <h4 className="font-semibold">Audience Preview</h4>
            <p className="text-2xl font-bold text-primary">{audiencePreviewCount} Customers</p>
            <p className="text-sm text-muted-foreground">Based on current rules (simulated)</p>
          </div>

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save & Create Campaign</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateSegmentPage;