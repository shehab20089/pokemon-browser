// Load-more list: no intersection observer; manual button only
import PokemonGrid from "../components/pokemon-grid";
import PokemonGridSkeleton from "../components/pokemon-grid-skeleton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useInfinitePokemonList } from "../hooks/useInfinitePokemonList";

const PAGE_SIZE = 20;

export default function PokemonLoadMoreListPage() {
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
    <div className="p-4 space-y-6">
      <PokemonGrid items={items} />

      <div className="space-y-3 text-center">
        {query.isFetchingNextPage ? (
          <div className="flex items-center justify-center gap-3 py-2">
            <Spinner size={18} className="border-2" />
            <span>Loading more Pokémon…</span>
          </div>
        ) : query.hasNextPage ? (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => query.fetchNextPage()}
            >
              Load more
            </Button>
          </div>
        ) : null}
        <div className="text-sm text-muted-foreground">
          Showing {items.length} Pokémon
        </div>
      </div>
    </div>
  );
}
