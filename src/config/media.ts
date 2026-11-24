import manifest from "../data/media.json";

export interface MediaImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** An original page image tied to the section heading it appeared under. */
export interface SectionMedia {
  heading: string;
  /** "background" images filled the whole section (closing CTA bands); "image" ones sat beside the text. */
  kind: "image" | "background";
  image: MediaImage;
}

export interface PageMedia {
  lead?: MediaImage;
  gallery?: MediaImage[];
  logos?: MediaImage[];
  projects?: boolean;
  sections?: SectionMedia[];
}

/**
 * Maps an original WordPress upload path (for example "2024/12/2.jpg") to the
 * self-hosted, WebP-converted copy in public/media.
 */
export function asset(uploadPath: string) {
  return `/media/${uploadPath.replace(/\.(png|jpe?g|avif|gif)$/i, ".webp")}`;
}

const data = manifest as { pages: Record<string, PageMedia>; posts: Record<string, MediaImage> };

export function pageMedia(slug: string): PageMedia {
  return data.pages[slug] ?? {};
}

export function postImage(slug: string): MediaImage | undefined {
  return data.posts[slug];
}
