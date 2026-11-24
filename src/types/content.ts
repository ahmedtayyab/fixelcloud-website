export interface CmsPage {
  title: string;
  blocks: string[];
}

export interface CmsPost {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  categories: string[];
  blocks: string[];
}

export interface CmsData {
  pages: Record<string, CmsPage>;
  posts: CmsPost[];
}
