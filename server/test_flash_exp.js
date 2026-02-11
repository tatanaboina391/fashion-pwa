
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
async function testModelGen(modelName) {
    console.log(`Testing ${modelName} for image gen...`);
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

        const payload = {
            contents: [{
                parts: [{ text: "Generate an image of a red apple." }]
            }],
            generationConfig: {
                responseMimeType: "image/jpeg"
            }
        };

        const response = await axios.post(url, payload);

        console.log("Success Headers:", response.status);
        const part = response.data.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData) {
            console.log("GOT IMAGE DATA!");
            console.log("Mime:", part.inlineData.mimeType);
        } else {
            console.log("Got response but NO image data:", JSON.stringify(part, null, 2));
        }

    } catch (error) {
        console.error(`FAILED ${modelName}:`);
        console.error("Status:", error.response?.status);
        console.error("Error:", JSON.stringify(error.response?.data?.error?.message || error.message, null, 2));
    }
}

async function run() {
    await testModelGen('gemini-2.0-flash-exp');
}

run();
