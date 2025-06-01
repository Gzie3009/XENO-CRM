const { GoogleGenAI } = require("@google/genai");
const { generateCampaignSummaryPrompt } = require("../prompts/SystemPrompts");
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateCampaignSummary = async (campaign) => {
  try {
    const userPrompt = generateCampaignSummaryPrompt(campaign);
    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL_NAME,
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Untitled";
  }
};

module.exports = generateCampaignSummary;
