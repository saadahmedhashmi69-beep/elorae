import { Container } from "@/components/ui/Container";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";
import { siteConfig } from "@/lib/config";

export function ProductIntro() {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-dark">Introducing</p>
        <h2 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">
          Meet {siteConfig.product.name}<span className="align-super text-lg">™</span>
        </h2>
        <p className="mt-4 max-w-lg text-base text-charcoal-soft sm:text-lg">
          Two grooming surfaces. One beautifully simple routine.
        </p>

        <ProductPlaceholder
          slot="full product, hero angle"
          variant="ivory"
          aspect="aspect-[16/10]"
          className="mt-10 w-full max-w-3xl shadow-lg shadow-charcoal/10"
        />
      </Container>
    </section>
  );
}
