import type { ReactNode } from "react";
import type { MediaImage, PageMedia } from "../../config/media";
import { headingKey, toSections, type ContentNode, type ContentSection, type TitledText } from "../../utils/parseContent";
import { Container } from "../ui/Container";
import type { FlaticonName } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";
import { ConsultationBand } from "./ConsultationBand";
import { ContentBody } from "./ContentBody";
import { CtaBand } from "./CtaBand";
import { ReasonsSection } from "./ReasonsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WorkCarousel } from "./WorkCarousel";

/* The original "Why Choosing Us?" icon boxes always use these four glyphs, in this order. */
const WHY_ICONS: FlaticonName[] = ["medal", "gear", "idea", "edit-tools"];

function Picture({ image, className = "" }: { image: MediaImage; className?: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      className={`h-auto w-full ${className}`}
      style={{ maxWidth: image.width }}
    />
  );
}

function Title({ section, align = "left", light = false }: { section: ContentSection; align?: "left" | "center"; light?: boolean }) {
  if (!section.heading) return null;
  return (
    <SectionTitle
      eyebrow={section.heading.eyebrow}
      title={section.heading.text}
      align={align}
      light={light}
      className="mb-6 md:mb-8"
    />
  );
}

/* Dark band with the text on the left and the photo filling the right half, as on the "production process" sections. */
function ImageBand({ section, image }: { section: ContentSection; image: MediaImage }) {
  return (
    <section className="grid bg-black text-white/85 lg:grid-cols-2">
      <div className="px-5 py-16 md:py-section lg:pr-[70px] lg:pl-[max(20px,calc((100vw-1186px)/2))]">
        <Title section={section} light />
        <ContentBody blocks={section.nodes} compact light />
      </div>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="h-full min-h-[320px] w-full object-cover" />
    </section>
  );
}

/** Square diagrams sit in their own column on the original site. Wide photos sit beside the copy. */
function isIllustration(image: MediaImage) {
  const ratio = image.width / image.height;
  return ratio >= 0.8 && ratio <= 1.2 && image.width <= 800;
}

/* Product mockups, including the tall smartwatch, sit between the step columns. */
function isDiagram(image: MediaImage) {
  const ratio = image.width / image.height;
  return image.width <= 800 && ratio >= 0.45 && ratio <= 1.25;
}

function FeatureColumn({ items, start, numbered }: { items: TitledText[]; start: number; numbered: boolean }) {
  return (
    <ol className="space-y-8">
      {items.map((item, index) => (
        <li key={start + index}>
          {numbered ? (
            <span className="font-display text-[28px] leading-none font-extrabold text-brand">
              {item.number ?? String(start + index + 1).padStart(2, "0")}.
            </span>
          ) : null}
          <h3 className="heading-card mt-2">{item.title}</h3>
          <p className="mt-2 text-base leading-8">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* Benefits with a square diagram: text, centred illustration, text. Stacks on small screens. */
function CenteredFeatures({
  section,
  image,
  items,
  numbered,
}: {
  section: ContentSection;
  image: MediaImage;
  items: TitledText[];
  numbered: boolean;
}) {
  const mid = Math.ceil(items.length / 2);
  return (
    <section>
      <Container className="py-12 md:py-16">
        <Title section={section} align="center" />
        <figure className="mx-auto mb-10 flex max-w-[380px] justify-center lg:hidden">
          <Picture image={image} />
        </figure>
        <div className="lg:hidden">
          <FeatureColumn items={items} start={0} numbered={numbered} />
        </div>
        <div className="hidden items-center gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-14">
          <FeatureColumn items={items.slice(0, mid)} start={0} numbered={numbered} />
          <figure className="flex justify-center" style={{ width: Math.min(image.width, 380) }}>
            <Picture image={image} />
          </figure>
          <FeatureColumn items={items.slice(mid)} start={mid} numbered={numbered} />
        </div>
      </Container>
    </section>
  );
}

/* Several photos that share one section sit in the column beside the copy, as the product shots do. */
function BesideImages({ section, images }: { section: ContentSection; images: MediaImage[] }) {
  const columns = images.length >= 3 ? "grid-cols-2" : "grid-cols-1";
  return (
    <section>
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <Title section={section} />
          <ContentBody blocks={section.nodes} compact />
        </div>
        <ul className={`grid gap-4 ${columns}`}>
          {images.map((image, index) => (
            <li key={index} className="flex items-center justify-center">
              <Picture image={image} className="object-contain" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function SplitSection({ section, image, imageFirst }: { section: ContentSection; image: MediaImage; imageFirst: boolean }) {
  return (
    <section>
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
        <Reveal className={`flex justify-center ${imageFirst ? "" : "lg:order-last"}`}>
          <Picture image={image} className={isIllustration(image) ? "max-w-[420px] object-contain" : "max-h-[420px] object-contain lg:max-h-none"} />
        </Reveal>
        <div>
          <Title section={section} />
          <ContentBody blocks={section.nodes} compact />
        </div>
      </Container>
    </section>
  );
}

/* Intro text and button on the left, the accordion on the right ("What we offer" sections). */
function AccordionSection({ section }: { section: ContentSection }) {
  const accordion = section.nodes.filter((node) => node.type === "accordion");
  const rest = section.nodes.filter((node) => node.type !== "accordion");
  return (
    <section>
      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <Title section={section} />
          <ContentBody blocks={rest} compact />
        </div>
        <ContentBody blocks={accordion} compact />
      </Container>
    </section>
  );
}

function LogoGrid({ logos }: { logos: MediaImage[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
      {logos.map((logo, index) => (
        <li key={index}>
          <img
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading="lazy"
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
        </li>
      ))}
    </ul>
  );
}

function PlainSection({ section, images = [] }: { section: ContentSection; images?: MediaImage[] }) {
  const hasPlans = section.nodes.some((node) => node.type === "plans");
  const hasSteps = section.nodes.some((node) => node.type === "steps");
  const text = section.nodes.reduce((sum, node) => sum + ("text" in node && typeof node.text === "string" ? node.text.length : 0), 0);
  const padding = hasPlans ? "py-16 md:py-section" : hasSteps || text >= 400 ? "py-12 md:py-16" : "py-8 md:py-10";
  if (!images.length && section.nodes.length > 1 && section.nodes.some((node) => node.type === "accordion")) {
    return <AccordionSection section={section} />;
  }
  return (
    <section className={hasPlans ? "bg-canvas" : ""}>
      <Container className={padding}>
        <Reveal>
        <Title section={section} align={hasPlans ? "center" : "left"} />
        <ContentBody blocks={section.nodes} centered={hasPlans} />
        </Reveal>
        {images.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => (
              <li key={index} className="flex items-center justify-center bg-canvas">
                <Picture image={image} />
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}

const firstParagraph = (nodes: ContentNode[]) =>
  nodes.find((node): node is Extract<ContentNode, { type: "paragraph" }> => node.type === "paragraph")?.text;

/* A heading plus a sentence should not each become their own 90px band. */
function isSparse(section: ContentSection, images: MediaImage[], hasBackground: boolean) {
  if (hasBackground || images.length || !section.heading) return false;
  if (section.nodes.some((node) => node.type !== "paragraph" && node.type !== "action" && node.type !== "heading")) return false;
  const text = section.nodes.reduce((sum, node) => sum + (node.type === "paragraph" ? node.text.length : 0), 0);
  return text < 320;
}

function StackedCopy({ sections }: { sections: ContentSection[] }) {
  return (
    <section>
      <Container className="grid gap-8 py-12 md:gap-10 md:py-16">
        {sections.map((section, index) => (
          <div key={`${section.heading?.text ?? "section"}-${index}`}>
            <Title section={section} />
            <ContentBody blocks={section.nodes} compact />
          </div>
        ))}
      </Container>
    </section>
  );
}

/*
  Lays out parsed CMS content the way the original service pages do: each section keeps the
  image it was published with, and the shared closing bands (testimonials, case studies and the
  page's call to action) render as their own components after the page-specific content.
*/
export function ContentSections({ blocks, media = {} }: { blocks: ContentNode[]; media?: PageMedia }) {
  const sections = toSections(blocks);
  const body: ReactNode[] = [];
  const closing: ReactNode[] = [];
  let hasProjects = false;
  let hasCta = false;
  let logosPlaced = false;
  let splitPlaced = false;
  const orphan =
    media.gallery?.length === 1 && media.gallery[0].width / media.gallery[0].height <= 2.5 ? media.gallery[0] : undefined;
  let orphanPlaced = false;
  const sparse: ContentSection[] = [];
  const flushSparse = () => {
    if (!sparse.length) return;
    const group = sparse.splice(0);
    body.push(<StackedCopy key={`stack-${body.length}`} sections={group} />);
  };

  sections.forEach((section, index) => {
    const key = section.heading ? headingKey(section.heading.text) : "";
    const attached = key ? (media.sections ?? []).filter((item) => headingKey(item.heading) === key) : [];
    const background = attached.find((item) => item.kind === "background")?.image;
    const images = attached.filter((item) => item.kind === "image").map((item) => item.image);
    const quotes = section.nodes.find((node) => node.type === "quotes");
    const features = section.nodes.length === 1 && section.nodes[0].type === "features" ? section.nodes[0] : null;

    const reserved =
      key.startsWith("wearetrusted") ||
      key === "introduceourprojects" ||
      key === "needaconsultation" ||
      key.startsWith("whychoos") ||
      /tools|technolog/.test(key);
    if (!reserved && isSparse(section, images, Boolean(background))) {
      sparse.push(section);
      return;
    }
    flushSparse();

    if (key.startsWith("wearetrusted")) {
      closing.push(
        <TestimonialsSection key={index} eyebrow={section.heading?.eyebrow} quotes={quotes?.type === "quotes" ? quotes.items : undefined} />,
      );
      return;
    }
    if (key === "introduceourprojects") {
      hasProjects = true;
      const projectAction = section.nodes.find(
        (node) => node.type === "action" && node.label.toLowerCase() === "view all projects",
      );
      closing.push(
        <WorkCarousel
          key={index}
          eyebrow={section.heading?.eyebrow}
          title={section.heading?.text ?? ""}
          action={projectAction?.type === "action" ? { label: "View all projects", href: projectAction.href } : undefined}
        />,
      );
      return;
    }
    if (key === "needaconsultation") {
      hasCta = true;
      closing.push(<ConsultationBand key={index} />);
      return;
    }
    if (background && section.heading) {
      hasCta = true;
      closing.push(<CtaBand key={index} title={section.heading.text} text={firstParagraph(section.nodes)} image={background.src} />);
      return;
    }
    if (features && key.startsWith("whychoos")) {
      body.push(
        <ReasonsSection
          key={index}
          title={section.heading?.text}
          items={features.items.map((item, position) => ({ ...item, icon: WHY_ICONS[position % WHY_ICONS.length] }))}
        />,
      );
      return;
    }
    const featureNode = section.nodes.find((node) => node.type === "features");
    const hasProse = section.nodes.some(
      (node) => node.type === "paragraph" || node.type === "tabs" || node.type === "accordion" || node.type === "plans",
    );
    const place = attached.find((item) => item.kind === "image")?.place;
    if (images.length === 1 && place === "full") {
      splitPlaced = true;
      body.push(<SplitSection key={index} section={section} image={images[0]} imageFirst />);
      return;
    }
    if (images.length > 1) {
      body.push(<BesideImages key={index} section={section} images={images} />);
      return;
    }
    if (images.length === 1 && (place === "left" || place === "right")) {
      splitPlaced = true;
      body.push(<SplitSection key={index} section={section} image={images[0]} imageFirst={place === "left"} />);
      return;
    }
    if (images.length === 1 && featureNode?.type === "features" && !hasProse && (place === "center" || isDiagram(images[0])) && !key.startsWith("whychoos")) {
      body.push(
        <CenteredFeatures
          key={index}
          section={section}
          image={images[0]}
          items={featureNode.items}
          numbered={featureNode.numbered}
        />,
      );
      return;
    }
    if (images.length === 1 && /technology index/i.test(section.heading?.eyebrow ?? "")) {
      body.push(<ImageBand key={index} section={section} image={images[0]} />);
      return;
    }
    if (images.length === 1) {
      const imageFirst = !splitPlaced;
      splitPlaced = true;
      body.push(<SplitSection key={index} section={section} image={images[0]} imageFirst={imageFirst} />);
      return;
    }
    if (!section.nodes.length && media.logos?.length && !logosPlaced && /tools|technolog/.test(key)) {
      logosPlaced = true;
      body.push(
        <section key={index} className="bg-canvas">
          <Container className="py-16 md:py-section">
            <Title section={section} />
            <LogoGrid logos={media.logos} />
          </Container>
        </section>,
      );
      return;
    }
    if (orphan && !orphanPlaced && !images.length && section.heading && section.nodes.length) {
      orphanPlaced = true;
      body.push(<SplitSection key={index} section={section} image={orphan} imageFirst={false} />);
      return;
    }
    body.push(<PlainSection key={index} section={section} images={images} />);
  });
  flushSparse();

  if (!hasProjects && media.projects) {
    closing.push(<WorkCarousel key="projects" eyebrow="// Latest case studies" title="Introduce Our Projects" />);
  }
  if (!hasCta) closing.push(<ConsultationBand key="consultation" />);

  return (
    <>
      {body}

      {media.logos?.length && !logosPlaced ? (
        <section className="bg-canvas" aria-label="Tools and technologies">
          <Container className="py-12 [&>ul]:justify-center">
            <LogoGrid logos={media.logos} />
          </Container>
        </section>
      ) : null}

      {media.gallery?.length === 1 && media.gallery[0].width / media.gallery[0].height > 2.5 ? (
        <section aria-label="Gallery">
          <Container className="flex justify-center py-12 md:py-16">
            <img
              src={media.gallery[0].src}
              alt={media.gallery[0].alt}
              width={media.gallery[0].width}
              height={media.gallery[0].height}
              loading="lazy"
              className="h-auto w-full"
              style={{ maxWidth: media.gallery[0].width }}
            />
          </Container>
        </section>
      ) : media.gallery && media.gallery.length > 1 ? (
        <section aria-label="Gallery">
          <Container className="py-16 md:py-section">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {media.gallery.map((image, index) => (
                <li key={index} className="overflow-hidden bg-canvas">
                  <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="h-auto w-full transition-transform duration-500 hover:scale-[1.03]" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {closing}
    </>
  );
}
