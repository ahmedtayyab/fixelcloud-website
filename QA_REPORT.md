# FixelCloud website — QA and production readiness

Date: 24 November 2026
Scope: React frontend in this repository. The live reference is https://fixelcloud.com/.
Verdict: **CONDITIONAL GO**

A parity pass on 24 November 2026 compared https://fixelcloud.com/ with this app. Structural counts (headings, service cards, icon boxes, tabs, and button labels) were taken from the live page content of the home page and all 58 content routes. Browser checks confirmed the card and header fixes below. This is not a pixel-by-pixel sign-off of every section at every viewport. Form delivery, the map off fixelcloud.com, Firefox, and WebKit were not retested.

## Parity audit — 24 November 2026

### What was compared

Live HTML for `/` and every key in `src/data/content.json` was read from the Elementor page region (`data-elementor-type="wp-page"`). Counts: H2s, `serv-box` cards, icon boxes, `tab-link` labels, and `octf-btn` labels. Parsed app content was counted the same way for actions, linked cards, and tabs. Rendered checks used Chromium at 1440px and 390px.

| Check | Result |
|---|---|
| Service tab sets (10 pages) | Match the live labels |
| Industry related cards | 3 cards on each of 6 industry pages |
| Ecommerce related cards | 2 cards on each of 3 ecommerce pages |
| Home icon services | 6, titles linked, plus Explore us, All services, Contact us |
| Services hub | 6 service cards, 4 reason icons, Free quote, Contact us |
| Choose plan rows | 3 per pricing section. Label kept as “Choose plan” where the live site says “Choose Plane” |
| Production build | `npm run build` passed (`tsc --noEmit` and Vite). Preview of that build at `/industries/retail` showed the three text links, the offer list, the four reason items, and one Contact us |

### Corrections

| Where | What was wrong | Fix | Retest |
|---|---|---|---|
| Industry and ecommerce “other” sections | Related items were filled Learn more buttons, then the whole card was one link | Cards again. Only the text “Learn more” is a tertiary link, which is how the live `serv-box` works | Retail at 1440: 3 text links, transparent background, parents are articles. Filled buttons on the page: Estimate Project and Contact us. Overflow 0 at 1440 and 390 |
| Why choose us blog row | Three Learn more labels were filled buttons under large headings | Each post is a card. Learn more is a tertiary link to that post. All News stays the filled button | Rendered at 1440: All News filled, three text links, overflow 0 at 390 |
| Home service grid | The whole card was a link. On the live site only the title is | Title link inside the card | Six `h3 a` links inside articles |
| About | Learn more went to website development. The live control goes to `/services/`. A Contact us band was added; the live page has no contact button | Destination `/services`. Consultation band removed | Code review against the live anchor |
| Team | Missing “Let’s Build Your Website!” and the client quotes. A consultation band stood in for them | Restored that heading, one Contact us button, and the client quotes | 390px: both headings present, consultation heading absent, overflow 0 |

### Justified differences

- Header logo stays 152×36 on desktop. At 1440 the live logo is 200×47. Both sit at x=31, and the gap from the logo to Services is 68px. The smaller logo is the size already approved for this design. It was not enlarged again.
- FAQ support “Learn more” goes to `/contacts`. On the live site those three anchors are `href="#"`.
- The AI messaging hero is published twice on the live site, with two Get Started buttons. This app keeps one hero and one Get Started.
- “Choose Plane” is shown as “Choose plan”.
- All News on the live why-choose-us page points at a theme demo blog. Ours points at `/blog`.
- Contact us on service pages stays the filled button in our consultation or photo band. Boost Project Success stays the section button where the live page has it.
- Primary, secondary, and tertiary button styles were not reverted to the live green button chrome.

### Not executed

- Every section was not screenshotted at 320, 375, 430, 768, 1024, 1280, 1920, and 2560.
- FinHub, SalesPortal, and the portfolio case studies use a different live template, so they were not in the `wp-page` count. Their app routes were not re-walked in the browser in this pass.
- No form was submitted. No axe or Lighthouse run.
- `npm run test:e2e` was not re-run in this pass. The earlier smoke file is unchanged.

The earlier findings below still describe the previous crawl. Where this section disagrees, this section is the later result.

## Executive summary

The site is a React 19 / Vite single-page app. Content routes come from `src/data/content.json`, with custom pages for home, services, industries, about, contact, estimate, blog, portfolio, search, FAQs, and team.

Automated checks in Chromium covered every content page and blog post at 320px, 375px, and 1440px. `/blog`, `/portfolio`, and `/estimate` are app routes rather than content-file keys, so they were measured on their own at those three widths after the main sweep. A crawl of the other 88 routes at 320px, after the small-screen fixes, reported no overflow, no broken images that had finished loading, no application page errors, and one heading per real page. The unknown URL shows “Page not found”. Empty contact submission shows field errors and does not claim success. The mobile menu opens and closes. Thirteen legacy paths redirect to the current routes.

Full-page visual review of every section, on every viewport in the brief, was not completed. Screenshots in this pass are viewport captures of the top of the page. Firefox, WebKit, axe-core, and Lighthouse were not run.

## Inventory

| Set | Count | How it was found |
|---|---:|---|
| Content pages in `content.json` | 58 | Page keys, including nested services, industries, products, and portfolio items |
| Blog posts | 26 | `posts` in `content.json` |
| Extra app routes | 5 | `/`, `/blog`, `/portfolio`, `/estimate`, `/search` |
| Legacy redirects | 13 | `aliases` in `src/App.tsx` |
| Unknown URL | 1 | `/this-page-does-not-exist` |
| Sitemap URLs | 88 | `/`, `/blog`, `/portfolio`, `/estimate`, the 58 content pages, and 26 posts. Search is omitted. |

`tests/smoke.spec.ts` loads `/`, `/blog`, `/portfolio`, `/estimate`, the 58 content pages, and the 26 posts (88 URLs). The 320px crawl that wrote `qa-evidence/findings.json` ran before those three index routes were added to the crawler, so that file’s “88 routes” are home, the content pages, the posts, both search URLs, and the unknown URL. The three index routes were then loaded separately. The coverage matrix lists all 91. Shared chrome (header, footer, cookie notice, page hero) is on those pages.

## What was actually tested

Browser: Chromium only, via Playwright. Firefox and WebKit were not installed for this pass.

| Viewport | Coverage |
|---|---|
| 320px | The 88 routes in `tests/smoke.spec.ts`, the earlier crawl of home, content pages, posts, search, and the unknown URL, plus `/blog`, `/portfolio`, and `/estimate`. |
| 375px | The same 88 routes, plus search, search with a query, and the unknown URL. |
| 390px | Home only: open and close the mobile menu. |
| 768, 1280, 1920 | Core routes only, in an earlier crawl, before the final small-screen type tweak. That tweak applies at 480px and below, so those wider measurements still describe the current layout. |
| 1440px | The same 88 routes in the final `test:e2e` run, plus search and the unknown URL. |
| 430, 1024, 1366, 2560 | Not measured. |

Core routes in the wider crawl: `/`, `/services`, `/industries`, `/about-us`, `/contacts`, `/estimate`, `/blog`, `/faqs`, `/our-team`, `/portfolio`, `/services/website-development`, `/services/mobile-development`, `/why-choose-us`, `/finhub`.

Production preview (`vite preview` on port 4173) returned HTTP 200 for `/`, `/contacts`, `/services/website-development`, `/portfolio/aloh-lights-to-digital-life`, `/robots.txt`, and `/sitemap.xml`. Vite’s preview server falls back to `index.html`. `vercel.json` rewrites every path to `index.html` for Vercel. Any other host still needs that fallback, or a refresh on a nested URL will 404.

## Methodology

1. Route list taken from `src/App.tsx` and `src/data/content.json`.
2. Playwright loaded each route and recorded page errors, console errors, document overflow (`scrollWidth - clientWidth`), images that had finished loading with `naturalWidth === 0`, heading count, and an unexpected “Page not found”.
3. Failures were screenshotted. Overflow was traced to the element that was wider than the viewport. `overflow-x: hidden` was not used as the fix.
4. Fixes were remeasured on the pages that failed, then the route checks were run again.
5. Contact and estimate forms were not submitted with real details. No email was sent.

`npm run test:e2e` is the reusable check (`tests/smoke.spec.ts`). `node scripts/qa-crawl.mjs` is the wider crawl. Set `QA_WIDTHS=320` to force one width. Clear `QA_ONLY` first if a previous shell still has it.

## Functional parity

The React site keeps the published paths, service menu columns, estimate and contact actions, and the published copy, including template leftovers that are on the live site. Grammar-only edits in this pass removed a space before commas in 31 places (for example “Fixelcloud ,” and “WhatsApp , Instagram”).

Checked against the current app, not by a fresh click-through of every control on fixelcloud.com:

- Header Estimate Project, services mega menu order, and industry menu were aligned in the previous pass and were not reordered here.
- Learn more, All News, and View all projects remain wired. The heading merger still refuses those labels. The only merger change here stops a URL from being glued onto a heading.
- Free quote on Services and Industries goes to `/estimate`. Choose plan goes to `/estimate`.
- Contact us stays on the consultation band, FAQ, and footer rather than being duplicated as a second inline button.
- Unknown URLs render an in-app not-found state with a link home.
- Legacy flat URLs redirect. All 13 were loaded and landed on the target path.

Not re-verified against the live site in this pass: every external social URL, the Voxora link, and pixel-level parity of product screenshots. Product pages remain the published marketing sections.

## Defects

### Fixed

| ID | Severity | Where | What was wrong | Fix | Retest |
|---|---|---|---|---|---|
| QA-01 | P1 | Most pages at 320px | The top bar’s full email plus social icons made the page wider than the screen. | The email truncates. Social spacing tightens below the small breakpoint. | 320px crawl, 0 findings. Services screenshot `qa-evidence/after-services-320.png`. |
| QA-02 | P1 | `/about-us` at 320px | Four 70px technology icons sat on one row and stuck out of the column. | The row wraps. Icons are 56px until the `sm` breakpoint. | Overflow 0. `qa-evidence/after-about_us-320.png`. |
| QA-03 | P1 | `/industries` at 320px | Industry cards used the default grid minimum, so long words widened the page. | Cards and their text use `min-w-0`, with tighter padding on the smallest screens. | Included in the clean 320px crawl. |
| QA-04 | P1 | Cookie notice | The panel width used `100vw`, which includes the scrollbar and can widen the page. | The panel is inset from the left and right by 16px, with a max width of 440px. | No overflow on the pages that show it. |
| QA-05 | P1 | Long headings at 320px | “Telecommunication”, “CONSULTATION”, and the ALOH title were wider than the 280px column at the heading’s minimum size. | At 480px and below, section headings are 26px, card headings 16px, and shout headings 28px. Headings and body text may break a long token. | Telecommunication and ALOH remeasured at scroll width 320. Screenshots in `qa-evidence/after-*.png`. |
| QA-06 | P2 | `/portfolio/aloh-lights-to-digital-life` | The heading merger attached “Live Website: www.alohhostel.com” to the title, so the URL broke as “co m”. | A following line that contains `www.` or `http` stays body text. | Heading is “Bringing ALOH Lights to Digital Life”. The URL sits on one line under it. |
| QA-07 | P3 | Published copy | A space before a comma appeared 31 times. | Replaced with a normal comma. JSON still parses. | Source check. |
| QA-08 | P2 | SEO | Inner pages kept the previous description, and there was no canonical or Open Graph URL. | `usePageMeta` sets the title, description, canonical, and Open Graph tags in the browser. | Code review. Crawlers that do not run JavaScript still see only `index.html`. |
| QA-09 | P2 | `public/sitemap.xml` | `/blog`, `/portfolio`, and `/estimate` were missing. | Added. Sitemap now lists 88 URLs on `https://fixelcloud.com`. | `dist/sitemap.xml` contains those three URLs. |
| QA-10 | P3 | README | It said FAQ answers had been rewritten. | They are still the published placeholder paragraphs. The README now says that. | Readback. |

Pre-fix captures, from the crawl that found the overflow, are the `qa-evidence/before-*.png` files. `qa-evidence/findings.json` is the later 320px crawl: 88 routes, 0 findings.

One console error on `/enterprise-solutions/agile-project-management` (`net::ERR_CONNECTION_RESET`, twice) did not come with a broken image and did not recur on the later crawl. Treated as a dropped request, not a code defect.

### Still open

| ID | Severity | Item | Why it remains | Next step |
|---|---|---|---|---|
| QA-11 | Blocked | Contact and estimate delivery | No `VITE_CONTACT_ENDPOINT` is configured. A valid form would open `mailto:contact@fixelcloud.com`. That path was not triggered, so no test mail was sent. Empty submit was tested and shows “Enter a valid email address.” and “Add a few more details”. | Point the env var at an authorized endpoint, then test one submission. |
| QA-12 | Blocked | Office map off the live domain | The Google key is the one published on fixelcloud.com. If it is locked to that domain, the canvas hides and the Lahore, Dubai, and Houston addresses still show. | Open `/contacts` on the host that will serve the site. |
| QA-13 | P2 | SEO for non-JS clients | Titles and descriptions for inner pages are set after React loads. `index.html` carries the homepage title and description. There is no `noindex`. | Decide whether the host or a prerender step must expose per-page tags. This pass did not change the rendering model. |
| QA-14 | P3 | Cookie notice on a 320px-wide screen | The card sits at the bottom and covers the lower part of the first screen until the visitor accepts or rejects. The title stays visible. Dismissing it is the intended behavior. | Leave it unless a shorter legal text is approved. |
| QA-15 | P2 | Main bundle size | Production `index` JavaScript is 458.29 kB (gzip 144.40 kB). Page content is a separate 252.30 kB chunk (gzip 69.95 kB). CSS is 42.69 kB (gzip 8.92 kB). | Do not split it in this QA pass. Measure on the real host before treating it as a launch blocker. |
| QA-16 | Not tested | axe, Lighthouse, Firefox, WebKit, and the unlisted viewports | Not run. | Run before calling the release a full GO. |

Reduced motion is implemented: `Reveal` renders a plain element, and the stylesheet clears motion durations and press transforms. That behavior was confirmed in code and was not re-clicked with the OS setting in this pass.

## Accessibility

Done: one `h1` per tested page, a visible `focus-visible` outline in the stylesheet, form errors as text on empty contact submit, menu buttons named “Open menu” and “Close menu”, image checks for broken loads.

Not done: axe-core, keyboard walk of every menu, 200% zoom, contrast measurement, screen reader pass. Accessibility status in the matrix is **Not tested** for that reason. Do not treat the automated route check as a WCAG pass.

## Performance

No Lighthouse run and no field Core Web Vitals. The targets in the brief (LCP 2.5s, INP 200ms, CLS 0.1) are not claimed.

Laboratory facts from `npm run build`: the numbers in QA-15. Fonts load from Google Fonts. Images are the existing WebP files under `public/media`. The build completed without a chunk-size warning.

## Security and configuration

`npm audit` reported 0 vulnerabilities (info 0, low 0, moderate 0, high 0, critical 0).

No new secret was added. `VITE_CONTACT_ENDPOINT` is empty in `.env.example` and is public if it is set, because Vite inlines it. The Google Maps key already in `src/config/site.ts` is the published website key. Header security, CSP, and HTTPS redirects are host settings and were not verified from the frontend.

## Regression

After the heading, body wrapping, URL merger, and comma fixes:

- `npx playwright test` — 7 passed on the final suite (320, 375, and 1440 sweeps of the 88 routes, unknown URL, empty contact form, 13 legacy redirects, mobile menu). About 2.1 minutes.
- `QA_WIDTHS=320 node scripts/qa-crawl.mjs` — 88 routes, 0 findings. That run was taken before `/blog`, `/portfolio`, and `/estimate` were added to the crawler. Those three passed the same overflow and heading checks immediately afterwards, and they are in the Playwright sweep above.
- ALOH heading and overflow rechecked in the browser after the merger fix.

The final `npx playwright test` command, including the redirects, exited 0.

## Build

`npm run build` (`tsc --noEmit && vite build`) succeeded on the final tree. There is no ESLint script. `npm run typecheck` is the same TypeScript check the build already runs. There is no unit-test script.

Preview routes listed above returned 200 from the rebuilt `dist`.

## Production checklist

| Item | Status |
|---|---|
| Pages loaded in a browser | Passed for the 88-route set in Chromium |
| Overlapping or clipped content on every page | Not tested. Sampled tops of Services, About, Telecommunication, and ALOH at 320px. |
| Broken images on the route crawl | Passed (none that had finished loading with zero width) |
| Typography and spacing on every section | Not tested |
| Small mobile overflow | Passed at 320px for the 88 suite routes and the search and unknown URLs |
| 375 and 1440 overflow and single heading | Passed for the 88 suite routes, search, and the unknown URL |
| Tablet, 1280, 1920 | Passed for core routes in the earlier crawl only |
| 430, 1024, 1366, 2560 | Not tested |
| Mobile menu | Passed at 390px on the home page |
| Legacy redirects | Passed, 13 of 13 |
| Unknown URL | Passed |
| Contact empty-field validation | Passed |
| Contact or estimate server delivery | Blocked |
| Map on a non-live domain | Blocked |
| Keyboard, axe, reduced-motion click-through | Not tested |
| Console errors on the final 320px crawl | Passed |
| Lighthouse / Core Web Vitals | Not tested |
| SEO tags for JS clients | Passed in code. Non-JS clients: homepage tags only |
| `npm audit` | Passed, 0 vulnerabilities |
| TypeScript and production build | Passed |
| ESLint | Not applicable, no script |
| Unit tests | Not applicable, no script |
| Playwright | Passed |
| Production preview HTTP checks | Passed |
| Deployed | Not done. Not authorized. |

## Release verdict

**CONDITIONAL GO**

The frontend builds, the tested routes load, and the overflow defects found in this pass are fixed. Shipping still depends on the host serving `index.html` for unknown paths, a decision about per-page SEO for non-JS crawlers, and an authorized check of the form endpoint and the map key on the real domain. Accessibility, Lighthouse, and the untested viewports and browsers are open and are not release blockers that were shown to break the site. They are unverified.

Do not treat the existing Vercel deployment as this build. These QA edits are local until someone is asked to push them.

## Coverage matrix

Legend: **Passed** means that check was executed and met the criterion below. **Sampled** means the top of the page was looked at in a 320px screenshot, or a specific interaction on that page was used. **Not inspected** means no visual review. **Not tested** means no accessibility audit on that page. **Conditional** means the automated checks passed and the visual or accessibility review is incomplete.

Responsive Passed: no horizontal overflow at 320px, and at 375px and 1440px for content routes. Functional Passed: the route rendered its own page (one heading, or “Page not found” for the unknown URL). Regression Passed: included in the clean post-fix crawl or the Playwright run.

| Route | Desktop UI | Mobile UI | Responsive | Functional | Accessibility | Regression | Overall |
|---|---|---|---|---|---|---|---|
| `/` | Sampled | Sampled | Passed | Passed | Not tested | Passed | Conditional |
| `/blog` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/estimate` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/search` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/search?q=cloud` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/services` | Sampled | Sampled | Passed | Passed | Not tested | Passed | Conditional |
| `/services/website-development` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/services/mobile-development` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/services/mean-mern-development` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/services/cloud-strategy` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/cooperative-staff-model` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/cooperative-staff-model/staff-augmentation` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/cooperative-staff-model/dedicated-teams` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/cooperative-staff-model/digital-acceleration` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/social-media-marketing` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/social-media-marketing/social-media-management` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/social-media-marketing/social-media-advertising` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/social-media-marketing/content-marketing` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/generative-ai-and-data` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/generative-ai-and-data/artificial-intelligence` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/generative-ai-and-data/machine-learning` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/generative-ai-and-data/data-engineering` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/design-ideation` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/design-ideation/user-research` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/design-ideation/product-design` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/design-ideation/ui-ux-design` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/design-ideation/design-system` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ui-ux-design` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/enterprise-solutions` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/enterprise-solutions/quality-assurance` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/enterprise-solutions/agile-project-management` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/enterprise-solutions/cybersecurity` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/enterprise-solutions/business-process-outsourcing` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/industries` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/industries/retail` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/industries/healthcare` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/industries/education` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/industries/fintech` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/industries/telecommunication` | Sampled | Sampled | Passed | Passed | Not tested | Passed | Conditional |
| `/industries/media-and-entertainment` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ecommerce` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ecommerce/ecommerce-integration-service` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ecommerce/ecommerce-design` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ecommerce/ecommerce-app-development` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/about-us` | Sampled | Sampled | Passed | Passed | Not tested | Passed | Conditional |
| `/contacts` | Sampled | Sampled | Passed | Passed | Not tested | Passed | Conditional |
| `/privacy-policy` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/faqs` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/our-team` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/why-choose-us` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/finhub` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/salesportal` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ai-messaging-solutions` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/ai-chatbot-integrations` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/bellemar` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/tlc-pr` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/hanalei-colony-resort` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/aloh-lights-to-digital-life` | Sampled | Sampled | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/technology-design` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/healthcare` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/insurance` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/saas` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/portfolio/us-bank-finance` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/ai-implementation-mistakes-that-cost-businesses-more-than-money` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/accelerating-workflows-with-fixelclouds-intelligent-design-ecosystem` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/why-ruby-on-rails-is-still-a-smart-choice-for-web-development` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/how-n8n-automation-is-changing-the-way-businesses-work` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/will-artificial-intelligence-replace-programmers` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/maryam-nawazs-parwaaz-initiative-to-build-a-digital-future-for-youth` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/building-a-strong-design-community-with-ixdf-lahore` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/a-step-forward-in-pakistans-tech-ecosystem` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/the-impact-of-technology-on-modern-enterprises` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/how-technology-is-shaping-the-future-of-business-in-2025` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/how-chatbots-are-changing-customer-support` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/how-bpo-helps-growing-small-businesses` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/how-the-latest-technology-is-changing-the-way-we-live-in-2025` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/blockchain-technology-beyond-cryptocurrency` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/salesforce-customization-strategies-for-improved-crm-solutions` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/software-development-models-which-one-to-choose` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/application-development-with-drag-and-drop-solutions` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/avoid-these-artificial-intelligence-implementation-errors-for-greater-roi` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/why-startups-should-choose-custom-software-solutions` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/exploring-the-potential-of-augmented-reality-in-modern-applications` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/exploring-the-impact-of-edge-computing-on-data-processing` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/node-js` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/the-importance-of-ui-ux-in-modern-digital-experiences` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/mobile-app-development-dynamic-interfaces-user-experience-personalized-recommendations-real-time-updates` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/8-affordable-ways-to-implement-an-ai-strategy` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/blog/how-generative-ai-is-shaping-the-future-of-healthcare` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |
| `/this-page-does-not-exist` | Not inspected | Not inspected | Passed | Passed | Not tested | Passed | Conditional |

Legacy redirects, checked by loading each path: `/about-us-digital-innovation`, `/web-development`, `/website-development`, `/mobile-development`, `/mean-mern-development`, `/cloud-strategy`, `/ui-ux-design`, `/retail`, `/healthcare`, `/education`, `/fintech`, `/telecommunication`, `/media-and-entertainment`. Each ended on its current route. They are not separate pages in the matrix.

