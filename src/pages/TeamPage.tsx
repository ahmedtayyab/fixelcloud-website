import { media } from "../config/site";
import { teamMembers } from "../data/home";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

const teamQuotes = [
  {
    name: "Moonkle LTD",
    role: "Client of Company",
    quote:
      "Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No shortcuts. Even if the client is being careless. The best part...always solving problems with great original ideas!",
  },
  {
    name: "SoftTech",
    role: "Manager of Company",
    quote:
      "Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No shortcuts. Even if the client is being careless. The best part...always solving problems with great original ideas!",
  },
];

export function TeamPage() {
  usePageMeta("Our team", "Leadership roles published on the Fixelcloud team page.");

  return (
    <>
      <PageHero title="Meet the Team of Innovators!" />
      <section>
        <Container className="py-16 md:py-section">
          <SectionTitle eyebrow="// Our team" title="Our Leadership Team" />
          <p className="mt-4 max-w-xl">
            We help businesses elevate their value through custom software development, product design, QA and
            consultancy services.
          </p>
          <ul className="mt-12 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <li key={member.name}>
                <Reveal delay={(index % 4) * 0.05}>
                  <article className="group">
                  <div className="overflow-hidden">
                    <img
                      src={media.team[index]}
                      alt={member.name}
                      width={720}
                      height={987}
                      loading="lazy"
                      className="aspect-[720/987] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h2 className="heading-card mt-5">{member.name}</h2>
                  <p className="mt-1 text-base">{member.role}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
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
      <TestimonialsSection eyebrow="// our clients" quotes={teamQuotes} />
    </>
  );
}
