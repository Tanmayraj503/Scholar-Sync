import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "No input provided" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a strict JSON generator.

Return ONLY valid JSON.
No extra text.
No markdown.

Format exactly like:

{
  "description": ["point 1", "point 2"]
}

Document:
${input}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      description: ["Internal server error. Please try again."],
    });
  }
}