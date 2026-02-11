
// Gemini Text Generation Service using Direct REST API
//This avoids SDK version mismatches and provides full control over the endpoint.

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBfvAUTvdWZcUnixuG5aNCYeSdX-o8X4_A";

export const generateSareeDescription = async ({ fabric, frontNeck, backNeck, colorName }) => {
    try {
        const prompt = `
You are a luxury fashion designer describing a custom saree to a client.
Write a short, elegant, and alluring one-paragraph description (max 40 words) for a saree with the following specs:
 - Fabric: ${fabric}
 - Color: ${colorName}
 - Blouse Front: ${frontNeck}
 - Blouse Back: ${backNeck}

 Focus on the texture, the drape, and the feeling of wearing it. Use premium fashion vocabulary.
`;

        // Helper for retry logic
        const fetchWithRetry = async (url, options, retries = 3) => {
            try {
                const res = await fetch(url, options);
                if (!res.ok && retries > 0) {
                    console.warn(`Retrying API call... attempts left: ${retries}`);
                    await new Promise(r => setTimeout(r, 1000));
                    return fetchWithRetry(url, options, retries - 1);
                }
                return res;
            } catch (err) {
                if (retries > 0) {
                    await new Promise(r => setTimeout(r, 1000));
                    return fetchWithRetry(url, options, retries - 1);
                }
                throw err;
            }
        };

        // Direct REST API Call to Gemini 1.5 Flash Latest
        // Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 100
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract text from the response structure
        // structure: candidates[0].content.parts[0].text
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return `A stunning ${colorName} ${fabric} saree featuring a classic ${frontNeck} blouse.`;
        }

    } catch (error) {
        console.error("Gemini Text Generation Failed:", error);
        // Fallback text if API fails
        return `A stunning ${colorName} ${fabric} saree featuring a classic ${frontNeck} blouse, designed for elegance and grace.`;
    }
};
