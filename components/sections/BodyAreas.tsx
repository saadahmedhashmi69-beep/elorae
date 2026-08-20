import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";

const areas = [
  { name: "Legs", copy: "Smooth, everyday grooming from ankle to knee." },
  { name: "Arms", copy: "Quick, convenient touch-ups whenever you need them." },
  { name: "Underarms", copy: "Easy grooming for a hard-to-reach area." },
  { name: "Face", copy: "Gentle precision for appropriate facial areas." },
  { name: "Bikini Line", copy: "Controlled grooming for the external bikini line." },
];

export function BodyAreas() {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Where To Use It"
          title="Designed For Your Whole Routine"
          subtitle="One device, thoughtfully designed for the areas women groom most."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {areas.map((area) => (
            <div key={area.name} className="flex flex-col items-center text-center">
              <ProductPlaceholder slot={`${area.name} grooming`} variant="champagne" aspect="aspect-square" className="w-full" />
              <h3 className="mt-4 font-display text-lg text-charcoal">{area.name}</h3>
              <p className="mt-1.5 text-sm text-charcoal-soft">{area.copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
