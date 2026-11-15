const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testProfileDir = path.join(os.tmpdir(), `chrome-shuttle-inspect-${Date.now()}`);
const port = 9334;
const targetUrl = 'http://localhost:5173/';

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

async function inspect() {
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
    } catch { }
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
    }
  };

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');

  // Wait 4s for initial load
  await new Promise(r => setTimeout(r, 4000));

  const spaceInfo = await evaluate(`(() => {
    const sm = window.__GAME_INSTANCE__?.getSceneManager();
    const space = sm?.getSpaceEnvironment();
    if (!space) return 'no space env';
    const mesh = space.shuttleMesh;
    const root = space.spacecraftRoot;
    if (!mesh) return 'no shuttle mesh';
    mesh.computeWorldMatrix(true);
    root.computeWorldMatrix(true);
    const meshBounds = mesh.getHierarchyBoundingVectors(true);
    const rootBounds = root.getHierarchyBoundingVectors(true);
    return {
      rootPos: root.position,
      rootRot: root.rotation,
      meshPos: mesh.position,
      meshRot: mesh.rotation,
      meshScale: mesh.scaling,
      meshBoundsMin: meshBounds.min,
      meshBoundsMax: meshBounds.max,
      rootBoundsMin: rootBounds.min,
      rootBoundsMax: rootBounds.max,
      dimensions: {
        x: meshBounds.max.x - meshBounds.min.x,
        y: meshBounds.max.y - meshBounds.min.y,
        z: meshBounds.max.z - meshBounds.min.z
      }
    };
  })()`);

  console.log('SpaceEnvironment Shuttle Info:', JSON.stringify(spaceInfo, null, 2));

  // Now switch directly to Moon to inspect MoonEnvironment shuttle
  await evaluate(`(() => {
    const sm = window.__GAME_INSTANCE__?.getSceneManager();
    sm?.switchToMoon(false, () => {});
  })()`);

  await new Promise(r => setTimeout(r, 3000));

  const moonInfo = await evaluate(`(() => {
    const sm = window.__GAME_INSTANCE__?.getSceneManager();
    const moon = sm?.getMoonEnvironment();
    if (!moon) return 'no moon env';
    const root = moon.shuttleRoot;
    if (!root) return 'no moon shuttle root';
    root.computeWorldMatrix(true);
    const bounds = root.getHierarchyBoundingVectors(true);
    return {
      shuttleGroundOffset: moon.shuttleGroundOffset,
      rootPos: root.position,
      rootRot: root.rotation,
      rootScale: root.scaling,
      min: bounds.min,
      max: bounds.max,
      dimensions: {
        x: bounds.max.x - bounds.min.x,
        y: bounds.max.y - bounds.min.y,
        z: bounds.max.z - bounds.min.z
      }
    };
  })()`);

  console.log('MoonEnvironment Shuttle Info:', JSON.stringify(moonInfo, null, 2));
}

inspect()
  .catch(console.error)
  .finally(() => {
    if (ws) ws.close();
    if (chromeProcess) chromeProcess.kill();
    try { fs.rmSync(testProfileDir, { recursive: true, force: true }); } catch { }
  });
