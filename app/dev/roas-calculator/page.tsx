import { notFound } from "next/navigation";
import { RoasCalculator } from "@/components/dev/RoasCalculator";

export const metadata = { robots: { index: false, follow: false } };

/** Internal planning tool. Not linked from the site nav and excluded from robots.txt. */
export default function RoasCalculatorPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-2xl text-charcoal">ROAS &amp; Profitability Calculator (Dev Only)</h1>
      <p className="mt-2 text-sm text-charcoal-soft">
        Internal planning tool. ROAS = Revenue / Ad Spend. Figures here are calculator outputs, not
        guarantees — actual results depend on delivered, non-refused, non-returned orders.
      </p>
      <RoasCalculator />
    </div>
  );
}
