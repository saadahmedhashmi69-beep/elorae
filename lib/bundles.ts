import { siteConfig } from "./config";
import type { BundleOption } from "./types";

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Bundle pricing is derived from the single-unit price plus a configurable
 * per-tier discount percentage (see .env.example) — never hard-coded, and
 * never presented as anything other than a computed multi-unit discount.
 */
export function getBundleOptions(): BundleOption[] {
  const { price, compareAtPrice, bundlesEnabled, bundle2DiscountPercent, bundle3DiscountPercent } = siteConfig.pricing;

  const single: BundleOption = {
    id: "single",
    units: 1,
    label: "1 Device",
    unitPrice: price,
    totalPrice: price,
    compareAtTotal: compareAtPrice,
  };

  if (!bundlesEnabled) return [single];

  const duoUnitPrice = round(price * (1 - bundle2DiscountPercent / 100));
  const trioUnitPrice = round(price * (1 - bundle3DiscountPercent / 100));

  const duo: BundleOption = {
    id: "duo",
    units: 2,
    label: "2 Devices",
    badge: "BEST VALUE",
    unitPrice: duoUnitPrice,
    totalPrice: round(duoUnitPrice * 2),
    compareAtTotal: round(compareAtPrice * 2),
  };

  const trio: BundleOption = {
    id: "trio",
    units: 3,
    label: "3 Devices",
    badge: "FAMILY & GIFT SET",
    unitPrice: trioUnitPrice,
    totalPrice: round(trioUnitPrice * 3),
    compareAtTotal: round(compareAtPrice * 3),
  };

  return [single, duo, trio];
}
