import { Link } from "react-router-dom";
import { projectPath, type Project } from "../../data/portfolio";
import { ArrowIcon } from "./Icons";

/* Original "Our Work" card: cropped screenshot with a black title bar overlapping its lower edge. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="group relative block pb-[50px] transition-transform duration-200 active:scale-[0.99]" to={projectPath(project.slug)}>
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={720}
          height={520}
          loading="lazy"
          className="aspect-[415/300] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="absolute inset-x-[35px] bottom-0 flex items-center justify-between gap-4 bg-black px-[30px] pt-7 pb-5">
        <h3 className="truncate text-[22px] leading-[26px] font-semibold text-white">{project.title}</h3>
        <ArrowIcon className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
