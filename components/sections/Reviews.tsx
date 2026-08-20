import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";

/**
 * DEMO CONTENT — these are illustrative placeholders showing how the
 * reviews layout will look, NOT real customer testimonials. Replace with
 * genuine verified reviews once available; do not present this content as
 * real customer feedback in production. See README "Replacing demo reviews".
 */
const demoReviews = [
  {
    quote: "Sample review layout — a short quote about ease of use would go here.",
    name: "Sample Reviewer",
    location: "Dubai, UAE",
  },
  {
    quote: "Sample review layout — a short quote about the double-head design would go here.",
    name: "Sample Reviewer",
    location: "Abu Dhabi, UAE",
  },
  {
    quote: "Sample review layout — a short quote about the overall experience would go here.",
    name: "Sample Reviewer",
    location: "Sharjah, UAE",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="In Her Words"
          subtitle="Illustrative preview of the reviews layout — real, verified customer reviews will replace this content as they come in."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {demoReviews.map((review, i) => (
            <div key={i} className="relative rounded-2xl border border-charcoal/10 bg-ivory p-6">
              <span className="absolute right-4 top-4 rounded-full bg-champagne px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-charcoal-soft">
                Sample
              </span>
              <StarRating />
              <p className="mt-3 text-sm italic leading-relaxed text-charcoal-soft">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-charcoal">{review.name}</p>
              <p className="text-xs text-charcoal-soft">{review.location}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
