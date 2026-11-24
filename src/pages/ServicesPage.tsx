import { Link } from "react-router-dom";
import { serviceGroups, serviceIcons } from "../data/navigation";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { ReasonsSection } from "../components/sections/ReasonsSection";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Flaticon } from "../components/ui/Icons";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

const order = [
  "/cooperative-staff-model",
  "/services",
  "/social-media-marketing",
  "/design-ideation",
  "/generative-ai-and-data",
  "/enterprise-solutions",
];
const cardTitle: Record<string, string> = {
  "/services": "Tech Solution",
  "/design-ideation": "Design and Ideation",
  "/enterprise-solutions": "Maintenance",
};
const cardItems: Record<string, string[]> = {
  "/services": ["Web Development", "Mobile Development", "MERN/MEAN", "Cloud Strategy"],
  "/social-media-marketing": ["Social Media Management", "Social Media Advertising", "Content Marketing"],
  "/design-ideation": ["Product Design", "UI/UX design", "Design Systems", "User Research"],
  "/generative-ai-and-data": ["Artificial Intelligence", "Machine Learning", "Data Engineering"],
};
const groups = order.map((href) => serviceGroups.find((group) => group.href === href)!);

export function ServicesPage() {
  usePageMeta("Services", "Reliable digital, cloud, design, and delivery services from Fixelcloud.");

  return (
    <>
      <PageHero
        title="Services"
        summary="Take your company to new heights by investing in our reliable and efficient solutions. With a wide range of services."
      />
      <section>
        <Container className="py-16 md:py-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="// Our services" title={"We Offer a Wide\nVariety of IT Services"} />
            <Button href="/estimate">Free quote</Button>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, index) => (
              <li key={group.href}>
                <Reveal delay={(index % 3) * 0.06} className="h-full">
                  <article className="lift flex h-full gap-5 border border-line bg-white p-7">
                  <Flaticon name={serviceIcons[group.href]} className="shrink-0 text-[42px] text-black" />
                  <div>
                    <h2 className="heading-card">
                      <Link className="transition-colors hover:text-brand" to={group.href}>
                        {cardTitle[group.href] ?? group.label}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-8">{group.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {(cardItems[group.href] ?? group.items.map((item) => item.label)).map((label) => {
                        const item = group.items.find((entry) => entry.label.toLowerCase().startsWith(label.toLowerCase().slice(0, 6))) ?? group.items.find((entry) => label.toLowerCase().includes(entry.label.toLowerCase().slice(0, 4)));
                        const href = item?.href ?? group.href;
                        return (
                        <li key={label} className="flex items-center gap-3 text-base">
                          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                          <Link className="text-ink transition-colors hover:text-brand" to={href}>
                            {label}
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ReasonsSection />
      <ConsultationBand />
    </>
  );
}
