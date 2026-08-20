"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useCartTotals, useCartStore } from "@/store/cart-store";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-duosmooth", label: "Why DuoSmooth" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function CartIcon({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-champagne/60"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-dark text-[10px] font-medium text-ivory">
          {count}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCartTotals();
  const openCart = useCartStore((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/5 bg-ivory/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-charcoal sm:text-2xl">
          {siteConfig.brand.displayName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-soft transition-colors hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#shop"
            className="hidden rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-charcoal-soft sm:inline-flex"
          >
            Shop Now
          </a>
          <CartIcon count={itemCount} onClick={openCart} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-charcoal/5 bg-ivory transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-soft hover:bg-champagne/60 hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}
