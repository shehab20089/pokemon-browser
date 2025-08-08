import { Skeleton } from "@/components/ui/skeleton";

type Props = { count: number };

export default function PokemonGridSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-28" />
      ))}
    </div>
  );
}
