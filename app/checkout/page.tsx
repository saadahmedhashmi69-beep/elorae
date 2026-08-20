"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";
import { formatPrice, isValidUaeMobile, cn } from "@/lib/utils";
import { useCartStore, useCartTotals } from "@/store/cart-store";
import { trackInitiateCheckout, trackPurchase, getStoredUtmParams } from "@/lib/analytics";
import type { CheckoutFormValues, Emirate } from "@/lib/types";

const emptyForm: CheckoutFormValues = {
  fullName: "",
  mobile: "",
  emirate: "",
  city: "",
  address: "",
  apartment: "",
  deliveryNotes: "",
  paymentMethod: "cod",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, shippingFee, total } = useCartTotals();
  const clearCart = useCartStore((s) => s.clear);

  const [form, setForm] = useState<CheckoutFormValues>({
    ...emptyForm,
    paymentMethod: siteConfig.fulfillment.codEnabled ? "cod" : "online",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (lines.length > 0) {
      trackInitiateCheckout({ value: total, numItems: lines.length });
    }
  }, [lines.length, total]);

  const setField = <K extends keyof CheckoutFormValues>(key: K, value: CheckoutFormValues[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof CheckoutFormValues, string>> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!isValidUaeMobile(form.mobile)) next.mobile = "Enter a valid UAE mobile number (e.g. 050 123 4567).";
    if (!form.emirate) next.emirate = "Please select your emirate.";
    if (form.city.trim().length < 2) next.city = "Please enter your city or area.";
    if (form.address.trim().length < 3) next.address = "Please enter your delivery address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      ...form,
      items: lines,
      subtotal,
      shippingFee,
      codFee: 0,
      total,
      utm: getStoredUtmParams(),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      trackPurchase({ value: total, orderId: data.orderRef });

      sessionStorage.setItem(
        "elorae_last_order",
        JSON.stringify({ orderRef: data.orderRef, ...payload })
      );
      clearCart();
      router.push("/order-confirmed");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl text-charcoal">Your cart is empty</h1>
        <p className="text-charcoal-soft">Add {siteConfig.product.displayName} to your cart to check out.</p>
        <Link href="/#shop" className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory">
          Shop {siteConfig.product.name}
        </Link>
      </Container>
    );
  }

  return (
    <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div>
        <h1 className="font-display text-3xl text-charcoal">Checkout</h1>
        <p className="mt-1 text-sm text-charcoal-soft">Complete your order below — it only takes a minute.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-wide text-rose-dark">Contact & Delivery</legend>

            <Field label="Full Name" error={errors.fullName}>
              <input
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                className={inputClass(!!errors.fullName)}
              />
            </Field>

            <Field label="Mobile Number" error={errors.mobile} hint="e.g. 050 123 4567 or +971 50 123 4567">
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="05X XXX XXXX"
                value={form.mobile}
                onChange={(e) => setField("mobile", e.target.value)}
                className={inputClass(!!errors.mobile)}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Emirate" error={errors.emirate}>
                <select
                  value={form.emirate}
                  onChange={(e) => setField("emirate", e.target.value as Emirate)}
                  className={inputClass(!!errors.emirate)}
                >
                  <option value="">Select emirate</option>
                  {siteConfig.fulfillment.emirates.map((emirate) => (
                    <option key={emirate} value={emirate}>
                      {emirate}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="City / Area" error={errors.city}>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={inputClass(!!errors.city)}
                />
              </Field>
            </div>

            <Field label="Address" error={errors.address}>
              <input
                type="text"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                className={inputClass(!!errors.address)}
              />
            </Field>

            <Field label="Apartment / Villa (optional)">
              <input
                type="text"
                value={form.apartment}
                onChange={(e) => setField("apartment", e.target.value)}
                className={inputClass(false)}
              />
            </Field>

            <Field label="Delivery Notes (optional)">
              <textarea
                rows={2}
                value={form.deliveryNotes}
                onChange={(e) => setField("deliveryNotes", e.target.value)}
                className={inputClass(false)}
              />
            </Field>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-rose-dark">Payment Method</legend>
            {siteConfig.fulfillment.codEnabled && (
              <PaymentOption
                id="cod"
                label="Cash on Delivery"
                description="Pay in cash when your order arrives."
                checked={form.paymentMethod === "cod"}
                onChange={() => setField("paymentMethod", "cod")}
              />
            )}
            {siteConfig.fulfillment.onlinePaymentEnabled && (
              <PaymentOption
                id="online"
                label="Online Payment"
                description="Pay securely online."
                checked={form.paymentMethod === "online"}
                onChange={() => setField("paymentMethod", "online")}
              />
            )}
          </fieldset>

          {submitError && (
            <p role="alert" className="rounded-lg bg-rose-light/60 px-4 py-3 text-sm text-rose-dark">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-charcoal px-6 py-4 text-sm font-medium text-ivory transition-colors hover:bg-charcoal-soft disabled:opacity-60"
          >
            {submitting ? "Placing your order…" : `Place Order — ${formatPrice(total)}`}
          </button>
          <p className="text-center text-xs text-charcoal-soft">
            Secure checkout. Your order will be confirmed via WhatsApp / phone call after placing it.
          </p>
        </form>
      </div>

      <aside className="h-fit rounded-2xl border border-charcoal/10 bg-cream/60 p-6">
        <h2 className="font-display text-lg text-charcoal">Order Summary</h2>
        <ul className="mt-4 space-y-3">
          {lines.map((line) => (
            <li key={line.id} className="flex justify-between text-sm">
              <span className="text-charcoal-soft">
                {siteConfig.product.name} — {line.label} × {line.quantity}
              </span>
              <span className="font-medium text-charcoal">{formatPrice(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-4 text-sm text-charcoal-soft">
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
      </aside>
    </Container>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-charcoal",
    hasError ? "border-rose-dark" : "border-charcoal/15"
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-charcoal-soft">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1 block text-xs text-rose-dark">
          {error}
        </span>
      )}
    </label>
  );
}

function PaymentOption({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 transition-colors",
        checked ? "border-charcoal bg-cream" : "border-charcoal/15"
      )}
    >
      <input type="radio" name="paymentMethod" id={id} checked={checked} onChange={onChange} className="mt-1" />
      <span>
        <span className="block text-sm font-medium text-charcoal">{label}</span>
        <span className="block text-xs text-charcoal-soft">{description}</span>
      </span>
    </label>
  );
}
