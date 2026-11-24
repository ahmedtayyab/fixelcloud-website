import { Link } from "react-router-dom";
import { media } from "../config/site";
import { ecommerceGroup, industryLinks } from "../data/navigation";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { ReasonsSection } from "../components/sections/ReasonsSection";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

const ecommerceCards = [
  {
    ...ecommerceGroup.items[0],
    label: "E-commerce Integration Services",
    text: "We connect your website, payment systems, and inventory management tools to provide a unified experience.",
    image: media.ecommerce[0],
  },
  {
    ...ecommerceGroup.items[2],
    label: "Ecommerce App Development",
    text: "We create feature-rich apps for your brand, offering seamless shopping experiences on all devices.",
    image: media.ecommerce[1],
  },
  {
    ...ecommerceGroup.items[1],
    label: "Custom Ecommerce Design",
    text: "We create visually stunning, user-centric designs for your brand identity, ensuring seamless navigation.",
    image: media.ecommerce[2],
  },
];

export function IndustriesPage() {
  usePageMeta("Industries", "Fixelcloud supports retail, healthcare, education, fintech, telecom, media, and ecommerce teams.");

  return (
    <>
      <PageHero title="Industries" summary="No matter your industry, Fixelcloud has helped businesses like yours with IT solutions." />
      <section>
        <Container className="py-16 md:py-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="// Our industries" title={"We Offer a Wide\nVariety of Industries"} />
            <Button href="/estimate">Free quote</Button>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {industryLinks.map((industry, index) => (
              <li key={industry.href} className="min-w-0">
                <Reveal delay={(index % 3) * 0.06} className="h-full">
                  <article className="lift flex h-full min-w-0 gap-4 border border-line bg-white p-5 sm:p-7">
                  <span className="w-12 shrink-0 font-display text-[28px] leading-8 font-extrabold text-brand">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <div className="min-w-0">
                    <h2 className="heading-card">
                      <Link className="transition-colors hover:text-brand" to={industry.href}>
                        {industry.label}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-8">{industry.description}</p>
                  </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-canvas">
        <Container className="py-16 md:py-section">
          <SectionTitle title={"Ecommerce The Future of\nOnline Shopping"} />
          <ul className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {ecommerceCards.map((card) => (
              <li key={card.href}>
                <Link className="group grid grid-rows-[auto_40px_auto] transition-transform duration-200 active:scale-[0.99]" to={card.href}>
                  <div className="col-start-1 row-span-2 row-start-1 overflow-hidden">
                    <img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="relative col-start-1 row-span-2 row-start-2 mx-3 bg-white px-6 py-5 text-base leading-6 font-bold text-ink shadow-card transition-colors group-hover:text-brand">
                    {card.label}
                    <span className="mt-2 block text-sm leading-6 font-normal text-muted">{card.text}</span>
                  </h3>
                </Link>
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
