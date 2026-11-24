import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/portfolio";
import { ArrowIcon } from "../ui/Icons";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";

export function WorkCarousel({ eyebrow = "// Our work", title }: { eyebrow?: string; title: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const onScroll = () => {
      const card = node.firstElementChild as HTMLElement | null;
      if (!card) return;
      setActive(Math.round(node.scrollLeft / card.offsetWidth));
    };
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const node = track.current;
    const card = node?.firstElementChild as HTMLElement | null;
    if (!node || !card) return;
    node.scrollTo({ left: index * card.offsetWidth, behavior: "smooth" });
  };

  const step = (direction: 1 | -1) => goTo(Math.min(projects.length - 1, Math.max(0, active + direction)));

  return (
    <section className="bg-canvas py-16 md:py-section">
      <SectionTitle eyebrow={eyebrow} title={title} align="center" className="px-5" />
      <div className="relative mt-10 md:mt-12">
        <ul
          ref={track}
          className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth px-[calc(50%-min(222px,44vw))] [scrollbar-width:none] md:px-0 [&::-webkit-scrollbar]:hidden"
          aria-label="Projects"
        >
          {projects.map((project) => (
            <li key={project.slug} className="w-[min(445px,88vw)] shrink-0 snap-center p-[15px] md:snap-start">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="absolute top-[40%] left-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-white text-ink shadow-card transition-colors hover:bg-brand hover:text-white disabled:opacity-40 md:flex"
          aria-label="Previous project"
          onClick={() => step(-1)}
          disabled={active === 0}
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          className="absolute top-[40%] right-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-white text-ink shadow-card transition-colors hover:bg-brand hover:text-white disabled:opacity-40 md:flex"
          aria-label="Next project"
          onClick={() => step(1)}
          disabled={active >= projects.length - 1}
        >
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-6 flex justify-center gap-2.5">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className={`h-2 w-2 rounded-full transition-colors ${index === active ? "bg-black" : "bg-black/15 hover:bg-black/40"}`}
            aria-label={`Show ${project.title}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
