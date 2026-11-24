import { useParams } from "react-router-dom";
import content from "../data/content.json";
import { pageMedia } from "../config/media";
import { projects } from "../data/portfolio";
import type { CmsData } from "../types/content";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { ContentBody } from "../components/sections/ContentBody";
import { WorkCarousel } from "../components/sections/WorkCarousel";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { parseContent } from "../utils/parseContent";

const pages = (content as CmsData).pages;

export function PortfolioDetailPage() {
  const { slug = "" } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const page = pages[`portfolio/${slug}`];
  const parsed = page ? parseContent(page.blocks, { stopAt: "Related Projects" }) : null;
  const media = pageMedia(`portfolio/${slug}`);

  usePageMeta(project?.title ?? "Project", parsed?.summary);

  if (!project || !parsed) {
    return (
      <Container className="py-24 md:py-section-lg">
        <h1 className="heading-section">Project not found</h1>
        <Button href="/portfolio" variant="tertiary" className="mt-6">
          Back to work
        </Button>
      </Container>
    );
  }

  const lead = media.lead;

  return (
    <>
      <PageHero title={parsed.title || project.title} summary={parsed.summary || project.category} />
      <section>
        <Container className="py-16 md:py-section">
          {lead ? (
            <img src={lead.src} alt={lead.alt || project.imageAlt} width={lead.width} height={lead.height} className="h-auto w-full" />
          ) : (
            <img src={project.image} alt={project.imageAlt} width={720} height={520} className="h-auto w-full" />
          )}
          <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
            <dl className="space-y-5 border-t-2 border-brand pt-6">
              <div>
                <dt className="eyebrow text-ink">Client</dt>
                <dd>{project.title}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink">Category</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>
            <ContentBody blocks={parsed.blocks} compact />
          </div>
          {media.gallery?.length ? (
            <ul className="mt-14 grid gap-7 md:grid-cols-2" aria-label="Project screens">
              {media.gallery.map((image) => (
                <li key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt || `${project.title} screen`}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>
      <WorkCarousel eyebrow="// Our work" title="Related Projects" />
      <ConsultationBand />
    </>
  );
}
