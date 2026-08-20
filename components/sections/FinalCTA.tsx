import { siteConfig, isWhatsAppConfigured } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductPlaceholder } from "@/components/ui/DeviceIllustration";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section className="bg-charcoal py-16 text-ivory sm:py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">Smooth Skin Starts Here.</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ivory/75 sm:text-lg lg:mx-0">
            Meet the easier way to make everyday grooming part of your routine.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <LinkButton href="#shop" variant="secondary" size="lg">
              Shop {siteConfig.product.name}™
            </LinkButton>
            {isWhatsAppConfigured() && (
              <LinkButton href={buildWhatsAppLink(`Hi ${siteConfig.brand.displayName}! I'd like to know more about ${siteConfig.product.displayName}.`)} variant="outline" size="lg" className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
                Chat on WhatsApp
              </LinkButton>
            )}
          </div>
        </div>
        <ProductPlaceholder slot="final CTA, hero product" variant="charcoal" aspect="aspect-[4/5]" className="mx-auto w-full max-w-sm" />
      </Container>
    </section>
  );
}
