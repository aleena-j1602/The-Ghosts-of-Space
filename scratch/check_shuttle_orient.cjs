const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testProfileDir = path.join(os.tmpdir(), `chrome-orient-check-${Date.now()}`);
const port = 9335;
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
  }).then(res => {
    if (res.exceptionDetails) {
      console.error('Eval Exception:', res.exceptionDetails);
      return null;
    }
    return res.result ? res.result.value : null;
  });
}

async function run() {
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
    }
  };

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');

  await new Promise(r => setTimeout(r, 2000));

  // Switch to moon env
  await evaluate(`(() => { window.__GAME_INSTANCE__.getSceneManager().switchToMoon(false, () => {}); return true; })()`);
  await new Promise(r => setTimeout(r, 3000));

  const orientData = await evaluate(`(() => {
    const moon = window.__GAME_INSTANCE__.getSceneManager().getMoonEnvironment();
    const root = moon.shuttleRoot;
    const meshes = root.getChildMeshes();
    const list = meshes.map(m => {
      m.computeWorldMatrix(true);
      const b = m.getBoundingInfo().boundingBox;
      return {
        name: m.name,
        min: [b.minimumWorld.x, b.minimumWorld.y, b.minimumWorld.z],
        max: [b.maximumWorld.x, b.maximumWorld.y, b.maximumWorld.z],
        center: [b.centerWorld.x, b.centerWorld.y, b.centerWorld.z]
      };
    });
    return JSON.stringify(list);
  })()`);

  console.log('Shuttle Child Meshes Bounding Boxes:', orientData);
}

run()
  .catch(console.error)
  .finally(() => {
    if (ws) ws.close();
    if (chromeProcess) chromeProcess.kill();
    try { fs.rmSync(testProfileDir, { recursive: true, force: true }); } catch {}
  });
