import { cn } from "@/lib/utils";

/**
 * Line-art illustration of the DuoSmooth device.
 *
 * This is a placeholder photography system: every "product photo" slot on
 * the site renders through ProductPlaceholder so the whole site keeps a
 * consistent, premium look before real product photography is available.
 * To swap in real photography later, replace <ProductPlaceholder slot="x" />
 * usages with next/image pointing at /public/images/product/x.jpg — see
 * README.md "Replacing placeholder photography".
 */
export function ShaverIcon({
  className,
  highlight = "none",
}: {
  className?: string;
  highlight?: "none" | "head1" | "head2";
}) {
  return (
    <svg viewBox="0 0 220 400" fill="none" className={className} aria-hidden="true">
      <rect x="70" y="120" width="80" height="230" rx="40" stroke="currentColor" strokeWidth="2.5" />
      <line x1="70" y1="300" x2="150" y2="300" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="110" cy="330" r="10" stroke="currentColor" strokeWidth="2" />
      <rect x="86" y="220" width="48" height="14" rx="7" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

      <g opacity={highlight === "head2" ? 0.35 : 1}>
        <rect
          x="52"
          y="40"
          width="56"
          height="90"
          rx="28"
          stroke="currentColor"
          strokeWidth={highlight === "head1" ? 3 : 2.5}
        />
        <line x1="80" y1="55" x2="80" y2="115" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <line x1="66" y1="60" x2="66" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <line x1="94" y1="60" x2="94" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      </g>

      <g opacity={highlight === "head1" ? 0.35 : 1}>
        <rect
          x="112"
          y="55"
          width="52"
          height="70"
          rx="16"
          stroke="currentColor"
          strokeWidth={highlight === "head2" ? 3 : 2.5}
        />
        <line x1="122" y1="70" x2="154" y2="70" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <line x1="122" y1="82" x2="154" y2="82" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <line x1="122" y1="94" x2="154" y2="94" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <line x1="122" y1="106" x2="154" y2="106" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </g>
    </svg>
  );
}

const bgVariants = {
  ivory: "from-ivory via-cream to-champagne",
  champagne: "from-cream via-champagne to-champagne-dark",
  rose: "from-cream via-rose-light to-rose/40",
  charcoal: "from-charcoal-soft via-charcoal to-charcoal",
} as const;

export function ProductPlaceholder({
  slot,
  variant = "ivory",
  highlight = "none",
  aspect = "aspect-[4/5]",
  className,
  iconClassName,
}: {
  slot: string;
  variant?: keyof typeof bgVariants;
  highlight?: "none" | "head1" | "head2";
  aspect?: string;
  className?: string;
  iconClassName?: string;
}) {
  const isDark = variant === "charcoal";
  return (
    <div
      role="img"
      aria-label={`${slot} — ELORAÉ DuoSmooth product photography placeholder`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br",
        bgVariants[variant],
        aspect,
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-champagne-dark/30 blur-2xl" />
      <ShaverIcon
        highlight={highlight}
        className={cn("relative h-2/3 w-auto", isDark ? "text-ivory" : "text-charcoal/70", iconClassName)}
      />
    </div>
  );
}
