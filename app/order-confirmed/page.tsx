"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig, isWhatsAppConfigured } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppLink, buildOrderWhatsAppMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import type { OrderPayload } from "@/lib/types";

type StoredOrder = OrderPayload & { orderRef: string };

const subscribe = () => () => {};
const getSnapshot = () => sessionStorage.getItem("elorae_last_order");
const getServerSnapshot = () => null;

export default function OrderConfirmedPage() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const order: StoredOrder | null = raw ? JSON.parse(raw) : null;

  if (!order) {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl text-charcoal">Thank you!</h1>
        <p className="text-charcoal-soft">Your order has been received.</p>
        <Link href="/" className="text-sm font-medium text-rose-dark underline">
          Back to home
        </Link>
      </Container>
    );
  }

  const whatsappHref = buildWhatsAppLink(
    buildOrderWhatsAppMessage({
      orderRef: order.orderRef,
      fullName: order.fullName,
      mobile: order.mobile,
      emirate: order.emirate,
      city: order.city,
      address: order.address,
      apartment: order.apartment,
      deliveryNotes: order.deliveryNotes,
      items: order.items.map((item) => ({ label: item.label, quantity: item.quantity, lineTotal: item.lineTotal })),
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      codFee: order.codFee,
      total: order.total,
      paymentMethod: order.paymentMethod,
    })
  );

  return (
    <Container className="flex flex-col items-center py-16 text-center sm:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-light text-rose-dark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl text-charcoal sm:text-4xl">Order Received</h1>
      <p className="mt-2 text-charcoal-soft">
        Reference <span className="font-medium text-charcoal">{order.orderRef}</span>
      </p>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-charcoal/10 bg-cream/60 p-6 text-left">
        <p className="text-sm font-medium text-charcoal">{siteConfig.brand.displayName} {siteConfig.product.name}</p>
        <p className="mt-1 text-sm text-charcoal-soft">Total: {formatPrice(order.total)}</p>
        <p className="mt-1 text-sm text-charcoal-soft">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
        <p className="mt-1 text-sm text-charcoal-soft">Delivering to {order.city}, {order.emirate}</p>
      </div>

      {isWhatsAppConfigured() ? (
        <>
          <p className="mt-6 max-w-sm text-sm text-charcoal-soft">
            Tap below to confirm your order details with us on WhatsApp — this helps us get it to you faster.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: "order_confirmed" })}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white hover:opacity-90"
          >
            Confirm via WhatsApp
          </a>
        </>
      ) : (
        <p className="mt-6 max-w-sm text-sm text-charcoal-soft">
          We&apos;ll contact you shortly at {order.mobile} to confirm your delivery details.
        </p>
      )}

      <Link href="/" className="mt-8 text-sm font-medium text-charcoal-soft underline">
        Continue shopping
      </Link>
    </Container>
  );
}
