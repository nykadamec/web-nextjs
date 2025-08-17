#!/usr/bin/env node
/*
  Minimal Playwright screenshot script.
  - Starts local dev server if not running
  - Visits the app and captures three screenshots:
    1) Landing/upload area
    2) Settings modal open
    3) Image preview + description area with mocked content
*/
const { spawn, spawnSync } = require('child_process');
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const OUT_DIR = path.resolve(__dirname, '../docs/screenshots');

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`Server not responding at ${url} within ${timeoutMs}ms`);
}

async function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  await ensureOutDir();

  // Optionally start dev server
  const shouldStart = process.env.NO_START !== '1';
  let devProc;
  if (shouldStart) {
    const repoRoot = path.resolve(__dirname, '..');
    const usePnpm = fs.existsSync(path.join(repoRoot, 'pnpm-lock.yaml'));
    const cmd = usePnpm ? 'pnpm' : 'npm';
    const args = usePnpm ? ['dev'] : ['run', 'dev'];
    devProc = spawn(cmd, args, { stdio: 'inherit', shell: true, cwd: repoRoot });
  }

  try {
    await waitForServer(BASE_URL);
    const browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: 1 });
    const page = await context.newPage();

    // 1) Landing/upload view
    await page.goto(BASE_URL);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForSelector('[data-name="upload-container"], [data-name="upload-area"]');
    await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-1.png'), fullPage: true });

    // 2) Settings modal open
    await page.click('[data-name="settings-button"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-2.png'), fullPage: true });

    // 3) Image preview + description area (mock)
    // We'll mock the UI state by injecting DOM so we don't depend on external APIs
    await page.evaluate(() => {
      const setReactState = () => {
        // simulate selected image and description by triggering app's state via DOM manipulation
        const input = document.querySelector('[data-name="file-input"]');
        // create an empty image preview area by replacing src
        const main = document.querySelector('[data-name="main-content"]');
        if (!main) return;
        const mock = document.createElement('div');
        mock.setAttribute('data-name', 'mock-state');
        mock.innerHTML = `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">Uploaded Image</h3>
              </div>
              <div class="border rounded-lg p-4">
                <div style="background:#e5e7eb;height:360px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#6b7280;">Mock Image Preview</div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">AI Description</h3>
              </div>
              <div class="border rounded-lg p-6 min-h-[300px]" style="background:white;">
                <p class="text-gray-700">A warm sunset over a calm ocean with gentle waves and a silhouette of a sailboat near the horizon. Colors blend from orange to deep blue.</p>
              </div>
            </div>
          </div>
        `;
        const uploadContainer = document.querySelector('[data-name="upload-container"]');
        if (uploadContainer) uploadContainer.replaceWith(mock);
      };
      setReactState();
    });
    await page.waitForSelector('[data-name="mock-state"]');
    await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-3.png'), fullPage: true });

    await browser.close();
  } catch (err) {
    console.error('Screenshot capture failed:', err);
    process.exitCode = 1;
  } finally {
    if (devProc) {
      // Give a moment for buffers to flush
      setTimeout(() => {
        devProc.kill();
      }, 500);
    }
  }
}

run();
