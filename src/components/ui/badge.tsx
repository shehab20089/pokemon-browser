import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "outline";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-primary/90 text-primary-foreground",
    secondary: "bg-muted text-foreground",
    outline: "border border-border",
  };
  return <span className={cn(base, variants[variant], className)} {...props} />;
}
