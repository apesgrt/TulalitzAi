const botName = "TulalitzAi";

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const typing = document.getElementById("typing");
const typingName = document.getElementById("typingName");

// Set nama bot di UI
document.getElementById("botName").innerText = botName;
typingName.innerText = botName;

// Fungsi tambah pesan
function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}

// Fungsi kirim pesan
async function kirim() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  // Tampilkan typing
  typing.style.display = "block";
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();

    typing.style.display = "none";

    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Maaf, terjadi kesalahan.", "bot");
    }

  } catch (error) {
    typing.style.display = "none";
    addMessage("Server error 😢", "bot");
  }
}
