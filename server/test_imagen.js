import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const API_KEY = 'AIzaSyDWeMb7fma4YJpme3NpVkXuwXw6jqJMvjs';

if (!API_KEY) {
    console.error("Error: GOOGLE_API_KEY is missing in .env file.");
    process.exit(1);
}

// We rely on 'imagen-4.0-generate-001' which was found in your available models.
// Note: Imagen models on AI Studio use the ':predict' endpoint.
// IMPORTANT: This model requires a BILLING-ENABLED Google Cloud/AI Studio project.
// If you get a 400 "only accessible to billed users" error, you must enable billing.
const MODEL_NAME = 'gemini-3-flash-preview';

async function testImagen() {
    console.log(`Testing ${MODEL_NAME}...`);
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:predict?key=${API_KEY}`;

        console.log("URL:", url);

        const payload = {
            instances: [
                { prompt: "A futuristic fashion runway with neon lights, high resolution, 8k" }
            ],
            parameters: {
                sampleCount: 1,
                aspectRatio: "1:1" // Optional
            }
        };

        const response = await axios.post(url, payload);

        console.log("Success! Status:", response.status);

        if (response.data.predictions && response.data.predictions.length > 0) {
            const prediction = response.data.predictions[0];

            // Imagen 3/4 usually returns 'bytesBase64Encoded'
            if (prediction.bytesBase64Encoded) {
                console.log("Image generated successfully!");
                const base64Image = prediction.bytesBase64Encoded;
                const buffer = Buffer.from(base64Image, 'base64');
                fs.writeFileSync("generated_image_4.0.png", buffer);
                console.log("Saved image to generated_image_4.0.png");
            } else if (prediction.mimeType && prediction.bytesBase64Encoded) {
                console.log("Image generated successfully!");
                const base64Image = prediction.bytesBase64Encoded;
                const buffer = Buffer.from(base64Image, 'base64');
                fs.writeFileSync("generated_image_4.0.png", buffer);
                console.log("Saved image to generated_image_4.0.png");
            } else {
                console.log("Prediction found but structure unknown:", Object.keys(prediction));
            }
        } else {
            console.log("No predictions found in response.");
            console.log("Response data:", JSON.stringify(response.data, null, 2));
        }

    } catch (error) {
        console.error("FAILED.");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Status Text:", error.response.statusText);
            console.error("Error Data:", JSON.stringify(error.response.data, null, 2));

            if (error.response.status === 400 && JSON.stringify(error.response.data).includes("billed users")) {
                console.error("\nCRITICAL: You must enable BILLING in Google AI Studio / Cloud Console to use this model.");
            }
        } else {
            console.error(error.message);
        }
    }
}

testImagen();
