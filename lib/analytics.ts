/**
 * Thin analytics event abstraction over Meta Pixel / GA4.
 *
 * All functions are safe no-ops when the corresponding tracking ID is not
 * configured (see `.env.example`), so the app builds and runs fully without
 * any analytics credentials. Never fires Purchase speculatively — only call
 * trackPurchase() after an order has actually been submitted successfully.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

import { siteConfig } from "./config";

const pixelEnabled = () => typeof window !== "undefined" && !!siteConfig.analytics.metaPixelId && !!window.fbq;
const gaEnabled = () => typeof window !== "undefined" && !!siteConfig.analytics.gaMeasurementId && !!window.gtag;

type EventPayload = Record<string, string | number | boolean | undefined>;

function fireMeta(event: string, payload?: EventPayload) {
  if (pixelEnabled()) window.fbq?.("track", event, payload);
}

function fireGa(event: string, payload?: EventPayload) {
  if (gaEnabled()) window.gtag?.("event", event, payload);
}

export function trackViewContent(payload: { contentName: string; value: number; currency?: string }) {
  fireMeta("ViewContent", {
    content_name: payload.contentName,
    value: payload.value,
    currency: payload.currency ?? siteConfig.pricing.currency,
  });
  fireGa("view_item", { item_name: payload.contentName, value: payload.value });
}

export function trackAddToCart(payload: { contentName: string; value: number; quantity: number; currency?: string }) {
  fireMeta("AddToCart", {
    content_name: payload.contentName,
    value: payload.value,
    currency: payload.currency ?? siteConfig.pricing.currency,
  });
  fireGa("add_to_cart", { item_name: payload.contentName, value: payload.value, quantity: payload.quantity });
}

export function trackInitiateCheckout(payload: { value: number; numItems: number; currency?: string }) {
  fireMeta("InitiateCheckout", {
    value: payload.value,
    num_items: payload.numItems,
    currency: payload.currency ?? siteConfig.pricing.currency,
  });
  fireGa("begin_checkout", { value: payload.value });
}

export function trackPurchase(payload: { value: number; orderId: string; currency?: string }) {
  fireMeta("Purchase", {
    value: payload.value,
    currency: payload.currency ?? siteConfig.pricing.currency,
    content_name: siteConfig.product.displayName,
  });
  fireGa("purchase", { transaction_id: payload.orderId, value: payload.value });
}

export function trackLead(payload: { contentName: string }) {
  fireMeta("Lead", { content_name: payload.contentName });
  fireGa("generate_lead", { item_name: payload.contentName });
}

export function trackWhatsAppClick(payload: { location: string }) {
  fireMeta("Contact", { content_name: `WhatsApp - ${payload.location}` });
  fireGa("whatsapp_click", { location: payload.location });
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;
const UTM_STORAGE_KEY = "elorae_utm";

/** Captures UTM/fbclid params from the current URL into localStorage so they survive to checkout. */
export function captureUtmParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  let hasAny = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  });

  if (hasAny) {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
  }
}

export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
