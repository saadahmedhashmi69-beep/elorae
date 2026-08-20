"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-charcoal">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-charcoal/15 bg-ivory px-3 py-2 text-sm"
      />
    </label>
  );
}

export function RoasCalculator() {
  const [adSpendPkr, setAdSpendPkr] = useState(10000);
  const [pkrToAed, setPkrToAed] = useState(0.013);
  const [ordersPlaced, setOrdersPlaced] = useState(20);
  const [deliveredRate, setDeliveredRate] = useState(70);
  const [refusedRate, setRefusedRate] = useState(20);
  const [returnedRate, setReturnedRate] = useState(10);
  const [aov, setAov] = useState(siteConfig.pricing.price);
  const [productCost, setProductCost] = useState(25);
  const [codFee, setCodFee] = useState(5);
  const [shippingCost, setShippingCost] = useState(10);

  const adSpendAed = adSpendPkr * pkrToAed;
  const delivered = Math.round(ordersPlaced * (deliveredRate / 100));
  const refused = Math.round(ordersPlaced * (refusedRate / 100));
  const returned = Math.round(ordersPlaced * (returnedRate / 100));

  const revenue = delivered * aov;
  const roas = adSpendAed > 0 ? revenue / adSpendAed : 0;

  const costOfGoods = delivered * productCost;
  const fulfillmentCosts = delivered * (codFee + shippingCost);
  // Refused/returned orders still cost shipping both ways but earn no revenue.
  const wastedShipping = (refused + returned) * shippingCost;
  const grossProfit = revenue - costOfGoods - fulfillmentCosts - wastedShipping - adSpendAed;

  return (
    <div className="mt-8 space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <NumberField label="Ad Spend (PKR)" value={adSpendPkr} onChange={setAdSpendPkr} />
        <NumberField label="PKR → AED rate" value={pkrToAed} onChange={setPkrToAed} />
        <NumberField label="Orders Placed" value={ordersPlaced} onChange={setOrdersPlaced} />
        <NumberField label="AOV (AED)" value={aov} onChange={setAov} />
        <NumberField label="Delivered %" value={deliveredRate} onChange={setDeliveredRate} />
        <NumberField label="Refused %" value={refusedRate} onChange={setRefusedRate} />
        <NumberField label="Returned %" value={returnedRate} onChange={setReturnedRate} />
        <NumberField label="Product Cost (AED)" value={productCost} onChange={setProductCost} />
        <NumberField label="COD Fee (AED)" value={codFee} onChange={setCodFee} />
        <NumberField label="Shipping Cost (AED)" value={shippingCost} onChange={setShippingCost} />
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-cream/60 p-6">
        <h2 className="font-display text-lg text-charcoal">Results</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <dt className="text-charcoal-soft">Ad Spend (AED)</dt>
          <dd className="text-right font-medium">{adSpendAed.toFixed(2)}</dd>
          <dt className="text-charcoal-soft">Delivered Orders</dt>
          <dd className="text-right font-medium">{delivered}</dd>
          <dt className="text-charcoal-soft">Revenue (AED)</dt>
          <dd className="text-right font-medium">{revenue.toFixed(2)}</dd>
          <dt className="text-charcoal-soft">Revenue ROAS</dt>
          <dd className="text-right font-medium">{roas.toFixed(2)}x</dd>
          <dt className="text-charcoal-soft">Gross Profit (AED)</dt>
          <dd className={`text-right font-semibold ${grossProfit >= 0 ? "text-charcoal" : "text-rose-dark"}`}>
            {grossProfit.toFixed(2)}
          </dd>
        </dl>
        <p className="mt-4 text-xs text-charcoal-soft">
          Revenue ROAS and profitability are distinct: ROAS only reflects revenue vs. ad spend, while gross profit
          also subtracts product cost, COD fees, shipping (including wasted shipping on refused/returned orders).
          These are calculator outputs based on the assumptions above — not guarantees of results.
        </p>
      </div>
    </div>
  );
}
