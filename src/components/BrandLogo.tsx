import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  variant?: "default" | "light";
}

/**
 * Cuidarei brand lockup — protective "C" arc cradling a heart mark.
 * Uses semantic tokens so it adapts to light/dark surfaces.
 */
export function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
  variant = "default",
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark className={markClassName} />
      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-tight text-[1.125rem] leading-none",
            variant === "light" ? "text-white" : "text-foreground",
            wordmarkClassName,
          )}
          style={{ letterSpacing: "-0.02em" }}
        >
          Cuidarei
        </span>
      )}
    </span>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-8 w-8 items-center justify-center rounded-[10px]",
        "bg-gradient-to-br from-primary to-accent",
        "shadow-[0_6px_16px_-6px_hsl(var(--primary)/0.55)]",
        "ring-1 ring-white/20",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
      >
        {/* Protective arc — a stylised "C" */}
        <path
          d="M20 7.5a7.5 7.5 0 1 0 0 9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        {/* Heart nestled inside the arc */}
        <path
          d="M12 16.2c-.15 0-.3-.05-.42-.16-.9-.77-1.62-1.43-2.16-1.97-1.06-1.07-1.42-1.88-1.42-2.7 0-1.24.96-2.2 2.18-2.2.72 0 1.4.34 1.82.89.42-.55 1.1-.89 1.82-.89 1.22 0 2.18.96 2.18 2.2 0 .82-.36 1.63-1.42 2.7-.54.54-1.26 1.2-2.16 1.97-.12.11-.27.16-.42.16Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export default BrandLogo;
