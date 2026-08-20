"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";
import { cn } from "@/lib/utils";

const heads = [
  {
    id: "head1" as const,
    label: "Head 01",
    name: "Smooth & Refine",
    description:
      "The wider grooming head is designed for everyday coverage — gliding over larger areas like legs and arms for a smooth, efficient routine.",
  },
  {
    id: "head2" as const,
    label: "Head 02",
    name: "Trim & Reach",
    description:
      "The precision head is designed for smaller, detailed areas — underarms, the bikini line and facial edges — where more control matters.",
  },
];

export function DoubleHeadSection() {
  const [active, setActive] = useState<"head1" | "head2">("head1");
  const current = heads.find((h) => h.id === active)!;

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Two Heads. One Effortless Routine."
          subtitle="DuoSmooth pairs two specialized grooming surfaces on a single elegant device."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductPlaceholder
            slot={`double-head close-up — ${current.name}`}
            variant="rose"
            highlight={active}
            aspect="aspect-square"
            className="mx-auto w-full max-w-md transition-all duration-500"
          />

          <div>
            <div className="flex gap-2">
              {heads.map((head) => (
                <button
                  key={head.id}
                  type="button"
                  onClick={() => setActive(head.id)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                    active === head.id ? "bg-charcoal text-ivory" : "bg-champagne/60 text-charcoal-soft hover:bg-champagne"
                  )}
                >
                  {head.label}
                </button>
              ))}
            </div>

            <div key={current.id} className="mt-6 animate-[fadeIn_0.4s_ease]">
              <h3 className="font-display text-2xl text-charcoal sm:text-3xl">{current.name}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-charcoal-soft">{current.description}</p>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
