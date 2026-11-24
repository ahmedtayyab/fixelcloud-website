import type { FlaticonName } from "../components/ui/Icons";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  description: string;
  items: NavLink[];
}

export const serviceGroups: NavGroup[] = [
  {
    label: "Tech Solutions",
    href: "/services",
    description:
      "Comprehensive tech solutions to optimize operations, improve scalability, and drive growth.",
    items: [
      { label: "Web Development", href: "/services/website-development" },
      { label: "Mobile Development", href: "/services/mobile-development" },
      { label: "MEAN / MERN Development", href: "/services/mean-mern-development" },
      { label: "Cloud Strategy", href: "/services/cloud-strategy" },
    ],
  },
  {
    label: "Cooperative Staff Model",
    href: "/cooperative-staff-model",
    description:
      "Flexible and skilled staffing solutions to your business needs, ensuring seamless project execution.",
    items: [
      { label: "Staff Augmentation", href: "/cooperative-staff-model/staff-augmentation" },
      { label: "Dedicated Teams", href: "/cooperative-staff-model/dedicated-teams" },
      { label: "Digital Acceleration", href: "/cooperative-staff-model/digital-acceleration" },
    ],
  },
  {
    label: "Social Media Marketing",
    href: "/social-media-marketing",
    description:
      "Drive engagement and grow your online presence with strategic campaigns that resonate with your audience.",
    items: [
      { label: "Social Media Management", href: "/social-media-marketing/social-media-management" },
      { label: "Social Media Advertising", href: "/social-media-marketing/social-media-advertising" },
      { label: "Content Marketing", href: "/social-media-marketing/content-marketing" },
    ],
  },
  {
    label: "Generative AI and Data",
    href: "/generative-ai-and-data",
    description:
      "Harness the power of AI to uncover insights, automate processes, and elevate decision-making.",
    items: [
      { label: "Artificial Intelligence", href: "/generative-ai-and-data/artificial-intelligence" },
      { label: "Machine Learning", href: "/generative-ai-and-data/machine-learning" },
      { label: "Data Engineering", href: "/generative-ai-and-data/data-engineering" },
    ],
  },
  {
    label: "Design & Ideation",
    href: "/design-ideation",
    description:
      "Innovative and user-centric designs to bring your ideas to life with creativity and precision.",
    items: [
      { label: "User Research", href: "/design-ideation/user-research" },
      { label: "Product Design", href: "/design-ideation/product-design" },
      { label: "UI/UX Design", href: "/design-ideation/ui-ux-design" },
      { label: "Design System", href: "/design-ideation/design-system" },
    ],
  },
  {
    label: "Enterprise Solutions",
    href: "/enterprise-solutions",
    description:
      "Reliable support to keep your systems running smoothly, ensuring security and efficiency.",
    items: [
      { label: "Quality Assurance", href: "/enterprise-solutions/quality-assurance" },
      { label: "Agile Project Management", href: "/enterprise-solutions/agile-project-management" },
      { label: "Cybersecurity", href: "/enterprise-solutions/cybersecurity" },
      {
        label: "Business Process Outsourcing",
        href: "/enterprise-solutions/business-process-outsourcing",
      },
    ],
  },
];

export const industryLinks: NavLink[] = [
  {
    label: "Retail",
    href: "/industries/retail",
    description:
      "We understand that the retail industry is constantly evolving and becoming increasingly dependent on technology. To stay ahead of the competition, we support your digital transformation.",
  },
  {
    label: "Health Care",
    href: "/industries/healthcare",
    description:
      "We provide healthcare organizations with the personnel they need to keep up with the demands of a changing marketplace. Our team of experts has decades of experience in healthcare.",
  },
  {
    label: "Education",
    href: "/industries/education",
    description:
      "We help educational institutions with their day-to-day operations, including managing servers and software updates, creating new systems and applications, and providing guidance as needed.",
  },
  {
    label: "Fintech",
    href: "/industries/fintech",
    description:
      "We worked with the IT professionals in fintech companies all over the world. We've been doing this for years and have built up an impressive network of talented contractors.",
  },
  {
    label: "Telecommunication",
    href: "/industries/telecommunication",
    description:
      "We're a team of experts who can handle any type of project, however big or small. We work with companies in the telecommunications industry and all other sectors.",
  },
  {
    label: "Media and Entertainment",
    href: "/industries/media-and-entertainment",
    description:
      "Our experts have experience working on media software systems, such as content management systems (CMS), digital asset management (DAM) solutions, and video streaming platforms.",
  },
];

export const ecommerceGroup: NavGroup = {
  label: "Ecommerce",
  href: "/ecommerce",
  description: "Integration, design, and apps for the future of online shopping.",
  items: [
    { label: "E-commerce Integration Service", href: "/ecommerce/ecommerce-integration-service" },
    { label: "E-commerce Design", href: "/ecommerce/ecommerce-design" },
    { label: "E-commerce App Development", href: "/ecommerce/ecommerce-app-development" },
  ],
};

export const productLinks: NavLink[] = [
  { label: "Voxora", href: "https://voxora.fixelcloud.com/", external: true },
  { label: "FinHub", href: "/finhub" },
  { label: "SalesPortal", href: "/salesportal" },
];

export const mainNav = [
  { label: "Services", href: "/services", kind: "services" as const },
  { label: "Industries", href: "/industries", kind: "industries" as const },
  { label: "About Us", href: "/about-us", kind: "link" as const },
  { label: "Insights", href: "/blog", kind: "link" as const },
  { label: "Contacts", href: "/contacts", kind: "link" as const },
  { label: "Our Products", href: "/finhub", kind: "products" as const },
];

export const serviceIcons: Record<string, FlaticonName> = {
  "/services": "code",
  "/cooperative-staff-model": "report-1",
  "/social-media-marketing": "app",
  "/generative-ai-and-data": "best",
  "/design-ideation": "monitor",
  "/enterprise-solutions": "browser",
};

export const reasons: { title: string; text: string; icon: FlaticonName }[] = [
  {
    title: "Experience",
    icon: "medal",
    text: "Our team of skilled designers, engineers, and strategists bring years of expertise to deliver innovative and high-quality designs.",
  },
  {
    title: "Collaboration",
    icon: "gear",
    text: "We believe in open communication and close collaboration with our clients to ensure the final product meets your vision and business goals.",
  },
  {
    title: "Quality and Consistency",
    icon: "idea",
    text: "We focus on high-quality, consistent designs that reflect your brand and resonate with your target audience.",
  },
  {
    title: "Unique Design",
    icon: "edit-tools",
    text: "From concept to final design, we offer a comprehensive range of services, including research, prototyping, user testing, and implementation.",
  },
];

export function findGroup(pathname: string): NavGroup | undefined {
  return [...serviceGroups, ecommerceGroup].find(
    (group) => group.href === pathname || group.items.some((item) => item.href === pathname),
  );
}
