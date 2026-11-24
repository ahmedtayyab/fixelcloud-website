import content from "../data/content.json";
import type { CmsData } from "../types/content";

export const posts = (content as CmsData).posts;

export function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const categories = Array.from(new Set(posts.flatMap((post) => post.categories)))
  .filter((name) => name !== "Uncategorized")
  .map((name) => ({ name, count: posts.filter((post) => post.categories.includes(name)).length }));
