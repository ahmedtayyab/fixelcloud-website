import { Link } from "react-router-dom";
import { media, site } from "../../config/site";
import { Container } from "../ui/Container";
import { SvgIcon } from "../ui/Icons";

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Insight", href: "/blog" },
  { label: "Contact Us", href: "/contacts" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  return (
    <footer
      className="bg-white bg-[length:100%_auto] bg-[position:24px_25px] bg-no-repeat text-base leading-8"
      style={{ backgroundImage: `url(${media.footerMark})` }}
    >
      <Container className="pt-16 pb-10 md:pt-[115px] md:pb-[50px]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-2xl font-semibold text-black">Global Presence</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {site.offices.map((office) => (
                <address key={office.region} className="not-italic">
                  <p className="font-bold text-muted">{office.region}:</p>
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <a className="font-semibold text-ink transition-colors hover:text-brand" href={office.phoneHref}>
                    Tel: {office.phone}
                  </a>
                </address>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap items-center gap-6" aria-label="Certifications and memberships">
              {media.certifications.map((item) => (
                <li key={item.name}>
                  <img src={item.src} alt={item.name} className="h-auto max-h-[89px] w-[75px] object-contain" loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-black">Follow Us</h2>
            <p className="mt-5 max-w-[230px] text-ink">Follow our social media to stay updated about agency.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {site.socials.map((item) => (
                <li key={item.id}>
                  <a
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: item.color }}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <SvgIcon name={item.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 md:mt-20 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-brand" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-ink">Copyright © {new Date().getFullYear()} Fixelcloud. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
