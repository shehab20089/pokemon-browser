import { useState } from "react";
import PokemonGrid from "../components/pokemon-grid";
import PokemonGridSkeleton from "../components/pokemon-grid-skeleton";
import { useGetPokemonList } from "../hooks/useGetPokemonList";
import NumberedPagination from "../components/numbered-pagination";

const PAGE_SIZE = 20;

export default function PokemonListPage() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading, isError, error, isFetching } = useGetPokemonList({
    limit: PAGE_SIZE,
    offset,
  });

  if (isLoading) return <PokemonGridSkeleton count={PAGE_SIZE} />;

  if (isError) {
    return (
      <div className="p-4 text-destructive">{(error as Error).message}</div>
    );
  }

  const total = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="p-4 space-y-4">
      <PokemonGrid items={data?.results ?? []} />

      <NumberedPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        totalCount={total}
        isFetching={isFetching}
      />
    </div>
  );
}
