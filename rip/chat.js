const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function sendMessage() {
  const message = userInput.value;
  userInput.value = "";

  const url = "https://api.openai.com/v1/engines/davinci-codex/completions?model=davinci-codex-001&prompt=" + encodeURIComponent(message);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // ganti YOUR_API_KEY dengan kunci API Anda
    },
    body: JSON.stringify({
      max_tokens: 100,
      n: 1,
      stop: '\n',
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
  });
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
