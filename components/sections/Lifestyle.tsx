import { Container } from "@/components/ui/Container";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";

export function Lifestyle() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductPlaceholder slot="lifestyle, bathroom shelf" variant="ivory" scene="shelf" aspect="aspect-[4/5]" className="order-2 lg:order-1" />
        <div className="order-1 lg:order-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-dark">Self-Care Ritual</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">From Shower to Self-Care.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Turn everyday grooming into a ritual. DuoSmooth fits naturally into your beauty routine — quick to reach
            for, effortless to use, and designed to feel as good as it looks on your shelf.
          </p>
        </div>
      </Container>
    </section>
  );
}
