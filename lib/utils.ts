import { siteConfig } from "./config";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(amount: number) {
  return `${siteConfig.pricing.currency} ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Normalizes a UAE mobile number to E.164 digits (971XXXXXXXXX, no leading +).
 * Accepts local (05XXXXXXXX), international (+9715XXXXXXXX / 9715XXXXXXXX)
 * and space/dash formatted input.
 */
export function normalizeUaeMobile(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  let national = digits;

  if (digits.startsWith("00971")) national = digits.slice(5);
  else if (digits.startsWith("971")) national = digits.slice(3);
  else if (digits.startsWith("0")) national = digits.slice(1);

  // UAE mobile: 5 + 8 digits = 9 digits total
  if (!/^5\d{8}$/.test(national)) return null;

  return `971${national}`;
}

export function isValidUaeMobile(raw: string): boolean {
  return normalizeUaeMobile(raw) !== null;
}

export function formatUaeMobileForDisplay(raw: string): string {
  const normalized = normalizeUaeMobile(raw);
  if (!normalized) return raw;
  return `+${normalized.slice(0, 3)} ${normalized.slice(3, 5)} ${normalized.slice(5, 8)} ${normalized.slice(8)}`;
}

export function generateOrderRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ELR-${timestamp}-${random}`;
}
