import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";

export function TrustBar() {
  const items = [
    "UAE-Wide Delivery",
    siteConfig.fulfillment.codEnabled ? "Cash on Delivery*" : undefined,
    "Secure Checkout",
    siteConfig.contact.whatsappNumber ? "WhatsApp Support" : undefined,
    "Easy Ordering",
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="border-y border-charcoal/10 bg-charcoal">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-center">
        {items.map((item) => (
          <span key={item} className="text-xs font-medium uppercase tracking-wide text-ivory/85 sm:text-sm">
            {item}
          </span>
        ))}
      </Container>
    </div>
  );
}
