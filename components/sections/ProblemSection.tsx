import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

const problems = [
  { title: "Razors", points: ["Cuts", "Bumps", "Constant blade replacements"] },
  { title: "Waxing", points: ["Discomfort", "Salon appointments", "Time-consuming"] },
  { title: "Salons", points: ["Cost", "Scheduling hassle", "Inconvenient"] },
];

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading title="Your Routine Shouldn't Feel Like a Chore." />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="rounded-2xl border border-charcoal/10 bg-cream/60 p-7">
              <h3 className="font-display text-xl text-charcoal">{problem.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {problem.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-charcoal-soft">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-dark" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-display text-2xl text-charcoal sm:text-3xl">
            Meet {siteConfig.product.name}<span className="align-super text-sm">™</span>.
          </p>
        </div>
      </Container>
    </section>
  );
}
