"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/config";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore, useCartTotals } from "@/store/cart-store";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const { lines, subtotal, shippingFee, total } = useCartTotals();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <div className={cn("fixed inset-0 z-50", isOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        className={cn("absolute inset-0 bg-charcoal/40 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
          <h2 className="font-display text-xl text-charcoal">Your Cart</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-champagne/60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-charcoal-soft">Your cart is empty.</p>
              <a href="#shop" onClick={close} className="text-sm font-medium text-rose-dark underline">
                Shop {siteConfig.product.name}
              </a>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <ProductPlaceholder slot="cart item" variant="champagne" aspect="aspect-square" className="w-20 shrink-0 rounded-xl" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{siteConfig.product.displayName}</p>
                      <p className="text-xs text-charcoal-soft">{line.label}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-charcoal/15">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          className="h-7 w-7 text-charcoal"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          className="h-7 w-7 text-charcoal"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium text-charcoal">{formatPrice(line.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-charcoal/10 px-5 py-4">
            <div className="space-y-1.5 text-sm text-charcoal-soft">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee > 0 ? formatPrice(shippingFee) : "Free"}</span>
              </div>
              <div className="flex justify-between pt-1.5 text-base font-semibold text-charcoal">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-charcoal px-6 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-charcoal-soft"
            >
              Complete Order
            </Link>
            {siteConfig.fulfillment.codEnabled && (
              <p className="mt-2 text-center text-xs text-charcoal-soft">Cash on Delivery available</p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
