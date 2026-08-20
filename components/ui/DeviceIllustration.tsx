"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Original vector artwork of the ELORAÉ™ DuoSmooth device.
 *
 * Design is grounded in the real product: a ribbed cylindrical wand with a
 * rounded foil-disc shaving head at one end and a precision trimmer-comb
 * cap at the other, joined to the body by rose-gold collar rings, with a
 * single oval control button at the body's center. This is original
 * illustration work (not a reused photograph) built to accurately reflect
 * the physical design — see README.md "Product photography" for how to
 * swap in real photography once it's available.
 */
function DeviceGraphic({
  className,
  highlight = "none",
  mono = false,
}: {
  className?: string;
  highlight?: "none" | "head1" | "head2";
  mono?: boolean;
}) {
  const uid = useId();
  const bodyGradId = `body-${uid}`;
  const goldGradId = `gold-${uid}`;
  const silverGradId = `silver-${uid}`;
  const capGradId = `cap-${uid}`;
  const shadowId = `shadow-${uid}`;

  const discOpacity = highlight === "head2" ? 0.4 : 1;
  const combOpacity = highlight === "head1" ? 0.4 : 1;

  const bodyFill = mono ? "#f7f0e6" : `url(#${bodyGradId})`;
  const capFill = mono ? "#f2e7db" : `url(#${capGradId})`;
  const discFill = mono ? "#fbf8f4" : `url(#${silverGradId})`;
  const combFill = mono ? "#241f1c" : "#fbf8f4";
  const ribLight = mono ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.35)";
  const ribShadow = mono ? "rgba(36,31,28,0.12)" : "rgba(90,45,40,0.14)";

  return (
    <svg viewBox="0 0 200 460" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={bodyGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f6ddd5" />
          <stop offset="48%" stopColor="#e0b0a7" />
          <stop offset="100%" stopColor="#c2938c" />
        </linearGradient>
        <linearGradient id={capGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbeee8" />
          <stop offset="50%" stopColor="#f0d3ca" />
          <stop offset="100%" stopColor="#dcb0a6" />
        </linearGradient>
        <linearGradient id={goldGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f3dfb8" />
          <stop offset="50%" stopColor="#c9a66b" />
          <stop offset="100%" stopColor="#a3793f" />
        </linearGradient>
        <radialGradient id={silverGradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#dfe3e7" />
          <stop offset="100%" stopColor="#9aa2ab" />
        </radialGradient>
        <radialGradient id={shadowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#241f1c" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#241f1c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="432" rx="52" ry="12" fill={`url(#${shadowId})`} />

      {/* Bottom head — precision trimmer comb */}
      <g opacity={combOpacity}>
        <rect x="70" y="346" width="60" height="66" rx="22" fill={capFill} stroke={mono ? "#00000010" : "#00000012"} />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={78 + i * 6.3} y={400} width="3.2" height="11" rx="1.4" fill={combFill} />
        ))}
        <rect x="70" y="346" width="60" height="10" rx="5" fill="#ffffff" opacity={mono ? 0.15 : 0.25} />
      </g>

      {/* Bottom collar */}
      <rect x="60" y="330" width="80" height="17" rx="7" fill={`url(#${goldGradId})`} />

      {/* Body */}
      <rect x="62" y="152" width="76" height="180" rx="12" fill={bodyFill} />
      {[70, 82, 94, 106, 118, 130].map((x, i) => (
        <line key={x} x1={x} y1="164" x2={x} y2="320" stroke={i % 2 === 0 ? ribLight : ribShadow} strokeWidth="1.4" />
      ))}
      <rect x="66" y="158" width="9" height="168" rx="4.5" fill="#ffffff" opacity={mono ? 0.12 : 0.18} />

      {/* Button */}
      <ellipse cx="100" cy="240" rx="9" ry="15" fill={`url(#${goldGradId})`} stroke="#00000018" />

      {/* Top collar */}
      <rect x="60" y="132" width="80" height="17" rx="7" fill={`url(#${goldGradId})`} />

      {/* Top head — foil shaving disc */}
      <g opacity={discOpacity}>
        <ellipse cx="100" cy="100" rx="44" ry="35" fill={discFill} stroke={mono ? "#00000010" : "#00000014"} />
        <ellipse cx="100" cy="100" rx="30" ry="23" fill="none" stroke={mono ? "#00000014" : "#ffffff"} strokeOpacity={mono ? 1 : 0.55} strokeWidth="1.2" />
        <ellipse cx="100" cy="100" rx="17" ry="13" fill="none" stroke={mono ? "#00000014" : "#ffffff"} strokeOpacity={mono ? 1 : 0.4} strokeWidth="1" />
        <ellipse cx="88" cy="90" rx="12" ry="7" fill="#ffffff" opacity={mono ? 0.25 : 0.5} />
      </g>
    </svg>
  );
}

function BundleGroup({ count, mono }: { count: 2 | 3; mono?: boolean }) {
  const layouts = {
    2: [
      { rot: -8, z: 1, w: "56%", shift: "6%" },
      { rot: 8, z: 2, w: "56%", shift: "-6%" },
    ],
    3: [
      { rot: -12, z: 1, w: "50%", shift: "16%" },
      { rot: 0, z: 3, w: "52%", shift: "0%" },
      { rot: 12, z: 1, w: "50%", shift: "-16%" },
    ],
  } as const;

  return (
    <div className="relative flex h-2/3 w-full items-center justify-center">
      {layouts[count].map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{ width: item.w, zIndex: item.z, transform: `translateX(${item.shift}) rotate(${item.rot}deg)` }}
        >
          <DeviceGraphic mono={mono} className="h-auto w-full drop-shadow-lg" />
        </div>
      ))}
    </div>
  );
}

function ShelfScene() {
  return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect x="0" y="228" width="300" height="72" fill="#e7d6c0" opacity="0.55" />
      <rect x="0" y="225" width="300" height="6" fill="#ffffff" opacity="0.5" />
      <circle cx="235" cy="200" r="24" fill="#c9a66b" opacity="0.25" />
      <circle cx="245" cy="185" r="10" fill="#c2938c" opacity="0.3" />
    </svg>
  );
}

function BagScene() {
  return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="45" y="70" width="210" height="185" rx="30" fill="#ecdcc4" opacity="0.6" />
      <path d="M75 70 Q150 30 225 70" fill="none" stroke="#d9c19c" strokeWidth="3" opacity="0.7" />
      <line x1="65" y1="98" x2="235" y2="98" stroke="#a26f6a" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
      <circle cx="150" cy="98" r="5" fill="#a26f6a" opacity="0.5" />
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
  scene,
  aspect = "aspect-[4/5]",
  className,
  iconClassName,
}: {
  slot: string;
  variant?: keyof typeof bgVariants;
  highlight?: "none" | "head1" | "head2";
  /** Adds simple illustrated context behind the device, or renders a multi-unit bundle composition. */
  scene?: "shelf" | "bag" | "duo" | "trio";
  aspect?: string;
  className?: string;
  iconClassName?: string;
}) {
  const mono = variant === "charcoal";

  return (
    <div
      role="img"
      aria-label={`${slot} — ELORAÉ DuoSmooth`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br",
        bgVariants[variant],
        aspect,
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-champagne-dark/30 blur-2xl" />
      {scene === "shelf" && <ShelfScene />}
      {scene === "bag" && <BagScene />}

      {scene === "duo" || scene === "trio" ? (
        <BundleGroup count={scene === "duo" ? 2 : 3} mono={mono} />
      ) : (
        <DeviceGraphic highlight={highlight} mono={mono} className={cn("relative h-3/4 w-auto drop-shadow-lg", iconClassName)} />
      )}
    </div>
  );
}
