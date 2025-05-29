const generateLabelPrompt = `
You are an advanced AI tasked with generating concise, informative labels for customer segments in a CRM system.

Each customer segment includes:

An Objective (string) that describes the segment's purpose or goal. 

A detailed description

A ruleset (JSON) defining campaign filters

A message template used for marketing

Your job is to:

Generate a clear, business-friendly label (3–5 words) that best represents the segment's key attributes.

Ensure the label aligns with the description, ruleset, and the tone/style of the message template.

Guidelines:
The label must capture the essence of the audience (e.g., demographics, behavior, preferences).

Avoid jargon or abstract/technical terms.

Prioritize clarity, creativity, and relevance to the messaging tone.

Consider dynamic tags (like {{purchases}} or {{firstName}}) in the message to infer behavioral context.

If the message uses a hashtag (e.g., #SustainableYoungConsumers), it can inspire but should not limit your label choice.

Output Format:
[Primary label, 3–5 words]


Example Input:
Segment Objective: Attract Eco-conscious Millennials

Description: Young adults aged 25–35 who prioritize sustainability in their purchasing decisions, often seeking eco-friendly products and brands.


Ruleset:
{
  "operator": "AND",
  "rules": [
    { "field": "lastVisit", "operator": ">", "value": "2024-05-01" },
    { "field": "purchases", "operator": ">", "value": 3 },
    { "field": "interests", "operator": "contains", "value": "eco-friendly" }
  ]
}



Message Template:

python
Copy
Edit
Hey {{firstName}}, 🌱

We know you're passionate about sustainability — and so are we!  
Since your last visit, we've added even more eco-friendly products curated just for mindful shoppers like you.

💚 Here’s something new to explore:  
{{personalizedProduct}} — sustainably made, planet-approved.

As someone who’s made {{purchases}} conscious choices already, this one’s just for you.

Shop green,  
The [Your Brand] Team  
#SustainableYoungConsumers

Output:
Sustainable Young Consumers


`;


const generateTemplatesPrompt = `
You are an AI designed to generate message templates for CRM campaigns. Based on the provided campaign objective, segment description, and message description, 
generate 2-3 unique message templates that may incorporate the following placeholders: {{name}}, {{phone}}, {{email}}, and {{lastPurchaseDate}}.
Include emojis sparingly and professionally only if appropriate for the message context.
Ensure that the templates are tailored to the campaign's goals and relevant to the specified audience segment.If any products are mentioned in the message description, 
seamlessly integrate these into the templates while maintaining a natural flow.The output should be clear, engaging, 
and suitable for use in a CRM context." 

**Input Requirements:** 
1.Campaign Objective: [Insert clear objective]
2.Segment Description: [Insert detailed description of the target audience]
3.Message Description: [Insert detailed message content including any products]

Format your output in JSON as follows: ["template1\", "template2\", "template3\"].
Ensure the templates are clear, engaging, and tailored to the provided inputs.
`;


module.exports = {
  generateLabelPrompt,
  generateTemplatesPrompt
};
