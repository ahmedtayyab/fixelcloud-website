import content from "../data/content.json";
import { serviceGroups, industryLinks, ecommerceGroup, productLinks } from "../data/navigation";
import { projects } from "../data/portfolio";
import type { CmsData } from "../types/content";

const cms = content as CmsData;

export interface SearchRecord {
  title: string;
  href: string;
  kind: string;
  text: string;
}

function records(): SearchRecord[] {
  const pages = Object.entries(cms.pages).map(([slug, page]) => ({
    title: page.title.replace(/\s+-\s+Fixelcloud$/i, ""),
    href: `/${slug}`,
    kind: "Page",
    text: page.blocks.join(" "),
  }));

  const posts = cms.posts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    kind: "Insight",
    text: `${post.excerpt} ${post.blocks.join(" ")}`,
  }));

  const work = projects.map((project) => ({
    title: project.title,
    href: `/portfolio/${project.slug}`,
    kind: "Work",
    text: project.category,
  }));

  const links = [...serviceGroups.flatMap((group) => group.items), ...industryLinks, ...ecommerceGroup.items, ...productLinks]
    .filter((link) => !link.external)
    .map((link) => ({
      title: link.label,
      href: link.href,
      kind: "Page",
      text: link.description ?? link.label,
    }));

  const unique = new Map<string, SearchRecord>();
  for (const record of [...pages, ...posts, ...work, ...links]) {
    unique.set(record.href, record);
  }
  return [...unique.values()];
}

const index = records();

export function searchContent(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 1);
  if (!terms.length) return [];

  return index
    .map((record) => {
      const haystack = `${record.title} ${record.text}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { record, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, 24)
    .map((item) => item.record);
}
