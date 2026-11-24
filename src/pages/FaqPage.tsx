import { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../data/home";
import { Button } from "../components/ui/Button";
import { Collapse } from "../components/ui/Collapse";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

export function FaqPage() {
  const [open, setOpen] = useState(0);
  usePageMeta("FAQs", "Answers to common questions about working with Fixelcloud.");

  return (
    <>
      <PageHero title="FAQs" />
      <section>
        <Container className="py-16 md:py-section">
          <SectionTitle title={"Read Most\nFrequent Questions"} align="center" />
          <div className="mx-auto mt-10 max-w-[870px] space-y-3">
            {faqs.map((item, index) => {
              const expanded = open === index;
              const id = `faq-${index}`;
              return (
                <div key={id} className="border border-line bg-white">
                  <h2>
                    <button
                      className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base leading-6 font-bold transition-colors duration-200 md:text-lg ${expanded ? "bg-canvas text-brand" : "text-ink hover:text-brand"}`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={id}
                      onClick={() => setOpen(expanded ? -1 : index)}
                    >
                      {item.question}
                      <span aria-hidden="true" className={`text-2xl leading-none transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                  </h2>
                  <Collapse open={expanded}>
                    <p id={id} className="px-6 pt-1 pb-6 text-base leading-8">
                      {item.answer}
                    </p>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      <section>
        <Container className="py-16 text-center md:py-section">
          <p className="eyebrow text-brand">// We Carry more Than Just Good Coding Skills</p>
          <h2 className="heading-section mt-3">Let&apos;s Build Your Website!</h2>
          <Button href="/contacts" className="mt-8">
            Contact us
          </Button>
        </Container>
      </section>
      <section className="bg-canvas">
        <Container className="py-16 md:py-section">
          <SectionTitle eyebrow="// support center" title={"Our Support Team\nwill Always Assist You 24/7"} align="center" />
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["01", "For Partners"],
              ["02", "For Customers"],
              ["03", "For Startups"],
            ].map(([number, label]) => (
              <li key={label}>
                <p className="font-display text-[28px] leading-none font-extrabold text-brand">{number}</p>
                <h3 className="heading-card mt-3">{label}</h3>
                <p className="mt-3 text-base leading-8">
                  Entrust full-cycle implementation of your software product to our experienced BAs, UI/UX designers, developers.
                </p>
                <Link className="mt-4 inline-flex text-sm font-bold tracking-wide text-brand uppercase" to="/contacts">
                  Learn more
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
