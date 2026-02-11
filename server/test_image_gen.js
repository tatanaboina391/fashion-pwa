import axios from 'axios';

const API_KEY = "AIzaSyALuEIgi440BIkQeHCg8KBbIajpGDIAh60";
const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';
const imagePrompt = `High-end fashion photography. Split view: Front and Back. Woman wearing Royal Blue Silk saree with Wide Zari. Blouse has Sweetheart Neck and Deep U Back. Studio lighting, luxury aesthetic.`;

async function test() {
    console.log("Testing Image Generation...");
    try {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL_NAME}:generateContent?key=${API_KEY}`,
            {
                contents: [{ parts: [{ text: imagePrompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                ]
            }
        );
        console.log("Response Status:", res.status);
        if (res.data.candidates && res.data.candidates[0].content) {
            console.log("Candidate found.");
            const part = res.data.candidates[0].content.parts[0];
            if (part.inlineData) {
                console.log("Image Data Present (Length: " + part.inlineData.data.length + ")");
            } else {
                console.log("Image Data MISSING.");
                console.log(JSON.stringify(res.data, null, 2));
            }
        } else {
            console.log("No candidates.");
            console.log(JSON.stringify(res.data, null, 2));
        }
    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) {
            console.error("Data:", JSON.stringify(err.response.data, null, 2));
        }
    }
}

test();
