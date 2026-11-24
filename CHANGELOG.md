# Implementation summary

This frontend replaces the WordPress theme with a React application. The brand, information architecture, and published copy stay in place. Layout and interaction were changed only where the current site was inconsistent or hard to use.

## Preserve

- Forest green, brand green `#15A970`, black heroes, and square green buttons
- Montserrat headings and Nunito Sans body text
- Header order: Services, Industries, About, Insights, Contacts, Products, Estimate
- Homepage sequence: hero, introduction, services, technology stats, work, client videos, consultation, footer
- Service, industry, ecommerce, product, insight, and portfolio URLs
- Office addresses, phone numbers, email, and social profiles
- Published service, industry, product, and case-study copy in `src/data/content.json`
- Client video embeds

## Refine

- Spacing, type scale, and alignment pulled into one token file
- Sticky header, visible focus, skip link, and keyboard-reachable menus
- Service and industry menus rebuilt as readable columns instead of a crowded dropdown
- Logo row, project switcher, and mobile menu given predictable motion
- Cookie choice stored locally, with accept and reject
- Contact and estimate forms validate before they open email or post to a configured endpoint
- Old theme names “Engitech” and “Intellectsoft” are shown as Fixelcloud
- Legacy flat URLs redirect to the paths used in the current menu
- Site search works across pages, projects, and insights

## Redesign

- Service and industry index pages, so each group is a scannable card instead of a long stacked list
- FAQ accordion. The previous answers were repeated placeholder text and did not answer the questions
- Project and article pages, using one article layout instead of the theme’s mixed widgets
- Estimate request. The WordPress popup is now a dedicated page at `/estimate`, including the old `/?fluent-form=4` entry

## Visual audit pass

Every page was compared against fixelcloud.com at the same viewport.

- Original uploads mirrored as WebP in `public/media`, with real sizes in `src/data/media.json`. Each image records the section heading it was published under, so it renders in the same section.
- Service pages rebuilt from the original widgets, detected in the published copy:
  - process tabs, shown in a black band beside a photo when the section is a "technology index"
  - "What we offer" accordions
  - "Why Choosing Us?" icon boxes and numbered feature lists
  - pricing plans and written client quotes
  - each page's own closing call to action over its original background photo
- Page copy that the first scrape cut off at 80 blocks (pricing plans, closing sections, product pages) has been restored.
- Page hero, footer columns, partner logos, header and topbar spacing now use measured values.
- FinHub, SalesPortal, and AI Messaging render as marketing sections. Dashboard sample text from the original app previews is left out.
- The contact map marks Lahore, Dubai, and Houston, matching the original script.

## Interaction and type pass

- Section headings scale from 32px to 42px, hero headings from 42px to 60px, and body text is 17px from 1024px up.
- Feature blocks, pricing plans, people, quotes, service groups, industry entries, and homepage services use bordered cards with a shared lift on hover.
- Buttons scale down on press, and links with arrows shift on hover.
- Process tabs fade between panels. Accordions, FAQs, the mobile menu, and its submenus open and close on height instead of popping.
- Desktop menus fade and rise. Entrance motion uses one 550ms curve and does not repeat. Reduced motion removes the movement.

## UX refinement

- Buttons now have three levels: filled primary, outlined secondary, and text tertiary. A section keeps one filled action.
- Square benefit diagrams, such as the cloud graphic, sit centred between the two feature columns. Wide photos stay beside the copy.
- Mega-menu group titles are extrabold. The links under them are medium weight and quieter.

## Not carried over

- WooCommerce shop, cart, and checkout
- Theme demo pages such as sample pages, elements, and alternate portfolio grids
- Server-side comment forms
