import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

function buildFaqs() {
  const { fulfillment, productAttributes, contact } = siteConfig;

  const faqs: { question: string; answer: string }[] = [
    {
      question: "Is DuoSmooth suitable for sensitive skin?",
      answer:
        "DuoSmooth is designed for gentle, everyday grooming. As with any grooming device, we recommend a patch test on a small area first, and discontinuing use if you notice irritation.",
    },
    {
      question: "Where can I use it?",
      answer:
        "DuoSmooth is designed for legs, arms, underarms, appropriate facial areas and the external bikini line, using the two grooming heads suited to each area.",
    },
    {
      question: "Can I use it on my face?",
      answer:
        "Yes — the precision head is designed for gentle use on appropriate facial areas such as the upper lip and jawline edges.",
    },
    {
      question: "Is it waterproof?",
      answer: productAttributes.waterproof
        ? "Yes, DuoSmooth is designed for use in the shower as well as dry use."
        : "We're confirming the exact water-resistance rating for DuoSmooth. Until then, we recommend dry use only.",
    },
    {
      question: "How do I clean it?",
      answer: productAttributes.easyToClean
        ? "Remove the head, tap out loose hair, and wipe down the body with a dry or slightly damp cloth between uses."
        : "Full cleaning instructions are included with your device. We'll publish detailed care guidance here shortly.",
    },
    {
      question: "Do you offer Cash on Delivery?",
      answer: fulfillment.codEnabled
        ? "Yes, Cash on Delivery is available across the UAE, alongside secure online payment where offered."
        : "Cash on Delivery is not currently available — orders are placed via secure checkout.",
    },
    {
      question: "Do you deliver across the UAE?",
      answer: `Yes, we deliver to ${fulfillment.emirates.join(", ")}.`,
    },
    {
      question: "How long does delivery take?",
      answer: `Orders typically arrive within ${fulfillment.deliveryDaysMin}–${fulfillment.deliveryDaysMax} business days.`,
    },
    {
      question: "What is your return policy?",
      answer: `If your DuoSmooth arrives faulty or not as described, contact us within ${fulfillment.returnPolicyDays} days of delivery and we'll help make it right.`,
    },
    {
      question: "How can I contact support?",
      answer: contact.whatsappNumber
        ? `Message us on WhatsApp or email ${contact.supportEmail} — we're happy to help.`
        : `Email us at ${contact.supportEmail} — we're happy to help.`,
    },
  ];

  return faqs;
}

export function FAQSection() {
  const faqs = buildFaqs();

  return (
    <section id="faq" className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, Answered" />

        <div className="mt-10 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10 bg-ivory">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-charcoal sm:text-lg">
                {faq.question}
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-4 w-4 shrink-0 text-charcoal-soft transition-transform group-open:rotate-45"
                >
                  <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
