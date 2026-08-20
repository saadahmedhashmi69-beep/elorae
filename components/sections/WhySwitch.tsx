import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  { title: "Less Fuss", description: "No complicated routine — just an effortless everyday device." },
  { title: "More Control", description: "Groom when you want, on your own schedule." },
  { title: "More Convenience", description: "No appointment required, no waiting." },
  { title: "More Confidence", description: "Feel comfortable in your skin, every day." },
];

export function WhySwitch() {
  return (
    <section id="why-duosmooth" className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Why Women Switch" title="A Simpler Way to Feel Ready." />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <div key={reason.title} className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-rose-light font-display text-lg text-rose-dark">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display text-lg text-charcoal">{reason.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal-soft">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
