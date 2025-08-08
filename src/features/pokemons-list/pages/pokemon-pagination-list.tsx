import { useState } from "react";
import { Link } from "react-router-dom";
import pokemonsListApi from "../api";
import { useGetPokemonList } from "../hooks/useGetPokemonList";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 20;

export default function PokemonListPage() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading, isError, error, isFetching } = useGetPokemonList({
    limit: PAGE_SIZE,
    offset,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.results.map((p) => {
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
