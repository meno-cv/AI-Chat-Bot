function sendPromptOnAction() {

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-goog-api-key", "apikey");

    let userInput = document.getElementById("txtUserInput").value.trim();

    if (userInput === "") {
        return;
    }

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": userInput
                    }
                ]
            }
        ]
    });

    fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
        {
            method: "POST",
            headers: myHeaders,
            body: raw
        }
    )
    .then(async (response) => {

        const result = await response.json();

        console.log("Gemini response:", result);

        if (!response.ok) {
            throw new Error(
                result.error?.message || "API request failed"
            );
        }

        return result;
    })
    .then((result) => {

        document.getElementById("lblResponce").innerHTML =
            markdown.default(
                result.candidates[0].content.parts[0].text
            );

    })
    .catch((error) => {

        console.error("ERROR:", error);

        document.getElementById("lblResponce").innerHTML =
            "<p>Something went wrong: " + error.message + "</p>";

    });
}