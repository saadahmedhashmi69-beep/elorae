"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { siteConfig } from "@/lib/config";
import type { BundleOption, CartLine } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addBundle: (bundle: BundleOption) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

const round = (value: number) => Math.round(value * 100) / 100;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addBundle: (bundle) => {
        const existing = get().lines.find((line) => line.bundleId === bundle.id);
        if (existing) {
          get().setQuantity(existing.id, existing.quantity + 1);
          set({ isOpen: true });
          return;
        }
        const line: CartLine = {
          id: `${bundle.id}-${Date.now()}`,
          bundleId: bundle.id,
          label: bundle.label,
          units: bundle.units,
          quantity: 1,
          unitPrice: bundle.totalPrice,
          lineTotal: bundle.totalPrice,
        };
        set({ lines: [...get().lines, line], isOpen: true });
      },
      removeLine: (id) => set({ lines: get().lines.filter((line) => line.id !== id) }),
      setQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeLine(id);
          return;
        }
        set({
          lines: get().lines.map((line) =>
            line.id === id ? { ...line, quantity, lineTotal: round(line.unitPrice * quantity) } : line
          ),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "elorae-cart" }
  )
);

export function useCartTotals() {
  const lines = useCartStore((state) => state.lines);
  const subtotal = round(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const shippingFee = subtotal > 0 ? siteConfig.pricing.shippingFee : 0;
  const total = round(subtotal + shippingFee);
  return { lines, subtotal, itemCount, shippingFee, total };
}
