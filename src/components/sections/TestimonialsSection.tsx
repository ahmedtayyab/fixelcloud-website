import { media, site } from "../../config/site";
import type { Quote } from "../../utils/parseContent";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";

/* Client videos by default; service pages that published written quotes show those instead. */
export function TestimonialsSection({
  eyebrow = "// What our clients say",
  quotes,
}: {
  eyebrow?: string;
  quotes?: Quote[];
}) {
  return (
    <section
      className="bg-black bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${media.linesBanner})` }}
    >
      <Container className="py-16 md:py-section">
        <SectionTitle eyebrow={eyebrow} title={"We are Trusted\n15+ Countries Worldwide"} align="center" light />
        {quotes?.length ? (
          <ul className="mx-auto mt-10 grid max-w-[1020px] gap-6 md:grid-cols-2">
            {quotes.map((quote, index) => (
              <li key={index} className="lift bg-white p-8 text-left shadow-[0_12px_0_-4px_rgba(255,255,255,0.85)]">
                <p className="font-display text-lg font-bold text-ink">{quote.name}</p>
                <p className="text-base text-muted">{quote.role}</p>
                <blockquote className="mt-4 text-base leading-8 text-muted">“{quote.quote}”</blockquote>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mx-auto mt-10 grid max-w-[1140px] gap-5 md:grid-cols-3">
            {site.videos.map((video) => (
              <li key={video.id} className="aspect-video bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
