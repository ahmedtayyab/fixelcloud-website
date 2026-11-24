import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const content = JSON.parse(readFileSync(new URL("../src/data/content.json", import.meta.url), "utf8"));
const urls = [
  "/",
  "/services",
  "/industries",
  "/about-us",
  "/blog",
  "/portfolio",
  "/estimate",
  "/contacts",
  "/faqs",
  "/our-team",
  ...Object.keys(content.pages)
    .filter((slug) => !["services", "industries", "about-us", "contacts", "faqs", "our-team"].includes(slug))
    .map((slug) => `/${slug}`),
  ...content.posts.map((post) => `/blog/${post.slug}`),
];
const host = "https://fixelcloud.com";
const body = urls.map((url) => `  <url><loc>${host}${url}</loc></url>`).join("\n");
mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);
writeFileSync(
  new URL("../public/robots.txt", import.meta.url),
  "User-agent: *\nAllow: /\n\nSitemap: https://fixelcloud.com/sitemap.xml\n",
);
console.log(urls.length);
