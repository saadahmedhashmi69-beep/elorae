import { siteConfig } from "./config";

export function buildWhatsAppLink(message: string): string {
  const number = siteConfig.contact.whatsappNumber;
  const encoded = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${encoded}` : "#";
}

export function buildOrderWhatsAppMessage(payload: {
  orderRef: string;
  fullName: string;
  mobile: string;
  emirate: string;
  city: string;
  address: string;
  apartment: string;
  deliveryNotes: string;
  items: { label: string; quantity: number; lineTotal: number }[];
  subtotal: number;
  shippingFee: number;
  codFee: number;
  total: number;
  paymentMethod: string;
}): string {
  const lines = [
    `New order ${payload.orderRef} — ${siteConfig.brand.displayName}`,
    "",
    ...payload.items.map((item) => `• ${item.label} x${item.quantity} — ${siteConfig.pricing.currency} ${item.lineTotal}`),
    "",
    `Subtotal: ${siteConfig.pricing.currency} ${payload.subtotal}`,
    payload.shippingFee ? `Shipping: ${siteConfig.pricing.currency} ${payload.shippingFee}` : undefined,
    payload.codFee ? `COD Fee: ${siteConfig.pricing.currency} ${payload.codFee}` : undefined,
    `Total: ${siteConfig.pricing.currency} ${payload.total}`,
    `Payment: ${payload.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}`,
    "",
    `Name: ${payload.fullName}`,
    `Mobile: ${payload.mobile}`,
    `Emirate: ${payload.emirate}`,
    `City/Area: ${payload.city}`,
    `Address: ${payload.address}${payload.apartment ? `, ${payload.apartment}` : ""}`,
    payload.deliveryNotes ? `Notes: ${payload.deliveryNotes}` : undefined,
  ].filter((line): line is string => line !== undefined);

  return lines.join("\n");
}
