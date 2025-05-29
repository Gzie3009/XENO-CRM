const { GoogleGenAI } = require("@google/genai");
const { generateLabelPrompt } = require("../prompts/SystemPrompts");
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
exports.generateLabel = async (objective, description, rules, messageTemplate) => {
  try {
    const userPrompt = `
    Segment Objective: ${objective}
    Segment Description: ${description}
    Segment Rules: ${JSON.parse(rules)}
    Message Template: ${messageTemplate}
  `;
    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL_NAME,
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: generateLabelPrompt,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating label:", error);
    return "Untitled";
  }
};
