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
    const { type = 'saree', selections } = req.body;
    if (!selections) {
      return res.status(400).json({ error: "Missing selections" });
    }

    // 1. Extract User Selections
    const productType = selections.productType || "Classic";
    const fabric = selections.fabric || "Silk";
    const baseColor = selections.baseColor?.name || selections.sareeColor?.name || "Red";
    const blouseColor = selections.blouse?.color?.name || selections.blouseColor?.name || baseColor;
    const borderType = selections.border?.type || selections.borderType || "None";
    const frontNeck = selections.blouse?.frontNeck || selections.frontNeck || "Round neck";
    const backNeck = selections.blouse?.backNeck || selections.backNeck || "Deep U-back";
    const handDesign = selections.blouse?.handDesign || selections.handDesign || "Regular Short";
    const embellishments = selections.embellishments || selections.designs || [];
    
    let dupattaInfo = "";
    if (type !== 'saree' && selections.dupatta) {
      dupattaInfo = ` with a ${selections.dupatta.color?.name || baseColor} ${selections.dupatta.fabric || 'Net'} dupatta`;
    }

    console.log(`Generating ${type} look for:`, {
      productType,
      fabric,
      baseColor,
      blouseColor,
      frontNeck,
      backNeck,
      handDesign,
      embellishments
    });

    // 2. Generate Text Description
    let description = `An elegant custom ${type} designed for you.`;
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      
      const designDetails = embellishments.length > 0 ? ` featuring ${embellishments.join(', ')}` : "";
      
      const textPrompt = `Describe a luxury custom ${type} ensemble:
            - Style: ${productType}
            - Main Color: ${baseColor}
            - Fabric: ${fabric}
            - Blouse: ${blouseColor} color, ${frontNeck} front, ${backNeck} back, ${handDesign} sleeves.
            ${dupattaInfo ? `- Dupatta: ${dupattaInfo}` : ""}
            - Work: ${designDetails}
            Write one short, elegant paragraph (max 30 words) for a fashion catalog.`;

      const textResult = await model.generateContent(textPrompt);
      const textResponse = await textResult.response;
      description = textResponse.text();
    } catch (err) {
      console.error("Text Gen Error:", err.message);
      description = `A stunning ${baseColor} ${fabric} ${type} featuring a matching ${blouseColor} blouse with ${frontNeck} and ${backNeck} design.`;
    }

    // 3. Generate Image Prompt based on type
    let imagePrompt = "";
    const commonStyle = "High fashion photography, studio lighting, professional model, editorial style, 8k resolution, cinematic look, highly detailed fabric texture.";
    
    if (type === 'lehanga') {
      imagePrompt = `A photorealistic full-body shot of a professional Indian fashion model wearing a luxury bridal ${productType}. 
        The flared lehanga skirt is ${baseColor} ${fabric}${embellishments.length > 0 ? ' with ' + embellishments.join(' and ') : ''}. 
        She is wearing a matching ${blouseColor} blouse with ${frontNeck} and ${handDesign} sleeves${dupattaInfo}.
        ${commonStyle}`;
    } else if (type === 'half-saree') {
      imagePrompt = `A photorealistic full-body shot of a professional Indian fashion model wearing a traditional ${baseColor} ${fabric} half-saree (Langa Voni). 
        The skirt is ${baseColor} and she has a ${dupattaInfo} elegantly draped. 
        Matching ${blouseColor} blouse with ${frontNeck}.
        ${commonStyle}`;
    } else {
      // Default: Saree
      imagePrompt = `A photorealistic full-body shot of a professional Indian fashion model wearing an elegant ${baseColor} ${fabric} ${productType} saree. 
        Matching ${blouseColor} blouse with ${frontNeck} and ${backNeck}. 
        Border is ${borderType}.
        ${commonStyle}`;
    }

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

    const imageBase64 = await generateImageCloudflare();

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
