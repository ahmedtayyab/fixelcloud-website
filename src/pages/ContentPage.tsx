import { Link, useLocation } from "react-router-dom";
import content from "../data/content.json";
import { pageMedia } from "../config/media";
import { findGroup } from "../data/navigation";
import type { CmsData } from "../types/content";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { ContentSections } from "../components/sections/ContentSections";
import { WorkCarousel } from "../components/sections/WorkCarousel";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";
import { parseContent } from "../utils/parseContent";
import { preparePageBlocks } from "../utils/productCopy";

const pages = (content as CmsData).pages;

export function ContentPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/|\/$/g, "");
  const page = pages[slug];
  const group = findGroup(`/${slug}`);
  const isHub = Boolean(group && group.href === `/${slug}`);
  const parsed = page
    ? parseContent(preparePageBlocks(slug, page.blocks), {
        stopAt: slug === "privacy-policy" ? "Search Search" : undefined,
        widgets: true,
      })
    : null;
  const media = pageMedia(slug);

  usePageMeta(parsed?.title ?? group?.label ?? "Page not found", parsed?.summary ?? group?.description);

  if (!page && !isHub) {
    return (
      <Container className="py-24 md:py-section-lg">
        <h1 className="heading-section">Page not found</h1>
        <p className="mt-3">That address is not part of this site.</p>
        <Button href="/" variant="secondary" className="mt-6">
          Back home
        </Button>
      </Container>
    );
  }

  const title = parsed?.title || group?.label || "Fixelcloud";
  const summary = parsed?.summary || group?.description;

  return (
    <>
      <PageHero title={title} summary={summary} />
      {isHub && group ? (
        <section>
          <Container className="py-16 md:py-section">
            <SectionTitle eyebrow={`// ${group.label}`} title="Explore our services" />
            <ul className="mt-10 grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, index) => (
                <li key={item.href}>
                  <Link
                    className="group flex h-full items-start gap-4 border border-line p-7 transition-colors hover:border-brand"
                    to={item.href}
                  >
                    <span className="font-display text-xl font-semibold text-ink">{String(index + 1).padStart(2, "0")}.</span>
                    <span className="heading-card group-hover:text-brand">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      {parsed && parsed.blocks.length > 0 ? (
        <ContentSections blocks={parsed.blocks} media={media} />
      ) : (
        <>
          {media.projects ? <WorkCarousel eyebrow="// Latest case studies" title="Introduce Our Projects" /> : null}
          <ConsultationBand />
        </>
      )}
    </>
  );
}
