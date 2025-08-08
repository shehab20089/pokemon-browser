import { Skeleton } from "@/components/ui/skeleton";

type Props = { count: number };

export default function PokemonGridSkeleton({ count }: Props) {
  return (
    <div className="grid gap-4 p-2 sm:p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border bg-background/80 p-3 shadow-sm"
        >
          <div className="rounded-md bg-muted/40 aspect-square grid place-items-center overflow-hidden">
            <Skeleton className="h-28 w-28" />
          </div>
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-3 w-10 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
