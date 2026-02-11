
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function testModel(modelName) {
    console.log(`\nTesting model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = "A photorealistic image of a woman wearing a red saree.";

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (response.candidates && response.candidates.length > 0) {
            const part = response.candidates[0].content.parts[0];
            if (part.inlineData) {
                console.log("✅ Image generated successfully!");
            } else if (part.text) {
                console.log("⚠️  Text response:", part.text.substring(0, 100) + "...");
            }
        }
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

async function run() {
    await testModel("gemini-2.5-flash");
}

run();
