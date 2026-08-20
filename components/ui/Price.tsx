import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  compareAt,
  size = "md",
  className,
}: {
  amount: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const showCompare = compareAt && compareAt > amount;
  const sizes = {
    sm: { price: "text-lg", compare: "text-sm" },
    md: { price: "text-2xl", compare: "text-base" },
    lg: { price: "text-4xl sm:text-5xl", compare: "text-xl" },
  }[size];

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-display font-semibold text-charcoal", sizes.price)}>{formatPrice(amount)}</span>
      {showCompare && (
        <span className={cn("text-charcoal-soft/70 line-through", sizes.compare)}>{formatPrice(compareAt)}</span>
      )}
    </span>
  );
}
