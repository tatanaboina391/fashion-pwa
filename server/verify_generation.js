
import axios from 'axios';

async function triggerBackend() {
    console.log("Triggering Backend API at http://localhost:5000/generate-look...");
    try {
        const response = await axios.post('http://localhost:5000/generate-look', {
            selections: {
                fabric: { name: "Silk" },
                sareeColor: { name: "Red" },
                blouseColor: { name: "Green" },
                borderType: { name: "Zari" },
                borderWidth: { name: "Wide" },
                frontNeck: { name: "Round" },
                backNeck: { name: "Deep" }
            }
        });

        console.log("\n⬇️ BACKEND RESPONSE RECEIVED ⬇️");
        console.log("Description:", response.data.description);

        if (response.data.imageBase64) {
            console.log("Image Base64: [PRESENT]");
            console.log("First 50 chars:", response.data.imageBase64.substring(0, 50) + "...");
            console.log("Total Length:", response.data.imageBase64.length);
            console.log("✅ CONCLUSION: Yes, the image IS generating.");
        } else {
            console.log("Image Base64: NULL");
            console.log("❌ CONCLUSION: Image failed to generate.");
        }

    } catch (error) {
        console.error("Request Failed:", error.message);
        if (error.response) {
            console.error("Server Response:", error.response.data);
        }
    }
}

triggerBackend();
