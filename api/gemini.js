export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: String(req.body.text || "")
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("Gemini response:", data);

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "Gemini API request failed"
            });
        }

        return res.status(200).json(data);

    } catch (error) {

        console.error("Server error:", error);

        return res.status(500).json({
            error: error.message || "Server error"
        });
    }
}