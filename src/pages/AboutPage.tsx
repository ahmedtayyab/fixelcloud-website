import { Link } from "react-router-dom";
import { media } from "../config/site";
import { aboutSkills, aboutStats, stats } from "../data/home";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { PartnerStrip } from "../components/sections/PartnerStrip";
import { Container } from "../components/ui/Container";
import { CountUp } from "../components/ui/CountUp";
import { ArrowIcon, Flaticon, type FlaticonName } from "../components/ui/Icons";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

const technologies: { icon: FlaticonName; label: string }[] = [
  { icon: "php", label: "PHP" },
  { icon: "electron", label: "Electron" },
  { icon: "java", label: "Java" },
  { icon: "css", label: "CSS" },
];

export function AboutPage() {
  usePageMeta("About Us", "Fixelcloud is a digital innovation team building web, mobile, cloud, and transformation programs.");

  return (
    <>
      <PageHero
        title="About us"
        image={media.linesBanner}
        summary={
          <p>
            We are a team of passionate and digital innovation dedicated to helping businesses thrive in an
            ever-evolving technological landscape. We specialize in providing end-to-end solutions in{" "}
            <strong>web development</strong>, <strong>mobile app development</strong>, <strong>cloud strategies</strong>,
            and <strong>digital transformation</strong>.
          </p>
        }
      />

      <section>
        <Container className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle eyebrow="// Technology" title={"Improve and Innovate\nwith the Tech Trends"} />
            <p className="mt-5 max-w-[500px] text-ink">
              At Fixelcloud, we empower your business to thrive by integrating technology solutions. Our expertise in
              app development, cloud strategies, and digital innovation ensures that your business stays competitive and
              adaptable in a rapidly changing digital landscape.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[36px] leading-none font-extrabold text-brand">
                    <CountUp value={stat.value} />
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:gap-7">
            {media.aboutTiles.map((src, index) => (
              <li key={src}>
                <Reveal delay={index * 0.06}>
                  <img src={src} alt="Fixelcloud team at work" width={730} height={730} className="aspect-square w-full object-cover" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PartnerStrip />

      <section className="bg-black text-white">
        <Container className="grid items-center gap-10 py-16 md:py-section lg:grid-cols-2 lg:gap-14">
          <img
            src={media.aboutTeam}
            alt="Fixelcloud team working together"
            width={1024}
            height={683}
            loading="lazy"
            className="aspect-[3/2] w-full object-cover"
          />
          <div>
            <p className="eyebrow text-brand">// Experience. Execution. Excellence.</p>
            <h2 className="heading-section mt-3 text-white">What We Actually Do</h2>
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Technologies">
              {technologies.map((tech) => (
                <li
                  key={tech.label}
                  className="flex h-14 w-14 items-center justify-center border border-white/25 text-brand sm:h-[70px] sm:w-[70px]"
                  title={tech.label}
                >
                  <Flaticon name={tech.icon} className="text-[34px]" />
                  <span className="sr-only">{tech.label}</span>
                </li>
              ))}
            </ul>
            <h3 className="heading-card mt-8 text-white">PHP Website Development Services</h3>
            <p className="mt-4 max-w-[480px] text-white">
              At Fixelcloud, we specialize in delivering high-quality website development solutions to your business
              needs. With a deep understanding of frameworks and best practices, we create dynamic, secure, and scalable
              websites that provide a seamless user experience and drive business growth.
            </p>
            <Link
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-wide text-brand uppercase transition-colors hover:text-white"
              to="/services/website-development"
            >
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              Learn more
            </Link>
          </div>
        </Container>
      </section>

      <div className="grid bg-canvas">
        <div className="col-start-1 row-start-1 h-14 self-start bg-black" aria-hidden="true" />
        <Container className="col-start-1 row-start-1">
          <dl className="grid grid-cols-2 gap-y-8 bg-gradient-to-r from-brand-dark to-topbar px-6 py-12 text-white md:grid-cols-4 md:px-12">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center text-center">
                <dt className="mt-2 flex items-center gap-2 text-xs font-bold uppercase">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white" />
                  {stat.label}
                </dt>
                <dd className="font-display text-[42px] leading-none font-extrabold">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      <section className="bg-canvas">
        <Container className="py-16 md:py-section">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle eyebrow="// Technology" title={"Improve and Innovate\nwith the Tech Trends"} />
              <p className="mt-5 max-w-[500px]">
                At Fixelcloud, we believe in the power of technology to transform businesses, and we’re here to make that
                transformation a reality. Let’s work together to create digital solutions that inspire and elevate your
                business.
              </p>
              <ul className="mt-8 max-w-[500px] space-y-6">
                {aboutSkills.map((skill) => (
                  <li key={skill.label}>
                    <div className="flex justify-between text-xs font-bold text-ink uppercase">
                      <span>{skill.label}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-line" role="presentation">
                      <div className="h-full bg-brand" style={{ width: `${skill.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={media.brandMark}
              alt=""
              aria-hidden="true"
              width={1138}
              height={1536}
              loading="lazy"
              className="mx-auto hidden w-full max-w-[300px] lg:block"
            />
          </div>
        </Container>
      </section>

      <ConsultationBand />
    </>
  );
}
