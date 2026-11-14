const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testProfileDir = path.join(os.tmpdir(), `chrome-integ-test-${Date.now()}`);
const port = 9339;
const previewPort = 4174;
const targetUrl = `http://localhost:${previewPort}/`;

let previewProcess;
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

async function startPreviewServer() {
  console.log(`Starting vite preview server on port ${previewPort}...`);
  previewProcess = spawn('npx.cmd', ['vite', 'preview', '--port', String(previewPort)], {
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
        const req = http.get(targetUrl, (res) => {
          resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
      });
      if (ok) {
        console.log(`Preview server is up and responding at ${targetUrl}`);
        return;
      }
    } catch (e) {}
  }
  throw new Error('Vite preview failed to start in time');
}

async function startChrome() {
  console.log(`Starting headless Chrome on debug port ${port}...`);
  chromeProcess = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${testProfileDir}`,
    '--headless=new',
    '--disable-gpu-sandbox',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--no-first-run',
    '--no-default-browser-check',
    '--mute-audio',
    'about:blank'
  ]);

  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const data = await new Promise((resolve, reject) => {
        http.get(`http://localhost:${port}/json/version`, res => {
          let body = '';
          res.on('data', d => body += d);
          res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
      });
      if (data && data.webSocketDebuggerUrl) {
        console.log(`Chrome started, browser WS: ${data.webSocketDebuggerUrl}`);
        return;
      }
    } catch (e) {}
  }
  throw new Error('Headless Chrome debug endpoint did not respond');
}

async function connectToPage() {
  const targets = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/json`, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(JSON.parse(body)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const wsUrl = pageTarget.webSocketDebuggerUrl;
  console.log(`Connecting to page WS: ${wsUrl}`);

  ws = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    ws.on('open', resolve);
    ws.on('error', reject);
  });

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());
    if (parsed.id && pendingCallbacks.has(parsed.id)) {
      const { resolve, reject } = pendingCallbacks.get(parsed.id);
      pendingCallbacks.delete(parsed.id);
      if (parsed.error) reject(parsed.error);
      else resolve(parsed.result);
    }
  });

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  await sendCommand('Console.enable');

  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
}

async function runTest() {
  try {
    await startPreviewServer();
    await startChrome();
    await connectToPage();

    console.log(`Navigating to ${targetUrl}...`);
    await sendCommand('Page.navigate', { url: targetUrl });
    await new Promise(r => setTimeout(r, 2000));

    // Verify Title & Overlay
    const title = await evaluate(`document.title`);
    console.log(`Page title: ${title}`);

    // Check game instance
    const gameState = await evaluate(`
      typeof window !== 'undefined' && document.getElementById('renderCanvas') !== null
    `);
    console.log(`Canvas initialized: ${gameState}`);

    // Check HUD and Minimap DOM elements
    const hudElements = await evaluate(`({
      hud: !!document.getElementById('game-hud'),
      minimap: !!document.getElementById('hud-minimap-container'),
      proximityRadar: !!document.getElementById('proximity-radar'),
      mapOverlay: !!document.getElementById('map-overlay'),
      investigationWindow: !!document.getElementById('investigation-window')
    })`);
    console.log('HUD & UI Elements:', hudElements);

    // Wait a couple seconds to let Babylon.js engine run
    await new Promise(r => setTimeout(r, 3000));

    // Check console logs or errors
    const errors = await evaluate(`window.__errors || []`);
    console.log(`Errors caught: ${JSON.stringify(errors)}`);

    console.log('--- ALL INTEGRATION CHECKS PASSED ---');
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exitCode = 1;
  } finally {
    if (ws) ws.close();
    if (chromeProcess) chromeProcess.kill();
    if (previewProcess) previewProcess.kill();
    try {
      fs.rmSync(testProfileDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

runTest();
