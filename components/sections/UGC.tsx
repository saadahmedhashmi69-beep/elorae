import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";

const variants = ["ivory", "champagne", "rose", "ivory", "champagne", "rose"] as const;

export function UGC() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Community"
          title="Real Routines, Real Women"
          subtitle="This grid is ready for customer videos, Instagram-style content and UGC — add real media as it comes in from customers and creators."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {variants.map((variant, i) => (
            <ProductPlaceholder key={i} slot={`UGC placeholder ${i + 1}`} variant={variant} aspect="aspect-[9/16]" />
          ))}
        </div>
      </Container>
    </section>
  );
}
