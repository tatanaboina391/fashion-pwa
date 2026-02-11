
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

async function listModels() {
    try {
        console.log("Checking models with key ending in...", API_KEY ? API_KEY.slice(-4) : "NONE");
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );

        console.log("Available Models:");
        const models = response.data.models;

        models.forEach(m => {
            console.log(`Model: ${m.name}`);
            // console.log(`  Methods: ${m.supportedGenerationMethods}`);
        });

    } catch (error) {
        console.error("Error listing models:", error.response?.data || error.message);
    }
}

listModels();
