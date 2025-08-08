// Load-more list: no intersection observer; manual button only
import PokemonGrid from "../components/pokemon-grid";
import PokemonGridSkeleton from "../components/pokemon-grid-skeleton";
import { Button } from "@/components/ui/button";
import { useInfinitePokemonList } from "../hooks/useInfinitePokemonList";

const PAGE_SIZE = 20;

export default function PokemonScrollListPage() {
  const { query, items } = useInfinitePokemonList({ pageSize: PAGE_SIZE });

  if (query.isLoading) return <PokemonGridSkeleton count={PAGE_SIZE} />;

  if (query.isError) {
    return (
      <div className="p-4 text-destructive">
        {(query.error as Error).message}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <PokemonGrid items={items} />

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
