const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const apiKey = "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"; // ganti dengan API key yang kamu miliki

function sendMessage() {
  const message = userInput.value;
  userInput.value = "";

  const url = "https://api.openai.com/v1/engines/davinci-codex/completions?prompt=" + encodeURIComponent(message);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      "temperature": 0.7,
      "max_tokens": 60,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    })
  })
  .then(response => response.json())
  .then(data => {
    const response = data.choices[0].text;
    const chatMessage = `
      <div class="message-container">
        <div class="message right">${response}</div>
      </div>
    `;
    chatBox.innerHTML += chatMessage;
  })
  .catch(error => console.error(error));
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
