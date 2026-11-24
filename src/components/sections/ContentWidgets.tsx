import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ContentNode, TitledText } from "../../utils/parseContent";
import { Collapse } from "../ui/Collapse";
import { Flaticon, type FlaticonName } from "../ui/Icons";

const stepIcons: FlaticonName[] = ["medal", "gear", "idea", "edit-tools"];

type Step = string | { title: string; text?: string; icon?: FlaticonName };

/* The original icon-box row: a gray rule fills with the brand colour on hover. */
export function ProcessSteps({ items }: { items: Step[] }) {
  const columns =
    items.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <ul className={`grid gap-x-8 gap-y-10 ${columns}`}>
      {items.map((item, index) => {
        const step = typeof item === "string" ? { title: item } : item;
        return (
          <li key={step.title} className="group" tabIndex={0}>
            <Flaticon name={step.icon ?? stepIcons[index % stepIcons.length]} className="text-[40px] text-ink" />
            <h3 className="mt-4 text-lg leading-6 font-semibold text-ink group-hover:font-extrabold group-focus:font-extrabold">
              {step.title}
            </h3>
            <div className="relative mt-3 h-[3px] bg-[#efefef]">
              <span className="absolute inset-y-0 right-0 w-0 bg-brand transition-[width] duration-300 ease-linear group-hover:w-full group-focus:w-full" />
            </div>
            {step.text ? <p className="mt-4 text-base leading-7">{step.text}</p> : null}
          </li>
        );
      })}
    </ul>
  );
}

function PanelCopy({ nodes, onDark }: { nodes: ContentNode[]; onDark: boolean }) {
  return (
    <div className={`mt-8 space-y-4 text-base leading-8 ${onDark ? "text-white/85" : "text-ink"}`}>
      {nodes.map((node, index) => {
        if (node.type === "paragraph") return <p key={index}>{node.text}</p>;
        if (node.type !== "list") return null;
        return (
          <ul key={index} className="space-y-2.5 pt-1">
            {node.items.map((item, position) => {
              const split = item.indexOf(":");
              const label = split > 0 ? item.slice(0, split) : "";
              const rest = split > 0 ? item.slice(split + 1).trim() : item;
              return (
                <li key={position} className="flex gap-3">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 fill-none stroke-brand" strokeWidth="2">
                    <path d="m3 8.5 3 3 7-7" />
                  </svg>
                  <span>
                    {label ? <strong className="font-bold">{label}:</strong> : null}
                    {label ? ` ${rest}` : item}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export function Tabs({ items, onDark = false }: { items: { title: string; nodes: ContentNode[] }[]; onDark?: boolean }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2.5" onKeyDown={onKeyDown}>
        {items.map((item, index) => (
          <button
            key={item.title}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={`press inline-flex min-h-[50px] items-center justify-center px-6 py-4 text-center text-[15px] leading-5 font-bold tracking-wide uppercase transition-colors duration-200 ${
              index === active
                ? "bg-brand text-white hover:bg-brand-dark"
                : onDark
                  ? "border border-white/70 bg-transparent text-white hover:bg-white hover:text-ink"
                  : "border border-brand bg-white text-brand hover:bg-brand hover:text-white"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div key={active} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
        <PanelCopy nodes={items[active]?.nodes ?? []} onDark={onDark} />
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: TitledText[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <ul className="space-y-3">
      {items.map((item, index) => {
        const expanded = index === open;
        return (
          <li key={index} className="border border-line bg-white">
            <button
              type="button"
              id={`${id}-head-${index}`}
              aria-expanded={expanded}
              aria-controls={`${id}-body-${index}`}
              onClick={() => setOpen(expanded ? -1 : index)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base leading-6 font-semibold transition-colors duration-200 ${
                expanded ? "bg-canvas text-brand" : "text-ink hover:text-brand"
              }`}
            >
              {item.title}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className={`h-3.5 w-3.5 shrink-0 fill-none stroke-current transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                strokeWidth="1.6"
              >
                <path d="M8 2v12M3 9l5 5 5-5" />
              </svg>
            </button>
            <Collapse open={expanded}>
              <div
                id={`${id}-body-${index}`}
                role="region"
                aria-labelledby={`${id}-head-${index}`}
                className="px-5 pt-3 pb-5 text-base leading-8"
              >
                {item.text}
              </div>
            </Collapse>
          </li>
        );
      })}
    </ul>
  );
}
