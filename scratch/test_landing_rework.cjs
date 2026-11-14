const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testProfileDir = path.join(os.tmpdir(), `chrome-landing-test-${Date.now()}`);
const port = 9336;
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
  }).then(res => {
    if (res.exceptionDetails) {
      console.error('Eval Exception:', res.exceptionDetails);
      return null;
    }
    return res.result ? res.result.value : null;
  });
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
  console.log('=== STARTING GHOSTS OF SPACE LUNAR LANDING REWORK VERIFICATION ===');
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
    } catch {}
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
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

  console.log('\n--- 1. SHOT 1: APPROACHING THE MOON ---');
  await new Promise(r => setTimeout(r, 4500));
  await captureScreenshot('rework_01_shot1_approach.png');

  console.log('\n--- 2. SHOT 2A: WIDE ESTABLISHING ANGLE OF DESCENT ---');
  // Wait until t = 16.5s (localT ~ 1.5s in Shot 2)
  await new Promise(r => setTimeout(r, 12000));
  const descInfoA = await evaluate(`(() => {
    const space = window.__GAME_INSTANCE__?.getSceneManager()?.getSpaceEnvironment();
    if (!space) return 'no space env';
    const root = space.spacecraftRoot;
    const mesh = space.shuttleMesh;
    root.computeWorldMatrix(true);
    const bounds = root.getHierarchyBoundingVectors(true);
    return JSON.stringify({
      rootPos: { x: root.position.x, y: root.position.y, z: root.position.z },
      boundsMin: { x: bounds.min.x, y: bounds.min.y, z: bounds.min.z },
      boundsMax: { x: bounds.max.x, y: bounds.max.y, z: bounds.max.z },
      shuttleScale: mesh ? { x: mesh.scaling.x, y: mesh.scaling.y, z: mesh.scaling.z } : null,
      moonVisible: space.moonRoot ? space.moonRoot.isEnabled() : false,
      earthPos: space.earthRoot ? { x: space.earthRoot.position.x, y: space.earthRoot.position.y, z: space.earthRoot.position.z } : null
    });
  })()`);
  console.log('Telemetry Shot 2A:', descInfoA);
  await captureScreenshot('rework_02_shot2A_wide_descent.png');

  console.log('\n--- 3. SHOT 2B: MEDIUM TRACKING ANGLE ---');
  // Wait until t = 20.0s (localT ~ 5.0s in Shot 2)
  await new Promise(r => setTimeout(r, 3500));
  await captureScreenshot('rework_03_shot2B_medium_tracking.png');

  console.log('\n--- 4. SHOT 2C: GROUND-LEVEL TOUCHDOWN ANGLE ---');
  // Wait until t = 24.5s (localT ~ 9.5s in Shot 2, just after touchdown)
  await new Promise(r => setTimeout(r, 4500));
  const touchdownInfo = await evaluate(`(() => {
    const space = window.__GAME_INSTANCE__?.getSceneManager()?.getSpaceEnvironment();
    if (!space) return 'no space env';
    const root = space.spacecraftRoot;
    root.computeWorldMatrix(true);
    const bounds = root.getHierarchyBoundingVectors(true);
    return JSON.stringify({
      rootPosY: root.position.y,
      boundsMinY: bounds.min.y,
      boundsMaxY: bounds.max.y,
      thrusterEmitRate: space.landingThrusterParticles ? space.landingThrusterParticles.emitRate : -1,
      dustEmitRate: space.landingDustParticles ? space.landingDustParticles.emitRate : -1
    });
  })()`);
  console.log('Telemetry Shot 2C (Touchdown):', touchdownInfo);
  await captureScreenshot('rework_04_shot2C_ground_touchdown.png');

  console.log('\n--- 5. SHOT 2D: FINAL WIDE HERO SHOT OF SAFELY LANDED SHUTTLE ---');
  // Wait until t = 26.5s (localT ~ 11.5s in Shot 2, HUD visible)
  await new Promise(r => setTimeout(r, 2000));
  const hudSubtitle = await evaluate(`document.getElementById('cinematic-subtitle-text')?.textContent`);
  console.log('Touchdown Subtitle Text:', hudSubtitle);
  await captureScreenshot('rework_05_shot2D_landed_hero.png');

  console.log('\n--- 6. VERIFY TRANSITION TO COCKPIT AWAKENING ---');
  // Wait until t = 30.0s (switched to CabinEnvironment)
  await new Promise(r => setTimeout(r, 3500));
  const activeScene = await evaluate(`document.getElementById('scene-display')?.textContent`);
  console.log('Active Scene after Shot 2:', activeScene);
  await captureScreenshot('rework_06_cabin_awakening.png');

  console.log('\n=== LUNAR LANDING REWORK VERIFICATION COMPLETE ===');
}

runTest()
  .catch(console.error)
  .finally(() => {
    if (ws) ws.close();
    if (chromeProcess) chromeProcess.kill();
    try { fs.rmSync(testProfileDir, { recursive: true, force: true }); } catch {}
  });
