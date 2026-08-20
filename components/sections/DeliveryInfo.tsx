import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export function DeliveryInfo() {
  const { emirates, deliveryDaysMin, deliveryDaysMax } = siteConfig.fulfillment;

  return (
    <section id="delivery" className="py-14 sm:py-16">
      <Container className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-dark">Delivered Across the UAE</p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-charcoal-soft">
          {emirates.map((emirate) => (
            <span key={emirate}>{emirate}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-charcoal-soft">
          Estimated delivery: {deliveryDaysMin}–{deliveryDaysMax} business days.
        </p>
      </Container>
    </section>
  );
}
