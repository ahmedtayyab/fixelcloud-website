import { useEffect } from "react";

const fallbackDescription =
  "Fixelcloud builds scalable cloud solutions, custom software, and digital products for businesses worldwide.";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title.includes("Fixelcloud") ? title : `${title} - Fixelcloud`;
    const summary = description?.trim() || fallbackDescription;
    document.title = fullTitle;
    upsertMeta("name", "description", summary);
    const url = `${window.location.origin}${window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", summary);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
  }, [title, description]);
}
