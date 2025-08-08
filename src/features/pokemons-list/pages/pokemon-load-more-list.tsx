// Load-more list: no intersection observer; manual button only
import { Link } from "react-router-dom";
import pokemonsListApi from "../api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfinitePokemonList } from "../hooks/useInfinitePokemonList";

const PAGE_SIZE = 20;

export default function PokemonScrollListPage() {
  const { query, items } = useInfinitePokemonList({ pageSize: PAGE_SIZE });

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="p-4 text-destructive">
        {(query.error as Error).message}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((p) => {
          const id = pokemonsListApi.extractPokemonIdFromUrl(p.url);
          const sprite = id
            ? pokemonsListApi.buildPokemonSpriteUrl(id)
            : undefined;
          return (
            <Link
              key={p.name}
              to={`/pokemon/${id ?? p.name}`}
              className="rounded-md border p-3 hover:bg-accent"
            >
              {sprite ? (
                <img
                  src={sprite}
                  alt={p.name}
                  className="w-20 h-20 object-contain mx-auto"
                />
              ) : (
                <div className="w-20 h-20 mx-auto" />
              )}
              <div className="mt-2 text-center capitalize">{p.name}</div>
            </Link>
          );
        })}
      </div>

      {query.hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            disabled={query.isFetchingNextPage}
            onClick={() => query.fetchNextPage()}
          >
            {query.isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
