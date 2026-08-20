"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";
import { StarRating } from "@/components/ui/StarRating";
import { Price } from "@/components/ui/Price";
import { siteConfig } from "@/lib/config";
import { formatPrice, cn } from "@/lib/utils";
import { getBundleOptions } from "@/lib/bundles";
import { useCartStore } from "@/store/cart-store";
import { trackAddToCart } from "@/lib/analytics";
import type { BundleId } from "@/lib/types";

const bundles = getBundleOptions();

export function OfferSection() {
  const [selectedId, setSelectedId] = useState<BundleId>("single");
  const [qty, setQty] = useState(1);
  const addBundle = useCartStore((s) => s.addBundle);
  const selected = bundles.find((b) => b.id === selectedId) ?? bundles[0];

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) addBundle(selected);
    trackAddToCart({
      contentName: `${siteConfig.product.displayName} — ${selected.label}`,
      value: selected.totalPrice * qty,
      quantity: qty,
    });
    setQty(1);
  };

  return (
    <section id="shop" className="py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductPlaceholder slot="offer, product hero" variant="rose" aspect="aspect-[4/5]" className="mx-auto w-full max-w-md" />

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-dark">{siteConfig.brand.displayName}</p>
          <h2 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">{siteConfig.product.displayName}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating />
            <span className="text-sm text-charcoal-soft">Premium everyday grooming</span>
          </div>

          <div className="mt-5">
            <Price amount={selected.totalPrice} compareAt={selected.compareAtTotal} size="lg" />
            {selected.compareAtTotal > selected.totalPrice && (
              <p className="mt-1 text-sm font-medium text-rose-dark">
                Save {formatPrice(selected.compareAtTotal - selected.totalPrice)}
              </p>
            )}
          </div>

          {bundles.length > 1 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {bundles.map((bundle) => (
                <button
                  key={bundle.id}
                  type="button"
                  onClick={() => setSelectedId(bundle.id)}
                  className={cn(
                    "relative rounded-xl border px-4 py-3.5 text-left transition-colors",
                    selectedId === bundle.id ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 hover:border-charcoal/40"
                  )}
                >
                  {bundle.badge && (
                    <span className="absolute -top-2.5 left-3 rounded-full bg-rose-dark px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ivory">
                      {bundle.badge}
                    </span>
                  )}
                  <p className="text-sm font-medium">{bundle.label}</p>
                  <p className={cn("mt-1 text-xs", selectedId === bundle.id ? "text-ivory/80" : "text-charcoal-soft")}>
                    {formatPrice(bundle.totalPrice)}
                  </p>
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-charcoal/20">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-charcoal" aria-label="Decrease quantity">
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="h-11 w-11 text-charcoal" aria-label="Increase quantity">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-full bg-charcoal px-8 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-charcoal-soft"
            >
              Shop Now
            </button>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-charcoal-soft">
            <li>✓ UAE-Wide Delivery</li>
            {siteConfig.fulfillment.codEnabled && <li>✓ Cash on Delivery</li>}
            <li>✓ Secure Checkout</li>
            {siteConfig.contact.whatsappNumber && <li>✓ WhatsApp Support</li>}
          </ul>
        </div>
      </Container>
    </section>
  );
}
