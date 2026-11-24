import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

/* Closing call to action of the service pages: a page-specific line over a full-bleed photo. */
export function CtaBand({ title, text, image }: { title: string; text?: string; image: string }) {
  return (
    <section
      className="bg-night bg-cover bg-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${image})` }}
    >
      <Container className="py-20 md:py-[150px]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="heading-section text-white">{title}</h2>
          {text ? <p className="mt-4 max-w-2xl text-base leading-[30px] text-white/90">{text}</p> : null}
          <Button href="/contacts" className="mt-8">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
