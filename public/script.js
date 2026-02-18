async function kirim() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userText = input.value;
  if (!userText) return;

  chat.innerHTML += `<div class="user">${userText}</div>`;
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await res.json();

  chat.innerHTML += `<div class="bot">${data.reply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}