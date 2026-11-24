import { lazy, type ComponentType } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

function page<K extends string>(loader: () => Promise<Record<K, ComponentType>>, name: K) {
  return lazy(() => loader().then((module) => ({ default: module[name] })));
}

const HomePage = page(() => import("./pages/HomePage"), "HomePage");
const ServicesPage = page(() => import("./pages/ServicesPage"), "ServicesPage");
const IndustriesPage = page(() => import("./pages/IndustriesPage"), "IndustriesPage");
const AboutPage = page(() => import("./pages/AboutPage"), "AboutPage");
const ContactPage = page(() => import("./pages/ContactPage"), "ContactPage");
const EstimatePage = page(() => import("./pages/EstimatePage"), "EstimatePage");
const BlogPage = page(() => import("./pages/BlogPage"), "BlogPage");
const PostPage = page(() => import("./pages/PostPage"), "PostPage");
const PortfolioPage = page(() => import("./pages/PortfolioPage"), "PortfolioPage");
const PortfolioDetailPage = page(() => import("./pages/PortfolioDetailPage"), "PortfolioDetailPage");
const SearchPage = page(() => import("./pages/SearchPage"), "SearchPage");
const FaqPage = page(() => import("./pages/FaqPage"), "FaqPage");
const TeamPage = page(() => import("./pages/TeamPage"), "TeamPage");
const ContentPage = page(() => import("./pages/ContentPage"), "ContentPage");

const aliases = [
  ["/about-us-digital-innovation", "/about-us"],
  ["/web-development", "/services/website-development"],
  ["/website-development", "/services/website-development"],
  ["/mobile-development", "/services/mobile-development"],
  ["/mean-mern-development", "/services/mean-mern-development"],
  ["/cloud-strategy", "/services/cloud-strategy"],
  ["/ui-ux-design", "/design-ideation/ui-ux-design"],
  ["/retail", "/industries/retail"],
  ["/healthcare", "/industries/healthcare"],
  ["/education", "/industries/education"],
  ["/fintech", "/industries/fintech"],
  ["/telecommunication", "/industries/telecommunication"],
  ["/media-and-entertainment", "/industries/media-and-entertainment"],
];

export function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="contacts" element={<ContactPage />} />
          <Route path="estimate" element={<EstimatePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<PostPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="faqs" element={<FaqPage />} />
          <Route path="our-team" element={<TeamPage />} />
          {aliases.map(([from, to]) => (
            <Route key={from} path={from.slice(1)} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<ContentPage />} />
        </Route>
      </Routes>
  );
}
