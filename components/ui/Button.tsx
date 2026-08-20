import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-charcoal text-ivory hover:bg-charcoal-soft",
  secondary: "bg-rose text-ivory hover:bg-rose-dark",
  outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  ghost: "text-charcoal hover:bg-champagne/60",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type LinkAsButtonProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ variant = "primary", size = "md", className, children, href, ...props }: LinkAsButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");
  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
