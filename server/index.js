import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini SDK
// Ensure GOOGLE_API_KEY is in .env or passed here
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/generate-look", async (req, res) => {
  try {
    const { selections } = req.body;
    if (!selections) {
      return res.status(400).json({ error: "Missing selections" });
    }

    // 1. Extract User Selections
    const fabric = selections.fabric?.name || "Silk";
    const sareeColor = selections.sareeColor?.name || "Red";
    const blouseColor = selections.blouseColor?.name || sareeColor;
    const borderType = selections.borderType?.name || "Zari";
    const borderWidth = selections.borderWidth?.name || "Wide";
    const frontNeck = selections.frontNeck?.name || "Deep U Neck";
    const backNeck = selections.backNeck?.name || "Deep Round Back";

    console.log("Generating look for:", {
      fabric,
      sareeColor,
      blouseColor,
      frontNeck,
      backNeck,
    });

    // 2. Generate Text Description
    // Using gemini-2.0-flash by default as requested
    let description = "An elegant custom saree designed for you.";
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-robotics-er-1.5-preview",
      });
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
      // Fallback description
      description = `A stunning ${sareeColor} ${fabric} saree featuring a matching blouse.`;
    }

    // 3. Generate Image (Imagen 4.0 via REST)
    let imageBase64 = null;

    const imagePrompt = `A photorealistic full-body shot of an elegant Indian woman wearing a ${sareeColor} ${fabric} saree with a ${borderWidth} ${borderType} border. 
        She is wearing a matching ${blouseColor} blouse.
        High fashion photography, studio lighting, detailed embroidery, 8k resolution, cinematic look.`;

    // 3. Generate Image (Cloudflare Stable Diffusion XL)
    const generateImageCloudflare = async () => {
      try {
        console.log("Generating image with Cloudflare AI...");
        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
        const apiToken = process.env.CLOUDFLARE_API_TOKEN;

        if (!accountId || !apiToken) {
          console.error("Missing Cloudflare credentials");
          return null;
        }

        const response = await axios.post(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
          { prompt: imagePrompt },
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": "application/json",
            },
            responseType: "arraybuffer",
          },
        );

        const buffer = Buffer.from(response.data);
        const base64Image = buffer.toString("base64");
        console.log("Image generated successfully!");
        return base64Image;
      } catch (error) {
        console.error("Cloudflare Image Gen Error:", error.message);
        if (error.response) {
          console.error(
            "Cloudflare Response Data:",
            error.response.data.toString(),
          );
        }
        return null;
      }
    };

    imageBase64 = await generateImageCloudflare();

    res.json({
      description,
      imageBase64,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
