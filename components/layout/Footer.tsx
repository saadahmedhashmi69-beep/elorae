import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { isWhatsAppConfigured } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-charcoal/10 bg-cream">
      <Container className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-4 lg:py-16">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-xl font-semibold text-charcoal">{siteConfig.brand.displayName}</p>
          <p className="mt-2 text-sm text-charcoal-soft">{siteConfig.brand.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-charcoal-soft">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-soft">
            <li><a href="#shop" className="hover:text-charcoal">{siteConfig.product.displayName}</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-charcoal-soft">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-soft">
            <li>
              <a href={`mailto:${siteConfig.contact.supportEmail}`} className="hover:text-charcoal">
                Contact
              </a>
            </li>
            {isWhatsAppConfigured() && (
              <li>
                <a href={buildWhatsAppLink("Hi ELORAÉ, I have a question.")} target="_blank" rel="noopener noreferrer" className="hover:text-charcoal">
                  WhatsApp
                </a>
              </li>
            )}
            <li><a href="#delivery" className="hover:text-charcoal">Shipping</a></li>
            <li><a href="#faq" className="hover:text-charcoal">Returns</a></li>
            <li><a href="#faq" className="hover:text-charcoal">FAQ</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-charcoal-soft">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-soft">
            <li><a href="#faq" className="hover:text-charcoal">Privacy</a></li>
            <li><a href="#faq" className="hover:text-charcoal">Terms</a></li>
            <li><a href="#faq" className="hover:text-charcoal">Returns Policy</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-charcoal/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-charcoal-soft sm:flex-row">
          <p>© {year} {siteConfig.brand.displayName}. All rights reserved.</p>
          <p>United Arab Emirates · AED</p>
        </Container>
      </div>
    </footer>
  );
}
