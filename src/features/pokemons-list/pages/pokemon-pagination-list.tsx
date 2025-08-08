import { useState } from "react";
import PokemonGrid from "../components/pokemon-grid";
import PokemonGridSkeleton from "../components/pokemon-grid-skeleton";
import { useGetPokemonList } from "../hooks/useGetPokemonList";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

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
  const previousDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="p-4 space-y-4">
      <PokemonGrid items={data?.results ?? []} />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!previousDisabled) setPage((p) => p - 1);
              }}
              className={
                previousDisabled ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" disabled className="pointer-events-none">
              Page {page} / {isFetching ? "…" : totalPages}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!nextDisabled) setPage((p) => p + 1);
              }}
              className={nextDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
