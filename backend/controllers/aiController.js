const { GoogleGenAI } = require("@google/genai");
const { generateTemplatesPrompt } = require("../prompts/SystemPrompts");
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateTemplates = async (req, res) => {
  try {
    const { messageDescription, segmentDescription, objective } = req.body;

    if (!messageDescription || !segmentDescription || !objective) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const userPrompt = `
    Segment Objective: ${objective}
    Segment Description: ${segmentDescription}
    Message Description: ${messageDescription}
  `;

    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL_NAME,
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: generateTemplatesPrompt,
        responseMimeType: "application/json",
      },
    });
    res.status(200).json(JSON.parse(response.text));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
