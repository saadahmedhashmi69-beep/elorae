import { Container } from "@/components/ui/Container";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";
import { siteConfig } from "@/lib/config";

export function Travel() {
  const compact = siteConfig.productAttributes.compactTravelFriendly;

  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-dark">On The Go</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">Beauty That Travels With You.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg">
            {compact
              ? "DuoSmooth's compact design slips easily into a toiletry bag or carry-on, so your grooming routine keeps up wherever you're headed."
              : "UAE life means frequent travel. DuoSmooth is designed to fit into your routine at home — and we're confirming exact dimensions so we can speak precisely to how it packs for travel."}
          </p>
        </div>
        <ProductPlaceholder slot="travel, toiletry bag" variant="champagne" scene="bag" aspect="aspect-[4/5]" />
      </Container>
    </section>
  );
}
