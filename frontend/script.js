const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const authOverlay = document.getElementById("auth-overlay");
const loginForm = document.getElementById("login-form");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authError = document.getElementById("auth-error");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

loginForm.addEventListener("submit", login);
registerBtn.addEventListener("click", register);
logoutBtn.addEventListener("click", logout);

// Initial auth state
syncAuthUI();

function syncAuthUI() {
  const token = localStorage.getItem("token");
  const loggedIn = !!token;
  authOverlay.style.display = loggedIn ? "none" : "flex";
  logoutBtn.style.display = loggedIn ? "inline-block" : "none";
}

async function login(e) {
  e.preventDefault();
  authError.style.display = "none";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    localStorage.setItem("token", data.token);
    syncAuthUI();
  } catch (err) {
    authError.textContent = `⚠️ ${err.message}`;
    authError.style.display = "block";
  }
}

async function register() {
  authError.style.display = "none";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    // Auto-login after register
    const loginRes = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(loginData.error || "Login failed");
    localStorage.setItem("token", loginData.token);
    syncAuthUI();
  } catch (err) {
    authError.textContent = `⚠️ ${err.message}`;
    authError.style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("token");
  syncAuthUI();
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  appendMessage("user", message);
  userInput.value = "";

  // Show typing dots
  const loader = document.createElement("div");
  loader.classList.add("message", "bot-message");
  loader.innerHTML = `<div class="loader"><span></span><span></span><span></span></div>`;
  chatBox.appendChild(loader);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      authOverlay.style.display = "flex";
      return;
    }
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    chatBox.removeChild(loader);
    appendMessage("bot", data.reply || "No response from server.");
  } catch (error) {
    chatBox.removeChild(loader);
    appendMessage("bot", "⚠️ Error: Cannot connect to the server.");
  }
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
