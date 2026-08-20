import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Price } from "@/components/ui/Price";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";

const trustItems = [
  "UAE-Wide Delivery",
  siteConfig.fulfillment.codEnabled ? "Cash on Delivery*" : undefined,
  "Secure Checkout",
  siteConfig.contact.whatsappNumber ? "WhatsApp Support" : undefined,
].filter((item): item is string => Boolean(item));

export function Hero() {
  const { price, compareAtPrice, currency } = siteConfig.pricing;
  const savings = compareAtPrice - price;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-ivory">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-rose-dark">
            {siteConfig.brand.displayName} Women&apos;s Grooming
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl md:text-6xl">
            Smooth Skin.
            <br />
            Made Simple.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Meet {siteConfig.product.name} — {siteConfig.product.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="#shop" size="lg">
              Shop {siteConfig.product.name}
            </LinkButton>
            <LinkButton href="#how-it-works" variant="outline" size="lg">
              See How It Works
            </LinkButton>
          </div>

          <div className="mt-6 flex items-center gap-2.5">
            <StarRating />
            <span className="text-sm text-charcoal-soft">Premium everyday grooming</span>
          </div>

          <div className="mt-8 flex flex-wrap items-end gap-3 rounded-2xl border border-champagne-dark/60 bg-cream/70 px-5 py-4">
            <Price amount={price} compareAt={compareAtPrice} size="lg" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-dark">Limited Launch Offer</p>
              {savings > 0 && (
                <p className="text-xs text-charcoal-soft">
                  Save {currency} {savings}
                </p>
              )}
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal-soft">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-rose-dark" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6 10.5l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          {siteConfig.fulfillment.codEnabled && (
            <p className="mt-2 text-xs text-charcoal-soft/70">*Cash on Delivery available across the UAE.</p>
          )}
        </div>

        <div className="relative">
          <ProductPlaceholder slot="hero product" variant="rose" aspect="aspect-[4/5]" className="mx-auto max-w-md shadow-xl shadow-charcoal/10" />
        </div>
      </Container>
    </section>
  );
}
