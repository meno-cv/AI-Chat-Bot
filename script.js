function sendPromptOnAction() {

    let userInput = document.getElementById("txtUserInput").value.trim();

    if (userInput === "") {
        return;
    }

    fetch("/api/gemini", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: userInput
        })

    })
    .then(async (response) => {

        const result = await response.json();

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

        console.error(error);

        document.getElementById("lblResponce").innerHTML =
            "<p>Something went wrong. Please try again.</p>";

    });
}