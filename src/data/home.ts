import type { FlaticonName } from "../components/ui/Icons";

/* Listed in visual reading order of the original three-column grid. */
export const homeServices: { title: string; href: string; text: string; icon: FlaticonName }[] = [
  {
    title: "Social Media Management",
    href: "/social-media-marketing/social-media-management",
    icon: "browser",
    text: "Turn to our experts to perform comprehensive, multi-stage testing and auditing of your software.",
  },
  {
    title: "Web Development",
    href: "/services/website-development",
    icon: "code",
    text: "We carry more than just good coding skills. Our experience makes us stand out from other web development.",
  },
  {
    title: "Mobile Development",
    href: "/services/mobile-development",
    icon: "app",
    text: "Create complex enterprise software, ensure reliable software integration, modernise your legacy system.",
  },
  {
    title: "Cloud Strategy",
    href: "/services/cloud-strategy",
    icon: "report-1",
    text: "Streamline your cloud operations with our end-to-end management. We handle from deployment to security.",
  },
  {
    title: "UI/UX Design",
    href: "/design-ideation/ui-ux-design",
    icon: "monitor",
    text: "Build the product you need on time with an experienced team that uses a clear and effective design process.",
  },
  {
    title: "Quality Assurance",
    href: "/enterprise-solutions/quality-assurance",
    icon: "best",
    text: "Over the past decade, our customers succeeded by leveraging Intellectsoft’s process of building, motivating.",
  },
];

export const stats = [
  { value: 330, suffix: "+", label: "Active Clients" },
  { value: 850, suffix: "+", label: "Projects Done" },
  { value: 25, suffix: "+", label: "Team Advisors" },
];

export const aboutStats = [...stats, { value: 10, suffix: "+", label: "Glorious Years" }];

export const aboutSkills = [
  { label: "Mobile development", value: 60 },
  { label: "Web development", value: 80 },
  { label: "UI/UX design", value: 90 },
];

export const teamMembers = [
  { name: "David Ferry", role: "Co-Founder of company" },
  { name: "Marry Tonheim", role: "Chief Marketing Officer" },
  { name: "Christina Torres", role: "Co-Founder of company" },
  { name: "Anna Richmond", role: "President & CEO" },
  { name: "Amalia Bruno", role: "CTO of company" },
  { name: "Andrew Kinzer", role: "Chief Information Officer" },
  { name: "Robert Cooper", role: "CEO of company" },
  { name: "Katie Doyle", role: "Chief Strategy Officer" },
];

const quality =
  "Google has said for years that the most important single factor to them is high quality content. Now more than ever, they have the ability.";
const growth =
  "We help ambitious businesses like yours generate more profits by building awareness, driving web traffic, connecting with customers, and growing overall sales. Give us a call.";

export const faqs = [
  { question: "How To Choose A Good QA Consultant?", answer: quality },
  { question: "How to Create a Chatbot to Fit Your Needs?", answer: growth },
  { question: "What is off page SEO link building?", answer: quality },
  { question: "How can I order web design for my website?", answer: quality },
  { question: "Best SEO Practices for Page Layouts", answer: quality },
  { question: "How Does Off Site SEO Work?", answer: quality },
  { question: "Why is SEO Link Building Important?", answer: growth },
  { question: "Why is Researching Keywords Important?", answer: quality },
  { question: "Best SEO Practices for Page Layouts", answer: quality },
  { question: "Best SEO Practices for High Quality Content", answer: quality },
];
