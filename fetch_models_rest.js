import dotenv from 'dotenv';

dotenv.config();

const headers = { 'x-goog-api-key': process.env.GEMINI_API_KEY };

async function list(version) {
  const url = `https://generativelanguage.googleapis.com/${version}/models`;
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log(`\n--- ${version} --- status: ${res.status}`);
    console.log(text);
  } catch (e) {
    console.error('Fetch error', e);
  }
}

(async () => {
  await list('v1beta');
  await list('v1');
})();
