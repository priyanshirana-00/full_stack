// Shared auth logic for login.html and signup.html
(function(){
  // Determine mode from global or DOM
  let mode = window.AUTH_MODE; // 'login' | 'signup'
  const errorEl = document.getElementById('auth-error');

  // If already logged in, go to chat
  const existing = localStorage.getItem('token');
  if (existing) {
    window.location.replace('/');
    return;
  }

  function showError(msg){
    if (!errorEl) return;
    errorEl.textContent = `⚠️ ${msg}`;
    errorEl.style.display = 'block';
  }

  async function doRequest(url, payload){
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    let data = {};
    try { data = await res.json(); } catch {}
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  if (!mode) {
    if (document.getElementById('login-form')) mode = 'login';
    else if (document.getElementById('signup-form')) mode = 'signup';
  }

  // Google Sign-In
  function initGoogleSignIn() {
    try {
      const cid = window.APP_CONFIG && window.APP_CONFIG.googleClientId;
      const hasGsi = !!(window.google && window.google.accounts && window.google.accounts.id);
      const container = document.getElementById('google-btn');
      if (!container) return; // not on this page
      if (!cid) { container.innerHTML = '<small style="color:#6b7280">Google sign-in not configured</small>'; return; }
      if (!hasGsi) { setTimeout(initGoogleSignIn, 300); return; }

      window.google.accounts.id.initialize({
        client_id: cid,
        callback: handleGoogleCredential,
        ux_mode: 'popup'
      });
      window.google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with'
      });
      // Optionally trigger one-tap
      // window.google.accounts.id.prompt();
    } catch (e) {
      console.warn('Google init failed', e);
    }
  }

  async function handleGoogleCredential(response) {
    const idToken = response && response.credential;
    if (!idToken) return;
    try {
      const { token, user } = await doRequest('/auth/google', { idToken });
      localStorage.setItem('token', token);
      if (user?.displayName) localStorage.setItem('displayName', user.displayName);
      window.location.replace('/');
    } catch (err) {
      showError(err.message);
    }
  }

  if (mode === 'login') {
    const form = document.getElementById('login-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault(); errorEl.style.display = 'none';
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const submitBtn = form.querySelector('button.primary');
      submitBtn.disabled = true;
      Array.from(form.elements).forEach(el => { if (el.tagName === 'INPUT') el.disabled = true; });
      try {
        const { token, user } = await doRequest('/auth/login', { email, password });
        localStorage.setItem('token', token);
        if (user?.displayName) localStorage.setItem('displayName', user.displayName);
        window.location.replace('/');
      } catch (err) { showError(err.message); }
      finally {
        submitBtn.disabled = false;
        Array.from(form.elements).forEach(el => { if (el.tagName === 'INPUT') el.disabled = false; });
      }
    });
  } else if (mode === 'signup') {
    const form = document.getElementById('signup-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault(); errorEl.style.display = 'none';
      const email = document.getElementById('email').value.trim();
      const name = document.getElementById('name').value.trim();
      const password = document.getElementById('password').value;
      const submitBtn = form.querySelector('button.primary');
      submitBtn.disabled = true;
      Array.from(form.elements).forEach(el => { if (el.tagName === 'INPUT') el.disabled = true; });
      try {
        await doRequest('/auth/register', { email, password, name });
        const { token, user } = await doRequest('/auth/login', { email, password });
        localStorage.setItem('token', token);
        if (user?.displayName) localStorage.setItem('displayName', user.displayName);
        window.location.replace('/');
      } catch (err) { showError(err.message); }
      finally {
        submitBtn.disabled = false;
        Array.from(form.elements).forEach(el => { if (el.tagName === 'INPUT') el.disabled = false; });
      }
    });
  }

  // Initialize Google Sign-In after load
  if (document.readyState === 'complete') initGoogleSignIn();
  else window.addEventListener('load', initGoogleSignIn);
})();
