import { site } from "../config/site";
import { InquiryForm } from "../components/sections/InquiryForm";
import { OfficeMap } from "../components/sections/OfficeMap";
import { Container } from "../components/ui/Container";
import { Flaticon, type FlaticonName } from "../components/ui/Icons";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

const details: { icon: FlaticonName; label: string; value: string; href?: string }[] = [
  { icon: "globe", label: "Our Address:", value: site.address },
  { icon: "envelope", label: "Our Mailbox:", value: site.email, href: `mailto:${site.email}` },
  { icon: "phone", label: "Our Phone:", value: site.phones[1].label, href: site.phones[1].href },
];

export function ContactPage() {
  usePageMeta("Contacts", "Call, email, or write to Fixelcloud. We answer enquiries within 24 hours on business days.");

  return (
    <>
      <section>
        <Container className="grid items-center gap-12 py-16 md:py-section lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h1 className="sr-only">Contacts</h1>
            <SectionTitle eyebrow="// Contact details" title="Contact us" />
            <p className="mt-4 max-w-[460px]">
              Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.
              We will be happy to answer your questions. Contact us now.
            </p>
            <ul className="mt-10 space-y-8">
              {details.map((item) => (
                <li key={item.label} className="flex items-start gap-5">
                  <Flaticon name={item.icon} className="mt-1 text-[28px] text-brand" />
                  <div>
                    <p className="font-display text-base font-bold text-ink">{item.label}</p>
                    {item.href ? (
                      <a className="transition-colors hover:text-brand" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <InquiryForm intent="contact" />
        </Container>
      </section>
      <OfficeMap />
    </>
  );
}
