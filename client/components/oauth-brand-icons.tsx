import { cn } from "@/lib/utils";

type BrandIconProps = { className?: string };

export function GoogleBrandIcon({ className }: BrandIconProps) {
  return (
    <img
      src="/icons/google.svg"
      alt=""
      width={16}
      height={16}
      className={cn("size-4 shrink-0 object-contain", className)}
      aria-hidden
    />
  );
}

export function GithubBrandIcon({ className }: BrandIconProps) {
  return (
    <img
      src="/icons/github.svg"
      alt=""
      width={16}
      height={16}
      className={cn("size-4 shrink-0 object-contain", className)}
      aria-hidden
    />
  );
}
