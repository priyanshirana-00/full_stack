// Chat page logic (index.html)
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const logoutBtn = document.getElementById("logout-btn");

// Ensure user is logged in
let token = localStorage.getItem('token');
if (!token) {
  window.location.replace('/login.html');
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('displayName');
  window.location.replace('/login.html');
});

// Populate user badge
(async function loadUser() {
  try {
    const cachedName = localStorage.getItem('displayName');
    const badge = document.getElementById('user-badge');
    if (cachedName && badge) { badge.textContent = `Signed in as ${cachedName}`; return; }
    const res = await fetch('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const me = await res.json();
      const name = me.displayName || me.email;
      if (badge) badge.textContent = `Signed in as ${name}`;
      localStorage.setItem('displayName', name);
    }
  } catch {}
})();

let sending = false;
async function sendMessage() {
  if (sending) return;
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  const loader = document.createElement("div");
  loader.classList.add("message", "bot-message");
  loader.innerHTML = `<div class="loader"><span></span><span></span><span></span></div>`;
  chatBox.appendChild(loader);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    sending = true;
    sendBtn.disabled = true;
    userInput.disabled = true;
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ message }),
    });
    if (response.status === 401) {
      chatBox.removeChild(loader);
      showToast('Session expired. Please sign in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('displayName');
      window.location.replace('/login.html');
      return;
    }
    const data = await response.json().catch(() => ({}));
    chatBox.removeChild(loader);
    appendMessage("bot", data.reply || data.error || "No response from server.");
  } catch (error) {
    chatBox.removeChild(loader);
    showToast("⚠️ Error: Cannot connect to the server.");
  } finally {
    sending = false;
    sendBtn.disabled = false;
    userInput.disabled = false;
  }
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showToast(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => { t.remove(); }, 2500);
}
