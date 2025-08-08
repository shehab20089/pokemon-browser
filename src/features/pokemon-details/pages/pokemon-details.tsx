import { useParams } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { Skeleton } from "@/components/ui/skeleton";

export default function PokemonDetailsPage() {
  const params = useParams<{ id: string }>();
  const idOrName = params.id!;

  const { data, isLoading, isError, error } = usePokemonDetails(idOrName);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-40 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-destructive">{(error as Error).message}</div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold capitalize">{data?.name}</h2>
      {data?.sprites?.other?.["official-artwork"]?.front_default && (
        <img
          src={data.sprites.other?.["official-artwork"]?.front_default}
          alt={data.name}
          className="w-40 h-40"
        />
      )}
      <div className="text-sm text-muted-foreground">
        Height: {data?.height} | Weight: {data?.weight}
      </div>
    </div>
  );
}
