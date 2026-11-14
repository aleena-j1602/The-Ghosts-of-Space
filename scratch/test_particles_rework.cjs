const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testProfileDir = path.join(os.tmpdir(), `chrome-particle-test-${Date.now()}`);
const port = 9338;
const previewPort = 5174;
const targetUrl = `http://localhost:${previewPort}/`;
const screenshotDir = path.resolve('test_screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

let previewProcess;
let chromeProcess;
let ws;
let actualUrl = null;
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

async function startPreviewServer() {
  console.log(`Starting vite preview server on port 4173...`);
  actualUrl = 'http://localhost:4173/';
  previewProcess = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], {
    stdio: 'pipe',
    shell: true,
  });

  previewProcess.stdout.on('data', (d) => {
    console.log(`[Preview stdout] ${d.toString().trim()}`);
  });
  previewProcess.stderr.on('data', (d) => {
    console.log(`[Preview stderr] ${d.toString().trim()}`);
  });

  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const ok = await new Promise((resolve) => {
        const req = http.get(actualUrl, (res) => {
          if (res.statusCode === 200) resolve(true);
          else resolve(false);
        });
        req.on('error', () => resolve(false));
      });
      if (ok) {
        console.log(`Preview server verified at ${actualUrl}`);
        return;
      }
    } catch {}
  }
  throw new Error('Failed to connect to preview server within 12s');
}

async function runTest() {
  console.log('=== VERIFYING BLUE BUBBLE PARTICLE REMOVAL & RESTYLED EXHAUST ===');
  await startPreviewServer();

  console.log(`Launching Chrome headless at port ${port} targeting ${actualUrl}...`);
  chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${testProfileDir}`,
    '--remote-allow-origins=*',
    '--window-size=1280,720',
    '--disable-gpu',
    '--no-sandbox',
    actualUrl
  ]);

  let targets = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await new Promise(r => setTimeout(r, 400));
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

  console.log('\n--- 1. SHOT 1: APPROACHING THE MOON (CRUISE PLUME) ---');
  await new Promise(r => setTimeout(r, 5000));
  const shot1Telemetry = await evaluate(`(() => {
    const space = window.__GAME_INSTANCE__?.getSceneManager()?.getSpaceEnvironment();
    if (!space) return 'no space env';
    const mainPS = space.mainThrusterParticles;
    return JSON.stringify({
      mainPSTextureName: mainPS?.particleTexture?.name,
      blendMode: mainPS?.blendMode,
      minSize: mainPS?.minSize,
      maxSize: mainPS?.maxSize,
      minLifeTime: mainPS?.minLifeTime,
      maxLifeTime: mainPS?.maxLifeTime,
      emitRate: mainPS?.emitRate,
      color1: mainPS ? [mainPS.color1.r, mainPS.color1.g, mainPS.color1.b, mainPS.color1.a] : null,
      color2: mainPS ? [mainPS.color2.r, mainPS.color2.g, mainPS.color2.b, mainPS.color2.a] : null
    });
  })()`);
  console.log('Shot 1 Cruise Engine Telemetry:', shot1Telemetry);
  await captureScreenshot('verified_01_shot1_approach.png');

  console.log('\n--- 2. SHOT 2A: WIDE ESTABLISHING ANGLE OF DESCENT ---');
  // Wait until t = 16.5s (localT ~ 1.5s in Shot 2)
  await new Promise(r => setTimeout(r, 11500));
  const shot2ATelemetry = await evaluate(`(() => {
    const space = window.__GAME_INSTANCE__?.getSceneManager()?.getSpaceEnvironment();
    if (!space) return 'no space env';
    const landPS = space.landingThrusterParticles;
    const emitter = landPS?.emitter;
    return JSON.stringify({
      landPSTextureName: landPS?.particleTexture?.name,
      blendMode: landPS?.blendMode,
      minSize: landPS?.minSize,
      maxSize: landPS?.maxSize,
      minLifeTime: landPS?.minLifeTime,
      maxLifeTime: landPS?.maxLifeTime,
      emitRate: landPS?.emitRate,
      emitterPos: emitter ? { x: emitter.position.x, y: emitter.position.y, z: emitter.position.z } : null,
      craftPos: { x: space.spacecraftRoot.position.x, y: space.spacecraftRoot.position.y, z: space.spacecraftRoot.position.z }
    });
  })()`);
  console.log('Shot 2A Descent Thruster Telemetry:', shot2ATelemetry);
  await captureScreenshot('verified_02_shot2A_wide_descent.png');

  console.log('\n--- 3. SHOT 2B: MEDIUM TRACKING ANGLE ---');
  // Wait until t = 20.0s (localT ~ 5.0s in Shot 2)
  await new Promise(r => setTimeout(r, 3500));
  const shot2BTelemetry = await evaluate(`(() => {
    const space = window.__GAME_INSTANCE__?.getSceneManager()?.getSpaceEnvironment();
    if (!space) return 'no space env';
    return JSON.stringify({
      craftPosY: space.spacecraftRoot.position.y,
      thrusterEmitRate: space.landingThrusterParticles?.emitRate,
      dustEmitRate: space.landingDustParticles?.emitRate
    });
  })()`);
  console.log('Shot 2B Tracking Telemetry:', shot2BTelemetry);
  await captureScreenshot('verified_03_shot2B_medium_tracking.png');

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
      thrusterEmitRate: space.landingThrusterParticles?.emitRate,
      dustEmitRate: space.landingDustParticles?.emitRate,
      thrusterIsStarted: space.landingThrusterParticles?.isStarted()
    });
  })()`);
  console.log('Telemetry Shot 2C (Touchdown & Engine Cutoff):', touchdownInfo);
  await captureScreenshot('verified_04_shot2C_ground_touchdown.png');

  console.log('\n--- 5. SHOT 2D: FINAL WIDE HERO SHOT OF SAFELY LANDED SHUTTLE ---');
  // Wait until t = 26.5s (localT ~ 11.5s in Shot 2, HUD visible)
  await new Promise(r => setTimeout(r, 2000));
  const hudSubtitle = await evaluate(`document.getElementById('cinematic-subtitle-text')?.textContent`);
  console.log('Touchdown Subtitle Text:', hudSubtitle);
  await captureScreenshot('verified_05_shot2D_landed_hero.png');

  console.log('\n--- 6. VERIFY TRANSITION TO COCKPIT AWAKENING ---');
  // Wait until t = 30.5s (switched to CabinEnvironment)
  await new Promise(r => setTimeout(r, 4000));
  const activeScene = await evaluate(`document.getElementById('scene-display')?.textContent`);
  console.log('Active Scene after Shot 2:', activeScene);
  await captureScreenshot('verified_06_cabin_awakening.png');

  console.log('\n=== VERIFICATION RUN COMPLETE ===');
}

runTest()
  .catch(console.error)
  .finally(() => {
    if (ws) ws.close();
    if (chromeProcess) {
      try { chromeProcess.kill(); } catch {}
    }
    if (previewProcess) {
      try { previewProcess.kill(); } catch {}
    }
    try { fs.rmSync(testProfileDir, { recursive: true, force: true }); } catch {}
  });
