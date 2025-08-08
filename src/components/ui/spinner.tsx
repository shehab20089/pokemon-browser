import { cn } from "@/lib/utils";

type SpinnerProps = React.ComponentProps<"div"> & {
  size?: number;
};

export function Spinner({ size = 20, className, ...props }: SpinnerProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };
  return (
    <div
      role="status"
      aria-label="loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-primary border-t-transparent",
        className
      )}
      style={style}
      {...props}
    />
  );
}
