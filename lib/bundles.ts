import { siteConfig } from "./config";
import type { BundleOption } from "./types";

/**
 * Bundle pricing is a fixed, independently-configured ladder (see
 * lib/config.ts `pricing.bundleTiers`) — each tier's total price is a
 * business decision, not a computed discount. `compareAtTotal` (units ×
 * single-unit price) is the only derived figure, used purely to show an
 * honest "save AED X vs buying separately" line.
 */
export function getBundleOptions(): BundleOption[] {
  const { price, bundlesEnabled, bundleTiers, recommendedUnits } = siteConfig.pricing;

  const tiers = bundlesEnabled ? bundleTiers : bundleTiers.filter((tier) => tier.units === 1);

  return tiers.map((tier) => ({
    units: tier.units,
    label: tier.units === 1 ? "1 Device" : `${tier.units} Devices`,
    badge: tier.units === recommendedUnits ? "MOST POPULAR" : undefined,
    totalPrice: tier.price,
    compareAtTotal: tier.units * price,
    recommended: tier.units === recommendedUnits,
  }));
}
