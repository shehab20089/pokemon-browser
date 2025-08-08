import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentProps<"div"> & {
  value: number;
  max?: number;
  barClassName?: string;
};

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
  ...props
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      className={cn("h-2 w-full rounded bg-muted", className)}
      {...props}
    >
      <div
        className={cn("h-full rounded bg-foreground/80", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
