import { projects } from "../data/portfolio";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { ProjectCard } from "../components/ui/ProjectCard";
import { usePageMeta } from "../hooks/usePageMeta";

export function PortfolioPage() {
  usePageMeta("Work", "Selected Fixelcloud projects across finance, healthcare, hospitality, and product design.");

  return (
    <>
      <PageHero title="Our Work" summary="Transforming ideas into exceptional digital experiences for clients worldwide." />
      <section className="bg-canvas">
        <Container className="py-16 md:py-section">
          <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ConsultationBand />
    </>
  );
}
