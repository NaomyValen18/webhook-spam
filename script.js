async function sendMessage(webhookUrl, message, username) {
    try {
        const body = {
            content: message,
        };
        if (username) {
            body.username = username;
        }

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            console.log("Message sent successfully.");
        } else {
            console.error("Failed to send message. Status:", response.status);
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

async function startSpam() {
    const webhookUrl = document.getElementById("webhookUrl").value;
    const messageContent = document.getElementById("messageContent").value;
    const username = document.getElementById("username").value;
    const messageCount = parseInt(document.getElementById("messageCount").value, 10);

    if (!webhookUrl || !messageContent || isNaN(messageCount) || messageCount < 1) {
        alert("Please fill in all fields correctly.");
        return;
    }

    for (let i = 0; i < messageCount; i++) {
        await sendMessage(webhookUrl, messageContent, username);
        console.log(`Message ${i + 1} sent.`);
    }

    alert("Spamming complete!");
}