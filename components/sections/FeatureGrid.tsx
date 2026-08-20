import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

const iconPaths = {
  duohead: "M6 4h5a3 3 0 013 3v2M6 4a2 2 0 00-2 2v3a2 2 0 002 2M6 4v7m8-2v9a2 2 0 01-2 2H8a2 2 0 01-2-2v-2",
  electric: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
  areas: "M12 4a4 4 0 100 8 4 4 0 000-8zM4 20c0-4 3.5-6 8-6s8 2 8 6",
  battery: "M3 9h13a2 2 0 012 2v2a2 2 0 01-2 2H3zM21 11v2",
  clean: "M9 3v3M15 3v3M5 9h14l-1.5 9.5a2 2 0 01-2 1.5H8.5a2 2 0 01-2-1.5L5 9z",
  compact: "M4 7h16v13H4zM4 7l2-4h12l2 4",
} as const;

function buildFeatures() {
  const attrs = siteConfig.productAttributes;
  const features: { icon: keyof typeof iconPaths; title: string; description: string }[] = [];

  if (attrs.doubleHeadDesign) {
    features.push({ icon: "duohead", title: "Double-Head Design", description: "Two specialized surfaces for different grooming needs." });
  }
  if (attrs.electricOperation) {
    features.push({ icon: "electric", title: "Electric Operation", description: "No blade changes, no waxing kit — just switch it on." });
  }
  if (attrs.multipleGroomingAreas) {
    features.push({ icon: "areas", title: "Multiple Grooming Areas", description: "Built for legs, arms, underarms, face and bikini line." });
  }
  if (attrs.rechargeable) {
    features.push({ icon: "battery", title: "Rechargeable", description: "Cord-free convenience for everyday use." });
  }
  if (attrs.easyToClean) {
    features.push({ icon: "clean", title: "Easy to Clean", description: "A simple routine to keep your device fresh." });
  }
  if (attrs.compactTravelFriendly) {
    features.push({ icon: "compact", title: "Compact Design", description: "Easy to store and take with you." });
  }

  return features;
}

export function FeatureGrid() {
  const features = buildFeatures();
  if (features.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="The Details" title="Thoughtfully Designed, End to End." />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-charcoal/10 p-7">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7 text-rose-dark">
                <path d={iconPaths[feature.icon]} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-4 font-display text-lg text-charcoal">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal-soft">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
