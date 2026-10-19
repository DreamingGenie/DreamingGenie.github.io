// /print/ 와 /print/data 를 Chrome headless 로 A4 PDF 로 만든다.
//   node scripts/make-pdf.mjs [출력 폴더]      (기본: ../pdf  — site 밖, 저장소에 실리지 않는 곳)
// 순서: astro build → astro preview(4322) → Chrome --print-to-pdf → preview 종료.
// 글꼴(Pretendard·IBM Plex Mono)은 CDN 에서 받으므로 네트워크가 필요하다.
import { spawn, execSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.resolve(process.argv[2] ?? path.join(site, "..", "pdf"));
const port = 4322;
const chromeCandidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome/Edge 를 찾지 못했습니다: " + chromeCandidates.join(", "));

const targets = [
  { route: "/print/", file: "전진-포트폴리오-백엔드.pdf" },
  { route: "/print/data", file: "전진-포트폴리오-데이터엔지니어.pdf" },
];

mkdirSync(outDir, { recursive: true });
execSync("npx astro build", { cwd: site, stdio: "inherit" });

const preview = spawn("npx", ["astro", "preview", "--port", String(port)], { cwd: site, shell: true, stdio: "ignore" });
const waitFor = async (url, tries = 40) => {
  for (let i = 0; i < tries; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("preview 서버가 뜨지 않았습니다: " + url);
};

try {
  await waitFor(`http://localhost:${port}/print/`);
  for (const t of targets) {
    const out = path.join(outDir, t.file);
    execSync(
      [
        `"${chrome}"`,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer", // 쪽 번호는 print.css 의 @page 여백 상자가 그린다
        "--virtual-time-budget=20000", // 웹 글꼴·그림이 다 내려올 시간
        "--run-all-compositor-stages-before-draw",
        `--user-data-dir="${path.join(process.env.TEMP ?? site, "chrome-pdf-profile")}"`,
        `--print-to-pdf="${out}"`,
        `http://localhost:${port}${t.route}`,
      ].join(" "),
      { stdio: "pipe" },
    );
    console.log(`${t.route} → ${out} (${(statSync(out).size / 1024 / 1024).toFixed(1)} MB)`);
  }
} finally {
  // shell:true 로 띄워서 자식(node astro)까지 함께 끝낸다
  if (process.platform === "win32") execSync(`taskkill /PID ${preview.pid} /T /F`, { stdio: "ignore" });
  else preview.kill();
}
