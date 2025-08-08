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
          <Skeleton className="h-[150px] w-full" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-full " />
            <Skeleton className="h-4 w-full " />
          </div>
        </div>
      ))}
    </div>
  );
}
