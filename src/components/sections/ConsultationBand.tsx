import { media } from "../../config/site";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function ConsultationBand() {
  return (
    <section
      className="bg-night bg-cover bg-center text-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${media.consultation})` }}
    >
      <Container className="py-20 md:py-section-lg">
        <p className="text-base font-semibold md:text-xl">// Drop us a line! We are here to answer your questions 24/7</p>
        <h2 className="heading-shout mt-3 text-white">Need a consultation?</h2>
        <Button href="/contacts" className="mt-8 md:mt-10">
          Contact us
        </Button>
      </Container>
    </section>
  );
}
