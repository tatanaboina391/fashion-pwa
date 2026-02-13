import { GoogleGenAI } from "@google/genai";
const API_KEY = process.env.GOOGLE_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });
// 1. List Models via REST to see exactly what is available
async function main() {
  console.log("ai ==", ai);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:
      "A royal blue Paithani saree, paired with a high-neck blouse featuring an elegant keyhole back, creates a sophisticated, monochromatic look.",
  });
  console.log(response.text);
}

await main();
