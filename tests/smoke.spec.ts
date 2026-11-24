import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const content = JSON.parse(readFileSync("src/data/content.json", "utf8")) as {
  pages: Record<string, unknown>;
  posts: { slug: string }[];
};

const routes = [
  "/",
  "/blog",
  "/portfolio",
  "/estimate",
  ...Object.keys(content.pages).map((slug) => `/${slug}`),
  ...content.posts.map((post) => `/blog/${post.slug}`),
];

test.describe("routes stay on the page and inside the viewport", () => {
  test.describe.configure({ timeout: 600_000 });
  for (const width of [320, 375, 1440]) {
    test(`no overflow or missing page at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const failures: string[] = [];
      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.locator("h1").first().waitFor({ timeout: 8000 }).catch(() => {});
        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          missing: document.body.innerText.includes("Page not found"),
          h1: document.querySelectorAll("h1").length,
        }));
        if (result.overflow > 1 || result.missing || result.h1 !== 1) {
          failures.push(`${route} overflow=${result.overflow} h1=${result.h1} missing=${result.missing}`);
        }
      }
      expect(failures, failures.join("\n")).toEqual([]);
    });
  }
});

test("unknown address explains that the page is missing", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("contact form explains an empty submission", async ({ page }) => {
  await page.goto("/contacts");
  await page.getByRole("button", { name: "Submit form" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Add a few more details")).toBeVisible();
});

const aliases = [
  ["/about-us-digital-innovation", "/about-us"],
  ["/web-development", "/services/website-development"],
  ["/website-development", "/services/website-development"],
  ["/mobile-development", "/services/mobile-development"],
  ["/mean-mern-development", "/services/mean-mern-development"],
  ["/cloud-strategy", "/services/cloud-strategy"],
  ["/ui-ux-design", "/design-ideation/ui-ux-design"],
  ["/retail", "/industries/retail"],
  ["/healthcare", "/industries/healthcare"],
  ["/education", "/industries/education"],
  ["/fintech", "/industries/fintech"],
  ["/telecommunication", "/industries/telecommunication"],
  ["/media-and-entertainment", "/industries/media-and-entertainment"],
];

test("older addresses redirect to the current pages", async ({ page }) => {
  for (const [from, to] of aliases) {
    await page.goto(from, { waitUntil: "domcontentloaded" });
    await page.waitForFunction((target) => location.pathname === target, to);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
  }
});

test("services menu stays open while the pointer moves into it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const services = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Services", exact: true });
  await services.hover();
  const item = page.getByRole("link", { name: "Dedicated Teams" });
  await expect(item).toBeVisible();
  await item.hover();
  await expect(item).toBeVisible();
});

test("mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("link", { name: "Estimate Project" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});
