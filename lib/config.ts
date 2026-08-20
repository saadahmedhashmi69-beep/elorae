/**
 * Central site configuration.
 *
 * Every business-editable value (pricing, contact numbers, policies, feature
 * flags) lives here and is sourced from environment variables so the site
 * owner can change them without touching component code. See `.env.example`
 * for the full list and where to obtain each value.
 */

const num = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && value !== undefined && value !== "" ? parsed : fallback;
};

const bool = (value: string | undefined, fallback: boolean) => {
  if (value === undefined || value === "") return fallback;
  return value === "true" || value === "1";
};

export const siteConfig = {
  brand: {
    name: "ELORAÉ",
    displayName: "ELORAÉ™",
    tagline: "Women's Beauty & Personal Grooming",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://elorae.vercel.app",
  },

  product: {
    slug: "duosmooth",
    name: "DuoSmooth",
    displayName: "ELORAÉ™ DuoSmooth",
    type: "Double-Head Electric Women's Body Shaver",
    shortDescription:
      "A double-head electric shaver designed for effortless everyday grooming — legs, arms, underarms, face and bikini line.",
  },

  pricing: {
    currency: "AED",
    /** Current selling price per unit, in AED. */
    price: num(process.env.NEXT_PUBLIC_PRODUCT_PRICE, 89),
    /** Reference / "was" price shown struck through. Set equal to price to hide the discount. */
    compareAtPrice: num(process.env.NEXT_PUBLIC_PRODUCT_COMPARE_PRICE, 129),
    /** Whether to show multi-unit bundle offers on the offer section. */
    bundlesEnabled: bool(process.env.NEXT_PUBLIC_BUNDLES_ENABLED, true),
    /** Extra discount applied per unit when buying the 2-unit bundle. */
    bundle2DiscountPercent: num(process.env.NEXT_PUBLIC_BUNDLE_2_DISCOUNT_PERCENT, 10),
    /** Extra discount applied per unit when buying the 3-unit bundle. */
    bundle3DiscountPercent: num(process.env.NEXT_PUBLIC_BUNDLE_3_DISCOUNT_PERCENT, 15),
    shippingFee: num(process.env.NEXT_PUBLIC_SHIPPING_FEE, 0),
    codFee: num(process.env.NEXT_PUBLIC_COD_FEE, 0),
  },

  /**
   * Verified product attributes. Only flip these to `true` (via env vars)
   * once confirmed against the actual product spec sheet — the UI hides
   * any claim tied to a `false` flag rather than guessing. This keeps the
   * site honest as more product detail becomes available.
   */
  productAttributes: {
    doubleHeadDesign: true,
    electricOperation: true,
    multipleGroomingAreas: true,
    rechargeable: bool(process.env.NEXT_PUBLIC_ATTR_RECHARGEABLE, false),
    compactTravelFriendly: bool(process.env.NEXT_PUBLIC_ATTR_COMPACT, false),
    easyToClean: bool(process.env.NEXT_PUBLIC_ATTR_EASY_CLEAN, false),
    waterproof: bool(process.env.NEXT_PUBLIC_ATTR_WATERPROOF, false),
  },

  fulfillment: {
    codEnabled: bool(process.env.NEXT_PUBLIC_COD_ENABLED, true),
    onlinePaymentEnabled: bool(process.env.NEXT_PUBLIC_ONLINE_PAYMENT_ENABLED, false),
    deliveryDaysMin: num(process.env.NEXT_PUBLIC_DELIVERY_DAYS_MIN, 2),
    deliveryDaysMax: num(process.env.NEXT_PUBLIC_DELIVERY_DAYS_MAX, 4),
    emirates: [
      "Dubai",
      "Abu Dhabi",
      "Sharjah",
      "Ajman",
      "Ras Al Khaimah",
      "Fujairah",
      "Umm Al Quwain",
    ],
    returnPolicyDays: num(process.env.NEXT_PUBLIC_RETURN_POLICY_DAYS, 7),
  },

  contact: {
    /** E.164 digits only, no leading +, e.g. 971501234567. Leave empty to disable WhatsApp CTAs. */
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@elorae.ae",
  },

  analytics: {
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  },
} as const;

export const isWhatsAppConfigured = () => siteConfig.contact.whatsappNumber.length > 0;
