"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.7);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-ivory/95 backdrop-blur transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-charcoal">{siteConfig.product.displayName}</p>
          <Price amount={siteConfig.pricing.price} compareAt={siteConfig.pricing.compareAtPrice} size="sm" />
        </div>
        <a
          href="#shop"
          className="shrink-0 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-charcoal-soft"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}
