// Select DOM elements
const promptInput = document.querySelector("#promt"); // Typo kept for compatibility
const chatContainer = document.querySelector(".chat_cantainer");

// API URL
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAsQaeBuxKd3xiCmj0g52jMzmkN3r-LuiY";

// Stores user data if needed
let user = {
    data: null,
};

// Scroll to bottom utility
function scrollToBottom() {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
}

// Create and return a chat message box
function createChatBox(innerHTML, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = innerHTML;
    return div;
}

// Generate AI response and update the DOM
async function generateResponse(aiChatBox, userPrompt) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const result = await response.json();

        const aiMessage = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response available.";

        aiChatBox.innerHTML = `
            <img src="aiimage.png" alt="AI" id="aiimage" width="50">
            <div class="ai-chat-area">${aiMessage}</div>`;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        aiChatBox.innerHTML = `
            <img src="aiimage.png" alt="AI" id="aiimage" width="50">
            <div class="ai-chat-area">⚠️ Error fetching response. Please try again later.</div>`;
    } finally {
        scrollToBottom();
    }
}

// Handle user input and trigger response generation
function handleChatResponse(message) {
    user.data = message;

    const userHtml = `
        <img src="user.png" alt="User" id="userimage" width="50">
        <div class="user-chat-area">${user.data}</div>`;
    const userChatBox = createChatBox(userHtml, "user-chat-box");
    chatContainer.appendChild(userChatBox);

    promptInput.value = "";
    scrollToBottom();

    // Show loading message
    const loadingHtml = `
        <img src="aiimage.png" alt="AI" id="aiimage" width="50">
        <div class="ai-chat-area">
            <img src="loading.gif" alt="Loading..." class="load" width="30">
        </div>`;
    const aiChatBox = createChatBox(loadingHtml, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);

    // Generate actual response
    generateResponse(aiChatBox, user.data);
}

// Event listener for Enter key
promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const userInput = promptInput.value.trim();
        if (userInput !== "") {
            handleChatResponse(userInput);
        }
    }
});
