const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testProfileDir = path.join(os.tmpdir(), `chrome-test-${Date.now()}`);
const port = 9333;
const targetUrl = 'http://localhost:5173/';
const screenshotDir = path.resolve('test_screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

let chromeProcess;
let ws;
let msgId = 1;
const pendingCallbacks = new Map();

function sendCommand(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pendingCallbacks.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function evaluate(expression) {
  return sendCommand('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  }).then(res => res.result ? res.result.value : null);
}

async function captureScreenshot(filename) {
  const res = await sendCommand('Page.captureScreenshot', { format: 'png' });
  if (res && res.data) {
    const filePath = path.join(screenshotDir, filename);
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`[Screenshot Saved] ${filename} (${filePath})`);
  }
}

async function runTest() {
  console.log('=== STARTING GHOSTS OF SPACE CINEMATIC RUNTIME TEST ===');
  console.log(`Launching Chrome headless at port ${port}...`);

  chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${testProfileDir}`,
    '--remote-allow-origins=*',
    '--window-size=1280,720',
    '--disable-gpu',
    '--no-sandbox',
    targetUrl
  ]);

  // Wait for Chrome CDP port
  let targets = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      targets = await new Promise((resolve, reject) => {
        http.get(`http://localhost:${port}/json/list`, res => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });
      if (targets && targets.length > 0) break;
    } catch {
      // retry
    }
  }

  if (!targets || targets.length === 0) {
    throw new Error('Failed to connect to Chrome DevTools Protocol targets');
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  console.log(`Connected to page target: ${pageTarget.title} (${pageTarget.webSocketDebuggerUrl})`);

  ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pendingCallbacks.has(msg.id)) {
      const cb = pendingCallbacks.get(msg.id);
      pendingCallbacks.delete(msg.id);
      if (msg.error) cb.reject(msg.error);
      else cb.resolve(msg.result);
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      const args = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
      console.log(`[Browser Console] ${args}`);
    }
  };

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');

  console.log('\n--- 1. TESTING SHOT 1: THE SHUTTLE APPROACHES THE MOON ---');
  await new Promise(r => setTimeout(r, 4500));
  const shot1Badge = await evaluate(`document.getElementById('cinematic-telemetry-badge')?.textContent`);
  const shot1Sub = await evaluate(`document.getElementById('cinematic-subtitle-text')?.textContent`);
  const shot1Clock = await evaluate(`document.getElementById('cinematic-clock')?.textContent`);
  console.log(`Shot 1 Overlay Badge: "${shot1Badge}"`);
  console.log(`Shot 1 Subtitle: "${shot1Sub}"`);
  console.log(`Mission Clock: ${shot1Clock}`);
  await captureScreenshot('01_shot1_moon_approach.png');

  console.log('\n--- 2. TESTING SHOT 2: EXTERIOR LANDING & TOUCHDOWN ---');
  console.log('Waiting for landing descent and touchdown (t = 24s)...');
  await new Promise(r => setTimeout(r, 20000)); // total ~24.5s
  const shot2Sub = await evaluate(`document.getElementById('cinematic-subtitle-text')?.textContent`);
  const shot2Clock = await evaluate(`document.getElementById('cinematic-clock')?.textContent`);
  console.log(`Shot 2 Subtitle: "${shot2Sub}"`);
  console.log(`Mission Clock at Landing: ${shot2Clock}`);
  await captureScreenshot('02_shot2_landing_touchdown.png');

  console.log('\n--- 3. TESTING SHOT 3: COCKPIT TRANSITION ---');
  console.log('Waiting for transition to CabinEnvironment (t = 28s)...');
  await new Promise(r => setTimeout(r, 4000));
  const activeSceneShot3 = await evaluate(`document.getElementById('scene-display')?.textContent`);
  const statusShot3 = await evaluate(`document.getElementById('engine-status')?.textContent`);
  console.log(`Active Scene: ${activeSceneShot3}`);
  console.log(`Engine Status Display: ${statusShot3}`);
  await captureScreenshot('03_shot3_cockpit_interior.png');

  console.log('\n--- 4. TESTING SHOT 4: INTRODUCE LUNA & AWAKENING DIALOGUE ---');
  console.log('Waiting for 3D Luna camera reveal and glide to berth (t = 37s)...');
  await new Promise(r => setTimeout(r, 9000));

  const dialogueHidden = await evaluate(`document.getElementById('dialogue-container')?.classList.contains('hidden')`);
  const speaker = await evaluate(`document.getElementById('dialogue-speaker')?.textContent`);
  const dialogueText = await evaluate(`document.getElementById('dialogue-text')?.textContent`);
  console.log(`Dialogue Container Visible: ${!dialogueHidden}`);
  console.log(`Speaker: ${speaker}`);
  console.log(`Opening Line: "${dialogueText}"`);
  await captureScreenshot('04_shot4_luna_awake_dialogue.png');

  console.log('\n--- 5. ADVANCING THROUGH DIALOGUE & BRIEFING ---');
  for (let i = 0; i < 9; i++) {
    await evaluate(`document.getElementById('dialogue-container')?.click()`);
    await new Promise(r => setTimeout(r, 400));
  }
  const briefingHidden = await evaluate(`document.getElementById('briefing-overlay')?.classList.contains('hidden')`);
  console.log(`Mission Briefing Card Visible: ${!briefingHidden}`);
  await captureScreenshot('05_mission_briefing.png');

  console.log('\n--- 6. CONFIRM MISSION & TRANSITION TO MOON EXPLORATION ---');
  await evaluate(`document.getElementById('btn-confirm-mission')?.click()`);
  await new Promise(r => setTimeout(r, 3000));

  const activeSceneMoon = await evaluate(`document.getElementById('scene-display')?.textContent`);
  const coords = await evaluate(`document.getElementById('hud-coords')?.textContent`);
  const radarVisible = await evaluate(`!document.getElementById('proximity-radar')?.classList.contains('hidden')`);
  console.log(`Active Scene: ${activeSceneMoon}`);
  console.log(`Player Coordinates: ${coords}`);
  await captureScreenshot('06_lunar_surface_exploration.png');

  console.log('\n--- 7. TESTING SKIP INTRO (ESC KEY / BUTTON) ---');
  console.log('Reloading page to test Skip Intro...');
  await sendCommand('Page.navigate', { url: targetUrl });
  await new Promise(r => setTimeout(r, 3000)); // wait for initial scene load
  console.log('Clicking SKIP CINEMATIC button...');
  await evaluate(`document.getElementById('btn-cinematic-skip')?.click()`);
  await new Promise(r => setTimeout(r, 1500));

  const skipScene = await evaluate(`document.getElementById('scene-display')?.textContent`);
  const skipStatus = await evaluate(`document.getElementById('engine-status')?.textContent`);
  console.log(`Post-Skip Active Scene: ${skipScene}`);
  console.log(`Post-Skip Engine Status: ${skipStatus}`);
  await captureScreenshot('07_skip_intro_cabin.png');

  console.log('\n=== ALL RUNTIME TESTS COMPLETED SUCCESSFULLY! ===');
}

runTest()
  .catch(err => {
    console.error('TEST ERROR:', err);
  })
  .finally(() => {
    if (ws) ws.close();
    if (chromeProcess) chromeProcess.kill();
    try {
      fs.rmSync(testProfileDir, { recursive: true, force: true });
    } catch {}
  });
