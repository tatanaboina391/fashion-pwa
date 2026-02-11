
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

async function listAllModels() {
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );

        console.log("All Available Models:");
        response.data.models.forEach(m => {
            console.log(`- ${m.name}`);
            console.log(`  Methods: ${m.supportedGenerationMethods}`);
        });

    } catch (error) {
        console.error("Error listing models:", error.response?.data || error.message);
    }
}

listAllModels();
