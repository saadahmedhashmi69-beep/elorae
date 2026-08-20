import { siteConfig } from "@/lib/config";

export function AnnouncementBar() {
  const { deliveryDaysMin, deliveryDaysMax, codEnabled } = siteConfig.fulfillment;
  const parts = [
    `Delivered across the UAE in ${deliveryDaysMin}–${deliveryDaysMax} days`,
    codEnabled ? "Cash on Delivery available" : undefined,
  ].filter(Boolean);

  return (
    <div className="bg-charcoal py-2 text-center text-xs tracking-wide text-ivory/90">
      {parts.join("  ·  ")}
    </div>
  );
}
