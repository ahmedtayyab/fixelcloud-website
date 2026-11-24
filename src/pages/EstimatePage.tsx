import { InquiryForm } from "../components/sections/InquiryForm";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

export function EstimatePage() {
  usePageMeta("Estimate a project", "Tell Fixelcloud about a project and request an estimate.");

  return (
    <>
      <PageHero title="Estimate Project" />
      <section>
        <Container className="grid gap-12 py-16 md:py-section lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionTitle eyebrow="// Free quote" title="Estimate Project" />
            <p className="mt-4 max-w-[440px]">
              Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.
              We will be happy to answer your questions.
            </p>
          </div>
          <InquiryForm intent="estimate" />
        </Container>
      </section>
    </>
  );
}
