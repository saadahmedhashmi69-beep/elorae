import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-rose-dark">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-charcoal-soft sm:text-lg">{subtitle}</p>}
    </div>
  );
}
