import { asset as upload } from "../config/media";

export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
}

export const projects: Project[] = [
  {
    slug: "insurance",
    title: "Guidewire",
    category: "Insurance",
    image: upload("2019/11/Guidewire-720x520.jpg"),
    imageAlt: "Guidewire insurance project",
  },
  {
    slug: "saas",
    title: "Hitch",
    category: "Fintech",
    image: upload("2019/11/1-Hitch-Main-720x520.jpg"),
    imageAlt: "Hitch mortgage platform",
  },
  {
    slug: "us-bank-finance",
    title: "US Bank",
    category: "Finance",
    image: upload("2019/11/US-Bank-720x520.jpg"),
    imageAlt: "US Bank digital platform",
  },
  {
    slug: "bellemar",
    title: "Bellemar",
    category: "Hospitality",
    image: upload("2025/04/1-Bellemar-Main-720x520.jpg"),
    imageAlt: "Bellemar project",
  },
  {
    slug: "tlc-pr",
    title: "TLC-PR",
    category: "Hospitality",
    image: upload("2025/04/1-TLC-Main-720x520.png"),
    imageAlt: "TLC-PR project",
  },
  {
    slug: "hanalei-colony-resort",
    title: "HCR",
    category: "Hospitality",
    image: upload("2025/04/1-HCR-Main-720x520.png"),
    imageAlt: "Hanalei Colony Resort project",
  },
  {
    slug: "aloh-lights-to-digital-life",
    title: "ALOH",
    category: "Hospitality",
    image: upload("2025/04/1-ALOH-Main-720x520.png"),
    imageAlt: "ALOH project",
  },
  {
    slug: "technology-design",
    title: "Apple Design",
    category: "Design",
    image: upload("2019/11/Apple-720x520.jpg"),
    imageAlt: "Apple Design project",
  },
  {
    slug: "healthcare",
    title: "BSW Healthcare",
    category: "Healthcare",
    image: upload("2019/11/BSW-720x520.png"),
    imageAlt: "BSW Healthcare project",
  },
];

export function projectPath(slug: string) {
  return `/portfolio/${slug}`;
}
