
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = new GoogleGenerativeAI("AIzaSyALuEIgi440BIkQeHCg8KBbIajpGDIAh60");
const MODEL_NAME = 'gemini-2.5-flash-image';

async function testGeminiImage() {
    console.log(`Testing ${MODEL_NAME}...`);
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

        // Standard Gemini Payload
        const payload = {
            contents: [{
                parts: [{ text: "Generate an image of a red apple." }]
            }]
        };

        const response = await axios.post(url, payload);

        console.log("Success Response Headers:", response.status);
        // console.log("Response Body Preview:", JSON.stringify(response.data, null, 2).substring(0, 500));

        // Check for image data in candidates
        const parts = response.data.candidates?.[0]?.content?.parts;
        if (parts) {
            parts.forEach((part, index) => {
                if (part.inlineData) { // This is how Gemini usually returns images?
                    console.log(`Part ${index} contains inlineData (Mime: ${part.inlineData.mimeType})`);
                    console.log(`Base64: ${part.inlineData.data.substring(0, 30)}...`);
                } else if (part.text) {
                    console.log(`Part ${index} text: ${part.text}`);
                } else if (part.executableCode) {
                    console.log(`Part ${index} executableCode`);
                } else {
                    console.log(`Part ${index} unknown keys: ${Object.keys(part)}`);
                }
            });
        }

    } catch (error) {
        console.error("FAILED.");
        console.error("Status:", error.response?.status);
        console.error("Error Data:", JSON.stringify(error.response?.data, null, 2));
    }
}

testGeminiImage();
