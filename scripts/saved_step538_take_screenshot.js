const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function takeScreenshot(url, outputPath, width = 1680, height = 1200) {
  // Start Chrome with remote debugging
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9333;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=${width},${height}`,
    '--user-data-dir=C:\\temp\\chrome-test-profile'
  ]);

  // Wait for Chrome to initialize
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Get WS URL
    const versionData = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json/version`, res => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });

    const browserWsUrl = versionData.webSocketDebuggerUrl;
    const WebSocket = require('ws'); // If ws not present, use standard net or child process
    
  } catch (err) {
    console.error('CDP error:', err);
  } finally {
    chrome.kill();
  }
}
