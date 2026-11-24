export interface Plan {
  name: string;
  price: string;
  note?: string;
  features: string[];
}

export interface TitledText {
  title: string;
  text: string;
  /** Published step number, such as "04", when the original page numbered the item. */
  number?: string;
}

export interface Quote {
  name: string;
  role: string;
  quote: string;
}

export type ContentNode =
  | { type: "heading"; level: 2 | 3; text: string; eyebrow?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "features"; items: TitledText[]; numbered: boolean }
  | { type: "plans"; items: Plan[] }
  | { type: "tabs"; items: TitledText[] }
  | { type: "accordion"; items: TitledText[] }
  | { type: "steps"; items: string[] }
  | { type: "quotes"; items: Quote[] }
  | { type: "people"; items: { role: string; name: string }[] }
  | { type: "action"; label: string; href: string; external?: boolean };

export interface ParseOptions {
  /** Stop reading blocks at the first line starting with this text. */
  stopAt?: string;
  /** Recognise the original page widgets (tabs, accordions, eyebrows, buttons) instead of plain text. */
  widgets?: boolean;
}

export interface ContentSection {
  heading?: { text: string; eyebrow?: string };
  nodes: ContentNode[];
}

const SKIP = new Set([
  "free quote",
  "learn more",
  "contact us",
  "search",
  "search search",
  "search for:",
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "dribbble",
  "published:",
  "category:",
  "choose plan",
  "choose plane",
  "view more",
]);

/* Button labels on the original pages. Most open the contact form; a few are product links. */
const ACTIONS = new Set([
  "boost project success",
  "launch your ai chatbot now",
  "get started",
  "get your bot now",
  "let’s build your ai bot",
  "talk to our team",
  "book a finhub demo",
  "book a demo",
  "sign in to finhub",
  "explore the modules",
  "our services",
  "learn more",
  "view all projects",
  "all news",
]);

const EYEBROW = /^\/\/\s*(.+)$/;
const NUMBER = "#number";

function tidy(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trim();
}

function isNoise(line: string) {
  if (!line || line.startsWith("//")) return true;
  if (line.startsWith("Contact Form Demo")) return true;
  if (/^\d+\.?$/.test(line)) return true;
  return SKIP.has(line.toLowerCase());
}

const isLabel = (text: string) => text.length <= 60 && !/[.!?]$/.test(text);
const isSentence = (text: string) => text.length > 30 && /[.!?)]$/.test(text);

type Atom =
  | { type: "heading"; level: 2 | 3; text: string; eyebrow?: string; numbered?: boolean; step?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** Turn scraped page blocks into a small set of renderable nodes. */
export function parseContent(rawBlocks: string[], { stopAt, widgets = false }: ParseOptions = {}) {
  const lines: string[] = [];

  for (let index = 0; index < rawBlocks.length; index += 1) {
    const line = tidy(rawBlocks[index]);
    if (stopAt && line.startsWith(stopAt)) break;
    if (EYEBROW.test(line) && line.length < 60) {
      lines.push(line);
      continue;
    }
    if (/^\d{1,2}\.?$/.test(line) && rawBlocks[index + 1]?.startsWith("##H")) {
      lines.push(`#number ${line.replace(/\.$/, "").padStart(2, "0")}`);
      continue;
    }
    if (isNoise(line)) continue;
    const previous = index > 0 ? tidy(rawBlocks[index - 1]) : "";
    const followsLabel =
      Boolean(previous) && !/^(##H|- |– |\/\/)/.test(previous) && isLabel(previous) && previous.length <= 40;
    if (
      widgets &&
      !followsLabel &&
      !/^(##H|- |– )|\/$/.test(line) &&
      !ACTIONS.has(line.toLowerCase()) &&
      isLabel(line) &&
      line.length <= 40 &&
      rawBlocks[index + 1]?.startsWith("##H2")
    ) {
      lines.push(`// ${line}`);
      continue;
    }
    lines.push(line);
  }

  const merged: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const next = lines[index + 1];
    const heading = line.match(/^##H(\d)\s*(.*)$/);
    if (
      heading &&
      next &&
      !next.startsWith(NUMBER) &&
      !/^["“]/.test(lines[index + 2] ?? "") &&
      !next.startsWith("##H") &&
      !next.startsWith("//") &&
      !next.startsWith("-") &&
      next.length < 52 &&
      !/[.!?]$/.test(next) &&
      heading[2] &&
      !/^\$/.test(heading[2]) &&
      !/[.!?]$/.test(heading[2])
    ) {
      merged.push(`##H${heading[1]} ${heading[2]} ${next}`.replace(/\s+/g, " "));
      index += 1;
      continue;
    }
    merged.push(line);
  }

  const titleLine = merged.find((line) => line.startsWith("##H2") || line.startsWith("##H3"));
  const title = titleLine ? titleLine.replace(/^##H\d\s*/, "") : "Fixelcloud";

  const atoms: Atom[] = [];
  let list: string[] | null = null;
  let eyebrow: string | undefined;
  let numbered = false;
  let step: string | undefined;

  const closeList = () => {
    if (list && list.length) atoms.push({ type: "list", items: list });
    list = null;
  };

  for (const line of merged) {
    if (line.startsWith("- ") || line.startsWith("– ")) {
      list = list ?? [];
      list.push(line.replace(/^[-–]\s*/, ""));
      continue;
    }
    closeList();

    const stepLine = line.match(/^#number(?:\s+(\d{2}))?$/);
    if (stepLine) {
      numbered = true;
      step = stepLine[1];
      continue;
    }

    const label = line.match(EYEBROW);
    if (label) {
      eyebrow = `// ${label[1]}`;
      continue;
    }

    const heading = line.match(/^##H([2-6])\s*(.*)$/);
    if (heading) {
      const text = heading[2];
      if (!text) continue;
      const level = Number(heading[1]) <= 3 ? 2 : 3;
      if (text === title && atoms.length === 0) continue;
      atoms.push({ type: "heading", level, text, eyebrow: level === 2 ? eyebrow : undefined, numbered, step });
      eyebrow = undefined;
      numbered = false;
      step = undefined;
      continue;
    }

    eyebrow = undefined;
    numbered = false;
    if (line === title) continue;
    const previous = atoms[atoms.length - 1];
    if (previous?.type === "paragraph" && previous.text.endsWith(",")) {
      previous.text = `${previous.text} ${line}`;
      continue;
    }
    atoms.push({ type: "paragraph", text: line });
  }
  closeList();

  const blocks: ContentNode[] = [];
  for (let index = 0; index < atoms.length; index += 1) {
    const atom = atoms[index];

    if (isPlanStart(atoms, index)) {
      const plans: Plan[] = [];
      let cursor = index;
      while (isPlanStart(atoms, cursor)) {
        const plan: Plan = {
          name: (atoms[cursor] as { text: string }).text,
          price: (atoms[cursor + 1] as { text: string }).text.replace(/\$\s+/, "$"),
          features: [],
        };
        cursor += 2;
        while (cursor < atoms.length && atoms[cursor].type !== "heading") {
          const item = atoms[cursor];
          if (item.type === "list") plan.features.push(...item.items);
          if (item.type === "paragraph") plan.note = plan.note ?? item.text;
          cursor += 1;
        }
        plans.push(plan);
      }
      blocks.push({ type: "plans", items: plans });
      index = cursor - 1;
      continue;
    }

    if (atom.type === "heading" && atom.level === 3) {
      const quotes: Quote[] = [];
      let cursor = index;
      while (cursor < atoms.length) {
        const [name, role, quote] = atoms.slice(cursor, cursor + 3);
        if (
          name?.type === "heading" &&
          name.level === 3 &&
          role?.type === "paragraph" &&
          quote?.type === "paragraph" &&
          /^["“]/.test(quote.text)
        ) {
          quotes.push({ name: name.text, role: role.text, quote: quote.text.replace(/^["“]|["”]$/g, "") });
          cursor += 3;
          continue;
        }
        break;
      }
      if (widgets && quotes.length) {
        blocks.push({ type: "quotes", items: quotes });
        index = cursor - 1;
        continue;
      }

      const features: TitledText[] = [];
      cursor = index;
      while (cursor < atoms.length) {
        const heading = atoms[cursor];
        const body = atoms[cursor + 1];
        if (heading?.type === "heading" && heading.level === 3 && body?.type === "paragraph") {
          features.push({ title: heading.text, text: body.text, number: heading.step });
          cursor += 2;
          continue;
        }
        break;
      }
      const seen = new Set<string>();
      const unique = features.filter((item) => {
        const id = `${item.number ?? ""}\0${item.title}\0${item.text}`;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      features.splice(0, features.length, ...unique);
      if (features.length >= 3) {
        blocks.push({ type: "features", items: features, numbered: Boolean(atom.numbered) });
        index = cursor - 1;
        continue;
      }

      /* Icon steps such as the product design process: titles with no paragraph under them. */
      if (widgets) {
        const steps: string[] = [];
        cursor = index;
        while (cursor < atoms.length) {
          const heading = atoms[cursor];
          const next = atoms[cursor + 1];
          if (heading?.type === "heading" && heading.level === 3 && next?.type !== "paragraph") {
            steps.push(heading.text);
            cursor += 1;
            continue;
          }
          break;
        }
        if (steps.length === 4) {
          blocks.push({ type: "steps", items: steps });
          index = cursor - 1;
          continue;
        }
      }
    }

    if (widgets && atom.type === "list" && atom.items.length === 1 && atom.items[0].toLowerCase() === "learn more") {
      blocks.push({ type: "action", label: "Learn more", ...actionLink("Learn more", previousHeading(blocks)) });
      continue;
    }

    if (widgets && atom.type === "list" && atom.items.length >= 2 && atom.items.length <= 6) {
      const panels = atoms.slice(index + 1, index + 1 + atom.items.length);
      if (panels.length === atom.items.length && panels.every((panel) => panel.type === "paragraph" && isSentence(panel.text))) {
        blocks.push({
          type: "tabs",
          items: atom.items.map((title, item) => ({ title, text: (panels[item] as { text: string }).text })),
        });
        index += atom.items.length;
        continue;
      }
    }

    if (widgets && atom.type === "paragraph") {
      const items: TitledText[] = [];
      let cursor = index;
      while (cursor + 1 < atoms.length) {
        const title = atoms[cursor];
        const body = atoms[cursor + 1];
        if (title.type === "paragraph" && isLabel(title.text) && body.type === "paragraph" && isSentence(body.text)) {
          items.push({ title: title.text.replace(/:$/, ""), text: body.text });
          cursor += 2;
          continue;
        }
        break;
      }
      if (items.length >= 3) {
        blocks.push({ type: "accordion", items });
        index = cursor - 1;
        continue;
      }

      if (ACTIONS.has(atom.text.toLowerCase())) {
        blocks.push({ type: "action", label: atom.text, ...actionLink(atom.text, previousHeading(blocks)) });
        continue;
      }

      const labels: string[] = [];
      cursor = index;
      while (cursor < atoms.length) {
        const item = atoms[cursor];
        if (item.type !== "paragraph" || !isLabel(item.text) || /:$/.test(item.text) || ACTIONS.has(item.text.toLowerCase())) break;
        labels.push(item.text);
        cursor += 1;
      }
      if (labels.length >= 3) {
        const people = toPeople(labels);
        blocks.push(people ? { type: "people", items: people } : { type: "list", items: labels });
        index = cursor - 1;
        continue;
      }
    }

    blocks.push(atom.type === "heading" ? { type: "heading", level: atom.level, text: atom.text, eyebrow: atom.eyebrow } : atom);
  }

  let summary = "";
  if (blocks[0]?.type === "paragraph") {
    summary = blocks[0].text;
    blocks.shift();
  }

  return { title, summary, blocks };
}

/** Role/name pairs from the team rosters: every second label is a two-word person name. */
function toPeople(labels: string[]) {
  if (labels.length < 4 || labels.length % 2 !== 0) return null;
  const people: { role: string; name: string }[] = [];
  for (let index = 0; index < labels.length; index += 2) {
    const [role, name] = [labels[index], labels[index + 1]];
    if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) return null;
    people.push({ role, name });
  }
  return people;
}

const learnMoreRoutes: Record<string, string> = {
  "health care": "/industries/healthcare",
  healthcare: "/industries/healthcare",
  education: "/industries/education",
  fintech: "/industries/fintech",
  retail: "/industries/retail",
  telecommunication: "/industries/telecommunication",
  "media and entertainment": "/industries/media-and-entertainment",
  "ecommerce app development": "/ecommerce/ecommerce-app-development",
  "e-commerce app development": "/ecommerce/ecommerce-app-development",
  "custom ecommerce design": "/ecommerce/ecommerce-design",
  "e-commerce design": "/ecommerce/ecommerce-design",
  "e-commerce integration service": "/ecommerce/ecommerce-integration-service",
  "e-commerce integration services": "/ecommerce/ecommerce-integration-service",
  "php website development services": "/services/website-development",
};

function learnMoreHref(heading?: string) {
  if (!heading) return "/contacts";
  const key = heading.toLowerCase().replace(/\s+/g, " ").trim();
  if (learnMoreRoutes[key]) return learnMoreRoutes[key];
  if (heading.length > 40) {
    const slug = key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `/blog/${slug}`;
  }
  return "/contacts";
}

function actionLink(label: string, heading?: string): { href: string; external?: boolean } {
  const key = label.toLowerCase();
  if (key.startsWith("sign in")) return { href: "https://finhub.fixelcloud.co", external: true };
  if (key === "our services" || key === "explore the modules") return { href: "/services" };
  if (key === "view all projects") return { href: "/portfolio" };
  if (key === "all news") return { href: "/blog" };
  if (key === "learn more") return { href: learnMoreHref(heading) };
  return { href: "/contacts" };
}

function previousHeading(blocks: ContentNode[]) {
  for (let index = blocks.length - 1; index >= 0; index -= 1) {
    const block = blocks[index];
    if (block.type === "heading") return block.text;
  }
  return undefined;
}

function isPlanStart(atoms: Atom[], index: number) {
  const name = atoms[index];
  const price = atoms[index + 1];
  return (
    name?.type === "heading" &&
    /plan$/i.test(name.text) &&
    price?.type === "heading" &&
    /^\$/.test(price.text)
  );
}

/** Groups nodes under their level-2 headings so pages can lay sections out independently. */
export function toSections(blocks: ContentNode[]): ContentSection[] {
  const sections: ContentSection[] = [{ nodes: [] }];
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      sections.push({ heading: { text: block.text, eyebrow: block.eyebrow }, nodes: [] });
      continue;
    }
    sections[sections.length - 1].nodes.push(block);
  }
  return sections.filter((section) => section.heading || section.nodes.length);
}

/** Loose key for matching a parsed heading against the heading text recorded with page media. */
export function headingKey(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
