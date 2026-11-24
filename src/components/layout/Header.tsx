import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../../config/site";
import { ecommerceGroup, industryLinks, mainNav, productLinks, serviceMenu } from "../../data/navigation";
import { Collapse } from "../ui/Collapse";
import { Container } from "../ui/Container";
import { Flaticon, SvgIcon } from "../ui/Icons";

const topbarSocials = (["facebook", "linkedin", "instagram", "dribbble"] as const).map(
  (id) => site.socials.find((item) => item.id === id)!,
);
const usPhone = site.phones[1];

function MenuLink({
  href,
  children,
  external,
  onPick,
}: {
  href: string;
  children: string;
  external?: boolean;
  onPick: () => void;
}) {
  const className =
    "block font-sans text-[12px] font-bold uppercase leading-[30px] text-[#777] transition-colors hover:text-brand";
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" onClick={onPick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={href} onClick={onPick}>
      {children}
    </Link>
  );
}

function MenuHeading({
  href,
  children,
  onPick,
  className = "",
}: {
  href: string;
  children: string;
  onPick: () => void;
  className?: string;
}) {
  return (
    <Link
      className={`block font-sans text-[16px] font-medium uppercase leading-normal text-[#101010] transition-colors hover:text-brand ${className}`}
      to={href}
      onClick={onPick}
    >
      {children}
    </Link>
  );
}

function MenuList({
  items,
  onPick,
  className = "mt-[9px]",
}: {
  items: { label: string; href: string; external?: boolean }[];
  onPick: () => void;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <ul className={`${className} space-y-2.5`}>
      {items.map((item) => (
        <li key={item.href}>
          <MenuLink href={item.href} external={item.external} onPick={onPick}>
            {item.label}
          </MenuLink>
        </li>
      ))}
    </ul>
  );
}

function ServicesMenu({ onPick }: { onPick: () => void }) {
  return (
    <Container>
      <div className="grid grid-cols-4 items-start gap-x-8 pt-9 pb-8">
        {serviceMenu.map((column, columnIndex) => (
          <div key={columnIndex} className="min-w-0">
            {column.map((group, groupIndex) => (
              <div key={group.label} className={groupIndex > 0 ? "mt-10" : undefined}>
                <MenuHeading href={group.href} onPick={onPick}>
                  {group.label}
                </MenuHeading>
                <MenuList items={group.items} onPick={onPick} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}

function IndustriesMenu({ onPick }: { onPick: () => void }) {
  return (
    <Container>
      <div className="grid grid-cols-4 items-start gap-x-8 pt-9 pb-8">
        <MenuHeading href="/industries" onPick={onPick}>
          All industries
        </MenuHeading>
        <MenuList items={industryLinks} onPick={onPick} className="mt-0" />
        <div>
          <MenuHeading href={ecommerceGroup.href} onPick={onPick}>
            {ecommerceGroup.label}
          </MenuHeading>
          <MenuList items={ecommerceGroup.items} onPick={onPick} />
        </div>
      </div>
    </Container>
  );
}

function ProductsMenu({ onPick }: { onPick: () => void }) {
  return <MenuList items={productLinks} onPick={onPick} className="mt-0" />;
}

function DesktopItem({
  label,
  href,
  panel,
  panelClass,
}: {
  label: string;
  href: string;
  panel?: (onPick: () => void) => ReactNode;
  panelClass?: string;
}) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hoverRef = useRef(false);
  const open = (hover || focus) && !dismissed;
  const dismiss = () => setDismissed(true);

  return (
    <div
      className={panelClass ? "relative" : "static"}
      onMouseOver={() => {
        hoverRef.current = true;
        setHover(true);
      }}
      onMouseOut={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        hoverRef.current = false;
        setHover(false);
        setDismissed(false);
      }}
      onFocus={() => {
        if (!dismissed) setFocus(true);
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        setFocus(false);
        if (!hoverRef.current) setDismissed(false);
      }}
    >
      <NavLink
        className={({ isActive }) =>
          `inline-flex items-center gap-1.5 py-8 pr-[17px] font-sans text-base font-bold whitespace-nowrap text-nav transition-colors hover:text-brand ${isActive ? "text-brand" : ""}`
        }
        to={href}
        onClick={dismiss}
      >
        {label}
        {panel ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={`h-1.5 w-2 fill-none stroke-current text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth="1.6"
          >
            <path d="M1 1.5 6 6.5 11 1.5" />
          </svg>
        ) : null}
      </NavLink>
      {panel ? (
        <div
          className={`absolute top-full z-40 border-t border-line bg-white shadow-menu transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"} ${panelClass ?? "inset-x-0"}`}
          inert={open ? undefined : true}
        >
          {panel(dismiss)}
        </div>
      ) : null}
    </div>
  );
}

function MobileGroups({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState<string | null>(null);

  const sections = [
    {
      id: "Services",
      links: serviceMenu.flatMap((column) =>
        column.flatMap((group) => [{ label: group.label, href: group.href, heading: true }, ...group.items]),
      ),
    },
    {
      id: "Industries",
      links: [
        { label: "All industries", href: "/industries", heading: true },
        ...industryLinks,
        { label: ecommerceGroup.label, href: ecommerceGroup.href, heading: true },
        ...ecommerceGroup.items,
      ],
    },
    { id: "Our Products", links: productLinks },
  ];

  return (
    <div>
      {sections.map((section) => (
        <div key={section.id} className="border-b border-line">
          <button
            className="flex w-full items-center justify-between py-3.5 text-left font-sans text-base font-bold text-nav"
            type="button"
            aria-expanded={open === section.id}
            onClick={() => setOpen(open === section.id ? null : section.id)}
          >
            {section.id}
            <span aria-hidden="true" className="text-xl leading-none text-muted">
              {open === section.id ? "−" : "+"}
            </span>
          </button>
          <Collapse open={open === section.id}>
            <ul className="pb-3 pl-3">
              {section.links.map((link) => {
                const heading = "heading" in link && link.heading;
                const className = heading
                  ? "block py-1.5 font-sans text-[16px] font-medium uppercase leading-normal text-[#101010]"
                  : "block py-1 font-sans text-[12px] font-bold uppercase leading-[30px] text-[#777] transition-colors hover:text-brand";
                return (
                  <li key={`${link.label}-${link.href}`} className={heading ? "pt-4 first:pt-1" : undefined}>
                    {"external" in link && link.external ? (
                      <a className={className} href={link.href} target="_blank" rel="noreferrer" onClick={onNavigate}>
                        {link.label}
                      </a>
                    ) : (
                      <Link className={className} to={link.href} onClick={onNavigate}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </Collapse>
        </div>
      ))}
      {mainNav
        .filter((item) => item.kind === "link")
        .map((item) => (
          <Link
            key={item.href}
            className="block border-b border-line py-3.5 font-sans text-base font-bold text-nav"
            to={item.href}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_var(--color-line)]">
      <div className="bg-topbar text-white">
        <div className="flex h-[41px] items-center justify-between gap-3 px-4 text-[13px] sm:px-5 xl:px-[30px]">
          <a className="inline-flex min-w-0 items-center gap-2 transition-colors hover:text-brand" href={`mailto:${site.email}`}>
            <SvgIcon name="envelope" className="h-3 w-3 shrink-0" />
            <span className="truncate">{site.email}</span>
          </a>
          <ul className="flex shrink-0 items-center gap-3 sm:gap-5">
            {topbarSocials.map((item) => (
              <li key={item.id}>
                <a
                  className="flex h-6 w-6 items-center justify-center transition-colors hover:text-brand"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  <SvgIcon name={item.id} className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative flex h-[76px] items-center justify-between gap-4 px-5 xl:h-[115px] xl:px-[31px]">
        <Link to="/" aria-label="Fixelcloud home" className="flex shrink-0 items-center">
          <img src={site.logo} alt="Fixelcloud" width={200} height={47} className="block h-10 w-auto xl:h-[47px] xl:w-[200px]" />
        </Link>

        <nav className="hidden items-center xl:mr-auto xl:ml-8 xl:flex" aria-label="Primary">
          <DesktopItem label="Services" href="/services" panel={(onPick) => <ServicesMenu onPick={onPick} />} />
          <DesktopItem label="Industries" href="/industries" panel={(onPick) => <IndustriesMenu onPick={onPick} />} />
          <DesktopItem label="About Us" href="/about-us" />
          <DesktopItem label="Insights" href="/blog" />
          <DesktopItem label="Contacts" href="/contacts" />
          <DesktopItem
            label="Our Products"
            href="/finhub"
            panel={(onPick) => <ProductsMenu onPick={onPick} />}
            panelClass="left-0 w-48 px-[30px] py-6"
          />
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <a
            className="inline-flex items-center gap-3 text-[15px] font-bold whitespace-nowrap text-nav transition-colors hover:text-brand"
            href={usPhone.href}
          >
            <Flaticon name="phone" className="text-[22px] text-brand" />
            {usPhone.label}
          </a>
          <Link
            className="press bg-brand px-4 py-4 text-[15px] leading-5 font-bold tracking-wide whitespace-nowrap text-white uppercase hover:bg-brand-dark"
            to="/estimate"
          >
            Estimate Project
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center text-nav transition-colors hover:text-brand"
            type="button"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <SearchIcon />
          </button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center text-nav xl:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
            {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            id="site-search"
            className="overflow-hidden border-t border-line bg-canvas"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <form action="/search" className="mx-auto flex max-w-[1226px] gap-2 px-5 py-4">
              <label className="sr-only" htmlFor="header-search">
                Search the site
              </label>
              <input
                id="header-search"
                className="w-full border border-line bg-white px-4 py-3 text-base text-ink transition-colors focus:border-brand"
                name="q"
                placeholder="Search"
                autoFocus
              />
              <button className="press bg-brand px-6 text-[15px] font-bold text-white uppercase hover:bg-brand-dark" type="submit">
                Search
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="max-h-[calc(100dvh-117px)] overflow-y-auto border-t border-line bg-white px-5 pb-6 xl:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <MobileGroups onNavigate={() => setOpen(false)} />
            <form action="/search" className="mt-5 flex gap-2">
              <label className="sr-only" htmlFor="mobile-search">
                Search
              </label>
              <input id="mobile-search" className="w-full border border-line bg-canvas px-3 py-3 text-base" name="q" placeholder="Search" />
              <button className="press bg-nav px-5 text-sm font-bold text-white uppercase" type="submit">
                Go
              </button>
            </form>
            <a className="mt-5 flex items-center gap-3 font-bold text-nav transition-colors hover:text-brand" href={usPhone.href}>
              <Flaticon name="phone" className="text-xl text-brand" />
              {usPhone.label}
            </a>
            <Link
              className="press mt-4 block bg-brand px-4 py-4 text-center text-[15px] font-bold text-white uppercase hover:bg-brand-dark"
              to="/estimate"
            >
              Estimate Project
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}
