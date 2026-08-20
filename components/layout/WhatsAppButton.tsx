"use client";

import { isWhatsAppConfigured, siteConfig } from "@/lib/config";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppButton() {
  if (!isWhatsAppConfigured()) return null;

  const href = buildWhatsAppLink(
    `Hi ${siteConfig.brand.displayName}! I have a question about ${siteConfig.product.displayName}.`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick({ location: "floating_button" })}
      className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-charcoal/20 transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.92C21.96 6.45 17.5 2 12.04 2zm5.86 14.03c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.13-.98-.32-1.69-.62-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.31.31-.13.61.18.3.8 1.33 1.72 2.15 1.19 1.06 2.19 1.39 2.49 1.54.3.15.48.13.66-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.72-.17 1.42z" />
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
