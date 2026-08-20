import { cn } from "@/lib/utils";

export function StarRating({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5 text-gold", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
