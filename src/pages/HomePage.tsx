import { Link } from "react-router-dom";
import { media, site } from "../config/site";
import { homeServices, stats } from "../data/home";
import { ConsultationBand } from "../components/sections/ConsultationBand";
import { PartnerStrip } from "../components/sections/PartnerStrip";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { WorkCarousel } from "../components/sections/WorkCarousel";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { CountUp } from "../components/ui/CountUp";
import { Flaticon } from "../components/ui/Icons";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
  usePageMeta(
    site.title,
    "At Fixelcloud, we build scalable cloud solutions, custom software, and powerful apps that drive business growth.",
  );

  return (
    <>
      <section
        className="bg-night bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${media.hero})` }}
      >
        <Container className="py-28 md:pt-[220px] md:pb-[205px]">
          <p className="text-lg leading-[37px] font-medium md:text-xl">// For Over 15 Years. For Millions of Users</p>
          <h1 className="heading-display mt-3 text-white">
            Powerful
            <br />
            Digital Solutions
          </h1>
          <p className="mt-5 max-w-[560px]">
            At Fixelcloud, we build scalable cloud solutions, custom software, and powerful apps that drive business
            growth and innovation. With scalable and digital solutions.
          </p>
          <Button href="/services" className="mt-8">
            Explore us
          </Button>
        </Container>
      </section>

      <section className="bg-mist">
        <Container className="grid gap-6 pt-16 pb-14 md:pt-section lg:grid-cols-2 lg:gap-16">
          <SectionTitle eyebrow="// We transform businesses" title={"For Over 15 Years.\nFor Millions of Users"} />
          <p className="lg:pt-8">
            We develop reliable, scalable software solutions for any OS, browser, or device. As a trusted{" "}
            <strong className="font-bold text-ink">cloud management service provider</strong>, we combine deep industry
            expertise with the latest IT advancements to deliver custom digital products that align with your users’
            needs and behaviors. Our scalable cloud and software solutions ensure flexibility, performance, and
            long-term success.
          </p>
        </Container>
      </section>

      <PartnerStrip />

      <section>
        <Container className="py-16 md:py-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="// our service" title={"We Offer a Wide\nVariety of IT Services"} />
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </div>
          <ul className="mt-10 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((service, index) => (
              <li key={service.href}>
                <Reveal delay={(index % 3) * 0.06} className="h-full">
                  <Link className="lift group block h-full border border-line bg-white px-6 py-10 text-center md:px-10" to={service.href}>
                    <Flaticon
                      name={service.icon}
                      className="text-[50px] text-black transition-colors duration-200 group-hover:text-brand"
                    />
                    <h3 className="heading-card mt-[30px] text-black transition-colors group-hover:text-brand">
                      {service.title}
                    </h3>
                    <p className="mt-3">{service.text}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-black text-white">
        <Container className="grid items-center gap-12 py-20 md:py-section-lg lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="// Technology" title={"Improve and Innovate\nwith the Tech Trends"} light />
            <p className="mt-5 max-w-[480px] text-white">
              At Fixelcloud, we empower your business to thrive by integrating technology solutions. Our expertise in
              app development, cloud strategies, and digital innovation ensures that your business stays competitive and
              adaptable in a rapidly changing digital landscape.
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 font-bold text-white">{stat.label}</dt>
                  <dd className="font-display text-[42px] leading-none font-extrabold text-brand">
                    <CountUp value={stat.value} />
                    <span className="ml-1 text-[30px] align-top">{stat.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="mx-auto grid grid-cols-2 gap-x-16 gap-y-8 sm:gap-x-[135px]">
            {media.stack.map((item) => (
              <li key={item.name}>
                <img src={item.src} alt={item.name} width={150} height={150} loading="lazy" className="h-28 w-28 sm:h-[150px] sm:w-[150px]" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WorkCarousel title={"Transforming Ideas into\nExceptional Digital Experiences"} />

      <TestimonialsSection />

      <ConsultationBand />
    </>
  );
}
