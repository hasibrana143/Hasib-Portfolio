import { chromium } from "@playwright/test";
import fs from "node:fs";

const OUT = process.argv[2] || ".gstack/browse-reports/preview";
fs.mkdirSync(OUT, { recursive: true });

const URL = process.argv[3] || "http://127.0.0.1:3000";

const browser = await chromium.launch();
const errs = [];

async function shot(name, width, height, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: opts.dark ? "dark" : "light",
  });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && errs.push(`${name}: ${m.text()}`));
  page.on("pageerror", (e) => errs.push(`${name}: pageerror ${e.message}`));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  console.log(`URL=${page.url()}`);
  console.log(`TITLE=${await page.title()}`);
  console.log(`H1=${await page.locator("h1").first().textContent().catch(() => "none")}`);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: opts.fullPage !== false });
  await ctx.close();
}

await shot("desktop-light", 1440, 900);
await shot("desktop-dark", 1440, 900, { dark: true });
await shot("mobile", 390, 844);

console.log("CONSOLE_ERRORS=" + JSON.stringify(errs));
await browser.close();
console.log("GSTACK_STEP_OK");
