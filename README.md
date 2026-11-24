# Fixelcloud

React frontend for the Fixelcloud website. It keeps the existing brand, page map, and published copy, and replaces the WordPress theme layout with a consistent, maintainable interface.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Motion for React, used for section reveals

## Commands

```bash
npm install
npx playwright install chromium
npm run dev
npm run typecheck
npm run test:e2e
npm run build
npm run preview
```

`npm run typecheck` is the lint step. It runs the TypeScript compiler with `strict` and unused-symbol checks. There is no separate ESLint script.

`npm run test:e2e` opens the dev server and checks every content route at 320px, 375px, and 1440px for a single heading, a missing-page message, and horizontal overflow. It also checks the unknown-route message, contact-form validation, the mobile menu, and legacy URL redirects.

## Environment

Copy `.env.example` to `.env` only if a form endpoint exists.

`VITE_CONTACT_ENDPOINT` is optional. When it is set, the contact and estimate forms `POST` JSON to that URL. When it is empty, a valid form opens the visitor’s email app addressed to `contact@fixelcloud.com`. The interface says so. Nothing is stored in a fake success state.

## Folder structure

```text
src/
├── components/
│   ├── layout/       Header, footer, cookie notice, page shell
│   ├── sections/     Shared bands, forms, article body
│   └── ui/           Buttons, containers, heroes, motion
├── config/site.ts    Company details, social links, media URLs
├── data/             Navigation, homepage facts, portfolio, CMS text
├── hooks/
├── pages/
├── styles/index.css  Design tokens
├── types/
└── utils/
```

## Routing

Routes follow the live site paths, including:

- `/`, `/services`, `/industries`, `/about-us`, `/blog`, `/contacts`
- Nested services such as `/services/website-development` and `/design-ideation/ui-ux-design`
- Industries such as `/industries/healthcare`
- Portfolio items such as `/portfolio/saas`
- Insights at `/blog/:slug`
- `/estimate` for the old `/?fluent-form=4` popup
- `/search` for the old `/?s=` search

Older flat URLs, such as `/web-development` and `/about-us-digital-innovation`, redirect to the current paths.

Unknown paths render a not-found state. Any other slug present in `src/data/content.json` renders through the shared content page.

## Where to change the design

Colors, fonts, shadows, and motion timing live in `src/styles/index.css` under `@theme`.

Company email, phones, offices, and social links live in `src/config/site.ts`.

## How to add a page

1. Add the route in `src/App.tsx` if it needs a custom layout.
2. Otherwise add the slug and text blocks to `src/data/content.json`. The `*` route renders it.
3. Add a navigation entry in `src/data/navigation.ts` if it belongs in a menu.

## How to update navigation or content

- Menus: `src/data/navigation.ts`
- Homepage service cards, stats, FAQs, and team names: `src/data/home.ts`
- Project cards and images: `src/data/portfolio.ts`
- Long-form page and article copy: `src/data/content.json`

Images are the original WordPress uploads, converted to WebP in `public/media`. `src/data/media.json` records each page image, its size, and the section it belongs to. `asset()` in `src/config/media.ts` maps an upload path such as `2024/12/2.jpg` to that file.

## Animation

`Reveal` uses Motion and only runs when the section enters the viewport. Hover, menus, and the logo marquee use CSS. `prefers-reduced-motion` shortens both.

## Deployment

The site is a single-page app. The host must serve `index.html` for unknown paths so a refresh on `/services/website-development` still loads the app. `vercel.json` already rewrites every path to `index.html`.

`public/robots.txt` and `public/sitemap.xml` use `https://fixelcloud.com`. Change that host if this build is served from another domain.

Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` before building if form posts should reach a server. The value is public in the browser bundle. Do not put a secret there.

After deploy, open `/`, `/contacts`, and one nested URL directly, then refresh each one.

## Known limitations

- Forms need `VITE_CONTACT_ENDPOINT` for a server submission. Without it, they use `mailto`.
- WordPress comments, WooCommerce cart/shop pages, and theme demo portfolio layouts are not part of this frontend.
- Voxora stays an external product link: `https://voxora.fixelcloud.com/`.
- The leadership names on `/our-team` are the names published on the current site. Replace them in `src/data/home.ts` when the real roster is confirmed.
- FAQ answers stay the published placeholder paragraphs. They repeat across questions because that is what the original page published.
- The contact map uses the Google Maps key published on fixelcloud.com. If that key is limited to the live domain, the page lists the Lahore, Dubai, and Houston offices instead.
- FinHub, SalesPortal, and AI Messaging keep the published marketing copy. Sample numbers from the original app previews are not repeated as page text.
