import type { ContentNode, Plan, TitledText } from "../../utils/parseContent";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Accordion, ProcessSteps, Tabs } from "./ContentWidgets";

function isShout(text: string) {
  return text.length > 12 && text === text.toUpperCase() && /[A-Z]/.test(text);
}

/* Article bodies were scraped without heading tags; short unpunctuated lines are their subheadings. */
function looksLikeHeading(text: string) {
  return text.length < 80 && text.split(" ").length <= 12 && !/[.:,;”"]$/.test(text);
}

function Features({ items, numbered, compact }: { items: TitledText[]; numbered: boolean; compact: boolean }) {
  if (!numbered && (items.length === 2 || items.length === 4)) {
    return <ProcessSteps items={items} />;
  }
  const columns = compact || items.length === 4 || items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ol className={`grid gap-5 ${columns}`}>
      {items.map((item, index) => (
        <li key={index} className="h-full">
          <Reveal delay={(index % 3) * 0.08} className="h-full">
            {numbered ? (
              <article className="h-full">
                <span className="font-display text-[28px] leading-none font-extrabold text-brand">
                  {item.number ?? String(index + 1).padStart(2, "0")}.
                </span>
                <h3 className="heading-card mt-3">{item.title}</h3>
                <p className="mt-3 text-base leading-8">{item.text}</p>
              </article>
            ) : (
              <article className="lift flex h-full flex-col border border-line bg-white p-7">
                <h3 className="heading-card">{item.title}</h3>
                <p className="mt-3 text-base leading-8">{item.text}</p>
              </article>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function Plans({ items }: { items: Plan[] }) {
  return (
    <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {items.map((plan, index) => (
        <li key={index} className="h-full">
          <Reveal delay={index * 0.08} className="h-full">
            <article
              className={`lift flex h-full flex-col border bg-white p-8 md:p-10 ${index === 1 ? "border-brand shadow-card" : "border-line"}`}
            >
          <h3 className="font-display text-2xl leading-tight font-extrabold text-ink">{plan.name}</h3>
          <p className="mt-4 font-display text-[44px] leading-none font-extrabold text-brand md:text-[52px]">{plan.price}</p>
          {plan.note ? <p className="mt-4 text-base leading-7">{plan.note}</p> : null}
          <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-6">
            {plan.features.map((feature, position) => (
              <li key={position} className="flex gap-3 text-base leading-7 text-ink">
                <Check />
                {feature}
              </li>
            ))}
          </ul>
          <Button href="/estimate" variant={index === 1 ? "primary" : "outline"} className="mt-8">
            Choose plan
          </Button>
          </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/* The first action in a section leads. Navigation and sign-in stay secondary so they do not compete with it. */
function actionTone(label: string, lead: boolean): "primary" | "secondary" {
  const key = label.toLowerCase();
  if (!lead || key === "our services" || key === "explore the modules" || key.startsWith("sign in")) return "secondary";
  return "primary";
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 fill-none stroke-brand" strokeWidth="2">
      <path d="m3 8.5 3 3 7-7" />
    </svg>
  );
}

export function ContentBody({
  blocks,
  compact = false,
  article = false,
  light = false,
  centered = false,
}: {
  blocks: ContentNode[];
  compact?: boolean;
  article?: boolean;
  light?: boolean;
  /** Centres intro paragraphs, for sections whose title is centred. */
  centered?: boolean;
}) {
  return (
    <div className={`space-y-6 ${compact ? "" : "[&>p]:max-w-[820px]"} ${centered ? "[&>p]:mx-auto [&>p]:text-center" : ""}`}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h3 key={index} className={`heading-card pt-2 ${light ? "text-white" : ""}`}>
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={index} className={`grid gap-x-8 gap-y-2 ${block.items.length > 6 ? "sm:grid-cols-2" : ""}`}>
                {block.items.map((item, position) => (
                  <li key={position} className={`flex gap-3 ${light ? "text-white" : "text-ink"}`}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "features":
            return <Features key={index} items={block.items} numbered={block.numbered} compact={compact} />;
          case "plans":
            return <Plans key={index} items={block.items} />;
          case "tabs":
            return <Tabs key={index} items={block.items} onDark={light} />;
          case "steps":
            return <ProcessSteps key={index} items={block.items} />;
          case "accordion":
            return <Accordion key={index} items={block.items} />;
          case "action": {
            if (index > 0 && blocks[index - 1].type === "action") return null;
            const run = blocks.slice(index).filter((item, offset, list) => {
              if (item.type !== "action") return false;
              return list.slice(0, offset).every((earlier) => earlier.type === "action");
            });
            return (
              <div key={index} className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                {run.map((action, position) =>
                  action.type === "action" ? (
                    <Button
                      key={position}
                      href={action.href}
                      external={action.external}
                      variant={actionTone(action.label, position === 0)}
                    >
                      {action.label}
                    </Button>
                  ) : null,
                )}
              </div>
            );
          }
          case "people":
            return (
              <ul key={index} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {block.items.map((person, position) => (
                  <li key={position} className="h-full">
                    <Reveal delay={(position % 3) * 0.06} className="h-full">
                      <article className="lift h-full border border-line bg-white p-6">
                        <p className="text-sm font-bold tracking-wide text-brand uppercase">{person.role}</p>
                        <p className="heading-card mt-2">{person.name}</p>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            );
          case "quotes":
            return (
              <ul key={index} className="grid gap-6 md:grid-cols-2">
                {block.items.map((quote, position) => (
                  <li key={position} className="h-full">
                    <Reveal delay={(position % 2) * 0.08} className="h-full">
                      <article className="lift h-full border border-line bg-white p-7">
                        <blockquote className="text-base leading-8">“{quote.quote}”</blockquote>
                        <p className="mt-4 font-semibold text-ink">{quote.name}</p>
                        <p className="text-base">{quote.role}</p>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            );
          case "paragraph":
            if (isShout(block.text)) {
              return (
                <h3 key={index} className="pt-2 text-lg font-bold tracking-wide">
                  {block.text}
                </h3>
              );
            }
            if (article && looksLikeHeading(block.text)) {
              return (
                <h2 key={index} className="heading-card pt-4">
                  {block.text}
                </h2>
              );
            }
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}
