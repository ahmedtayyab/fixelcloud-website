import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.env.QA_BASE ?? "http://127.0.0.1:5173";
const content = JSON.parse(readFileSync(new URL("../src/data/content.json", import.meta.url), "utf8"));
const only = process.env.QA_ONLY?.split(",").filter(Boolean);
const routes = only ?? [
  ...new Set([
    "/",
    "/blog",
    "/portfolio",
    "/estimate",
    ...Object.keys(content.pages).map((slug) => `/${slug}`),
    ...content.posts.map((post) => `/blog/${post.slug}`),
    "/search?q=cloud",
    "/search",
    "/this-page-does-not-exist",
  ]),
];

const core = new Set([
  "/",
  "/services",
  "/industries",
  "/about-us",
  "/contacts",
  "/estimate",
  "/blog",
  "/faqs",
  "/our-team",
  "/portfolio",
  "/services/website-development",
  "/services/mobile-development",
  "/why-choose-us",
  "/finhub",
  "/contacts",
]);

const widthsFor = (route) =>
  process.env.QA_WIDTHS?.split(",").map(Number).filter(Boolean) ??
  (core.has(route.split("?")[0]) ? [320, 375, 768, 1280, 1440, 1920] : [375, 1440]);

const outDir = fileURLToPath(new URL("../qa-evidence/", import.meta.url));
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const findings = [];

for (const route of routes) {
  for (const width of widthsFor(route)) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((error) => {
      findings.push({ route, width, kind: "navigation", detail: error.message });
      return null;
    });
    if (!response) {
      await page.close();
      continue;
    }
    await page.waitForSelector("h1, main", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(300);
    const report = await page.evaluate(() => {
      const root = document.documentElement;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((element) => {
          const box = element.getBoundingClientRect();
          return box.width > 0 && box.right > root.clientWidth + 1;
        })
        .slice(0, 8)
        .map((element) => `${element.tagName}.${String(element.className).slice(0, 80)}`);
      const broken = [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);
      return {
        title: document.title,
        overflow: root.scrollWidth - root.clientWidth,
        clientWidth: root.clientWidth,
        offenders,
        broken,
        h1: document.querySelectorAll("h1").length,
        notFound: document.body.innerText.includes("Page not found"),
      };
    });
    const expectedMissing = route === "/this-page-does-not-exist";
    const problems = [];
    if (report.overflow > 1) problems.push(`overflow ${report.overflow}px`);
    if (report.broken.length) problems.push(`broken images ${report.broken.length}`);
    if (errors.length) problems.push(`console ${errors.length}`);
    if (report.h1 !== 1 && !expectedMissing) problems.push(`h1 count ${report.h1}`);
    if (report.notFound && !expectedMissing) problems.push("unexpected not found");
    if (!report.notFound && expectedMissing) problems.push("404 missing");
    if (problems.length) {
      const file = `${route.replace(/[^\w]+/g, "_")}-${width}.png`;
      await page.screenshot({ path: join(outDir, file), fullPage: false }).catch(() => {});
      findings.push({ route, width, problems, ...report, errors: errors.slice(0, 4), shot: file });
    }
    await page.close();
  }
  process.stdout.write(".");
}

await browser.close();
writeFileSync(join(outDir, "findings.json"), JSON.stringify({ routes: routes.length, findings }, null, 2));
console.log(`\n${routes.length} routes, ${findings.length} findings`);
