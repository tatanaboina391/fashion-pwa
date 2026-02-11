
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.error("Error: GOOGLE_API_KEY is missing in .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// User requested model
const MODEL_NAME = "gemini-3-flash-preview";

async function run() {
    console.log(`Testing model: ${MODEL_NAME}`);
    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = "A photorealistic image of a woman wearing a red saree with gold border.";

        console.log("Prompt:", prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;

        console.log("Response received.");
        // console.log(JSON.stringify(response, null, 2));

        if (response.candidates && response.candidates.length > 0) {
            const candidate = response.candidates[0];
            const part = candidate.content.parts[0];

            if (part.inlineData) {
                console.log("Image generated successfully!");
                const buffer = Buffer.from(part.inlineData.data, 'base64');
                fs.writeFileSync("gemini_3_output.png", buffer);
                console.log("Saved to gemini_3_output.png");
            } else if (part.text) {
                console.log("Text response (Image might not be supported directly or prompt interpreted as text):");
                console.log(part.text);
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Details:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

run();
