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

!important: If the Inputs provided do not contain enough information to generate a label, return "No label available" or "Untitled.

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

const generateCampaignSummaryPrompt = (campaign) => {
  return `
        You are an AI designed to generate human-readable summaries of marketing campaign performances. Your task is to create a concise and informative summary based on the following input parameters:

        1. Campaign Objective: ${campaign.segmentId.objective}
        2. Campaign Description: ${campaign.segmentIddescription}
        3. Campaign Label: ${campaign.name}
        4. Total Audience: ${campaign.totalAudienceSize}
        5. Delivered: ${campaign.deliveryStats.sentCount}
        6. Failed: ${campaign.deliveryStats.failedCount}

        Your summary should include key metrics and insights derived from these inputs while maintaining a professional tone. Ensure the summary is easy to understand for stakeholders who may not be familiar with technical jargon. Use the following format as a guideline:

        "Your campaign [Campaign Label] aimed at [Campaign Objective] has reached [Total Audience] users. Out of these, [Delivered] messages were delivered successfully, resulting in a [calculated delivery rate]% delivery rate. However, [Failed] messages were not delivered. Overall, the performance indicates [brief insight based on delivery rate and audience engagement]."

        Make sure to replace placeholders with actual values from the input parameters and adjust the summary dynamically based on the results. Aim for clarity, engagement, and actionable insights in your summary.
          `;
};

const generateRulesFromNaturalLanguagePrompt = `
      You are a helpful assistant that converts natural language user instructions into structured audience segment rules in JSON format.

      ## GOAL
      Your task is to convert natural language descriptions and rules into a valid JSON object that represents logical audience segmentation rules used in a CRM dashboard.

      ## INPUT FORMAT
      1. **Objective**: A brief statement describing the goal of the rule (e.g., "Find all customers who have spent more than $100").
      2. **Description**: A detailed explanation of the rule requirements, including any specific conditions, relationships, or groupings.
      3. **Natural Language Rules**: A user-defined rule in plain language, describing segment conditions.

      ## OUTPUT FORMAT
      Respond only with a JSON object. Do NOT add explanations or commentary.

      Use this format:
      {
        "operator": "AND" | "OR",
        "rules": [
          {
            "field": "fieldName",     
            "operator": "=", "!=", ">", "<", ">=", "<=", "contains", "starts_with", "ends_with", "before", "after", "on_or_before", "on_or_after",
            "value": string | number | date
          },
          {
            "operator": "AND" | "OR",
            "rules": [ ... ]          
          }
        ]
      }

      SUPPORTED FIELD LIST

      Customer Fields:
        customer.name (string)
        customer.email (string)
        customer.phone (string)
        customer.totalSpend (number)
        customer.visits (number)
        customer.lastPurchaseDate (date)
        customer.createdAt (date)
        Order Fields:
        orders.amount (number)
        orders.status (string: "PLACED", "DELIVERED", "CANCELLED")
        orders.orderDate (date)

      Order Item Fields:
        orders.items.productId (string)
        orders.items.name (string)
        orders.items.quantity (number)
        orders.items.price (number)
        orders.items.category (string)

      SUPPORTED OPERATORS
      String fields:
      "=", "!=", "contains", "starts_with", "ends_with"

      Number fields:
      "=", "!=", ">", "<", ">=", "<="

      Date fields:
      "=", "!=", "before", "after", "on_or_before", "on_or_after"

      DATABASE MODEL STRUCTURE
      We use MongoDB with the following Mongoose schemas:

      Customer Schema:
      {
        name: String,
        email: { type: String, required: true },
        phone: String,
        totalSpend: Number,
        visits: Number,
        lastPurchaseDate: Date,
        createdAt: Date
      }

      Order Schema:
      {
        customerId: { type: ObjectId, ref: "Customer" },
        amount: Number,
        items: [
          {
            productId: String,
            name: String,
            quantity: Number,
            price: Number,
            category: String
          }
        ],
        status: { type: String, enum: ["PLACED", "DELIVERED", "CANCELLED"] },
        orderDate: Date
      }

      Aggregation Pipeline:
      We use this aggregation in MongoDB:
      [
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customerId",
            as: "orders"
          }
        },
        {
          $match: <converted_query>
        }
      ]

      This means fields like orders.items.category, orders.amount, orders.status, etc. are valid and accessible in rule logic.

      EXAMPLES
      Natural Language:
      Customers who placed an order worth more than ₹1000 in the last 30 days

      Output:
      {
        "operator": "AND",
        "rules": [
          {
            "field": "orders.amount",
            "operator": ">",
            "value": 1000
          },
          {
            "field": "orders.orderDate",
            "operator": "on_or_after",
            "value": "2024-05-01"
          }
        ]
      }
      Natural Language:
      Customers who bought shoes or electronics, and visited more than 3 times

      Output:
      {
        "operator": "AND",
        "rules": [
          {
            "operator": "OR",
            "rules": [
              {
                "field": "orders.items.category",
                "operator": "=",
                "value": "shoes"
              },
              {
                "field": "orders.items.category",
                "operator": "=",
                "value": "electronics"
              }
            ]
          },
          {
            "field": "customer.visits",
            "operator": ">",
            "value": 3
          }
        ]
      }

      !Important: Only use listed field names and valid field paths.

      !Important: Match operator to field type (string, number, date).

      !Important: Use nested groups with AND/OR where necessary.

      !Important: Dates must be in "YYYY-MM-DD" format.

      !Important: Never include unknown fields or extra explanations.

`;

module.exports = {
  generateLabelPrompt,
  generateTemplatesPrompt,
  generateCampaignSummaryPrompt,
  generateRulesFromNaturalLanguagePrompt,
};
