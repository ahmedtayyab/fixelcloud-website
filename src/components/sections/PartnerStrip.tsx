import { media } from "../../config/site";

export function PartnerStrip() {
  const logos = [...media.partners, ...media.partners];
  return (
    <section className="overflow-hidden bg-canvas py-[45px]" aria-label="Clients">
      <ul className="marquee-track flex w-max items-center">
        {logos.map((partner, index) => (
          <li key={`${partner.name}-${index}`} className="px-6 md:px-9" aria-hidden={index >= media.partners.length}>
            <img
              src={partner.src}
              alt={partner.name}
              width={176}
              height={48}
              className="h-auto w-[140px] opacity-70 contrast-0 md:w-[176px]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
