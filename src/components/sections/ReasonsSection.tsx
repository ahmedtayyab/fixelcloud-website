import { reasons } from "../../data/navigation";
import { Container } from "../ui/Container";
import type { FlaticonName } from "../ui/Icons";
import { ProcessSteps } from "./ContentWidgets";

interface Reason {
  title: string;
  text: string;
  icon?: FlaticonName;
}

export function ReasonsSection({ title = "Why Choosing Us?", items = reasons }: { title?: string; items?: Reason[] }) {
  return (
    <section>
      <Container className="py-12 md:py-16">
        <h2 className="heading-section">{title}</h2>
        <div className="mt-10">
          <ProcessSteps items={items} />
        </div>
      </Container>
    </section>
  );
}
