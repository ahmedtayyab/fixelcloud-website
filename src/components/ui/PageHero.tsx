import type { ReactNode } from "react";
import { media } from "../../config/site";
import { Container } from "./Container";

/* Interior page header: dark brand artwork, sentence-case title, white intro text. */
export function PageHero({
  title,
  summary,
  image = media.pageHeader,
  children,
}: {
  title: string;
  summary?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="bg-night bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Container className="py-14 md:py-20">
        <h1 className="heading-section max-w-4xl text-white">{title}</h1>
        {summary ? <div className="mt-5 max-w-[1110px] text-base leading-8 font-medium text-white md:text-lg">{summary}</div> : null}
        {children}
      </Container>
    </section>
  );
}
