import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const videoPath = "D:/Backup/Downloads/c2805d20d252ea33d6af347c83ce3516_t1.mp4";
const outDir = path.resolve("work/reference-video");
fs.mkdirSync(outDir, { recursive: true });
const videoDataUrl = `data:video/mp4;base64,${fs.readFileSync(videoPath).toString("base64")}`;

const browserCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const executablePath = browserCandidates.find((candidate) => fs.existsSync(candidate));
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }
      video { width: 100vw; height: 100vh; object-fit: contain; background: #000; }
    </style>
  </head>
  <body>
    <video id="video" src="${videoDataUrl}" muted playsinline preload="auto"></video>
  </body>
</html>`;

await page.setContent(html, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => {
  const video = document.querySelector("video");
  return video && video.readyState >= 1 && Number.isFinite(video.duration);
});

const duration = await page.$eval("video", (video) => video.duration);
const times = [0, duration * 0.25, duration * 0.5, duration * 0.75, Math.max(0, duration - 0.05)];

for (let index = 0; index < times.length; index += 1) {
  const time = times[index];
  await page.$eval("video", (video, nextTime) => {
    video.currentTime = nextTime;
  }, time);
  await page.waitForFunction(
    (nextTime) => {
      const video = document.querySelector("video");
      return Math.abs(video.currentTime - nextTime) < 0.08;
    },
    time,
  );
  await page.screenshot({ path: path.join(outDir, `frame-${index + 1}.png`), fullPage: true });
}

await browser.close();
console.log(JSON.stringify({ duration, frames: times.map((time, index) => `frame-${index + 1}.png @ ${time.toFixed(2)}s`) }, null, 2));
