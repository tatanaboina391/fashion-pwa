
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/generate-look', async (req, res) => {
    try {
        const { selections } = req.body;
        if (!selections) {
            return res.status(400).json({ error: 'Missing selections' });
        }

        // 1. Extract User Selections
        const fabric = selections.fabric?.name || 'Silk';
        const sareeColor = selections.sareeColor?.name || 'Red';
        const blouseColor = selections.blouseColor?.name || sareeColor;
        const borderType = selections.borderType?.name || 'Zari';
        const borderWidth = selections.borderWidth?.name || 'Wide';
        const frontNeck = selections.frontNeck?.name || 'Deep U Neck';
        const backNeck = selections.backNeck?.name || 'Deep Round Back';

        console.log("Generating look for:", { fabric, sareeColor, blouseColor, frontNeck, backNeck });

        // 2. Generate Text Description (gemini-2.0-flash)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        let description = "An elegant custom saree designed for you.";
        try {
            const textPrompt = `Describe a luxury custom saree:
            - Fabric: ${fabric}
            - Saree Color: ${sareeColor}
            - Blouse Color: ${blouseColor}
            - Blouse Design: ${frontNeck} front, ${backNeck} back.
            Write one short, elegant paragraph (max 30 words).`;

            const textResult = await model.generateContent(textPrompt);
            const textResponse = await textResult.response;
            description = textResponse.text();
        } catch (err) {
            console.error("Text Gen Error:", err.message);
        }

        // 3. Generate Image (gemini-2.0-flash)
        let imageBase64 = null;

        // This prompts specifically for a photorealistic image
        const imagePrompt = `A photorealistic full-body shot of an elegant Indian woman wearing a ${sareeColor} ${fabric} saree with a ${borderWidth} ${borderType} border. 
        She is wearing a matching ${blouseColor} blouse featuring a ${frontNeck} front design and ${backNeck} back design.
        High fashion photography, studio lighting, detailed embroidery, 8k resolution, cinematic look.`;

        const generateImageWithRetry = async (retries = 3) => {
            try {
                console.log(`Generating image... (Retries left: ${retries})`);

                // Using gemini-2.0-flash for image generation
                const result = await model.generateContent(imagePrompt);
                const response = await result.response;

                if (response.candidates && response.candidates.length > 0) {
                    const part = response.candidates[0].content.parts[0];
                    if (part.inlineData) {
                        console.log("Image generated successfully!");
                        return part.inlineData.data;
                    }
                }
                console.warn("No inlineData in response.");
            } catch (err) {
                console.error("Image Gen Error:", err.message);
                if (err.message.includes("429") && retries > 0) {
                    console.log("Rate limit hit. Retrying in 5s...");
                    await new Promise(res => setTimeout(res, 5000));
                    return generateImageWithRetry(retries - 1);
                }
            }
            return null;
        };

        imageBase64 = await generateImageWithRetry();

        res.json({
            description,
            imageBase64
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
