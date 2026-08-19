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
                                    text: req.body.text
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        return res.status(response.status).json(data);

    } catch (error) {

        return res.status(500).json({
            error: "Something went wrong"
        });

    }
}