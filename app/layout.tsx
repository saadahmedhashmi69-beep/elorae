import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { PixelScripts } from "@/components/providers/PixelScripts";
import { AnalyticsInit } from "@/components/providers/AnalyticsInit";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.url),
  title: {
    default: `${siteConfig.product.displayName} | Women's Electric Body Shaver UAE — ${siteConfig.brand.displayName}`,
    template: `%s | ${siteConfig.brand.displayName}`,
  },
  description:
    "ELORAÉ DuoSmooth — a premium double-head electric body shaver for women in the UAE. Effortless everyday grooming for legs, arms, underarms, face and bikini line. UAE-wide delivery, Cash on Delivery available.",
  keywords: [
    "women's electric shaver UAE",
    "ladies body shaver UAE",
    "women's body shaver Dubai",
    "electric body shaver for women UAE",
    "women's bikini trimmer UAE",
    "ladies electric razor UAE",
  ],
  openGraph: {
    title: `${siteConfig.product.displayName} — Smooth Skin, Made Simple`,
    description: siteConfig.product.shortDescription,
    url: siteConfig.brand.url,
    siteName: siteConfig.brand.displayName,
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.product.displayName} — Smooth Skin, Made Simple`,
    description: siteConfig.product.shortDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <AnalyticsInit />
        <PixelScripts />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StickyMobileCTA />
        <CartDrawer />
      </body>
    </html>
  );
}
