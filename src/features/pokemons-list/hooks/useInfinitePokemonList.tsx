import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import pokemonsListApi from "../api";

type Params = {
  pageSize?: number;
  initialOffset?: number;
};

export function useInfinitePokemonList({
  pageSize = 20,
  initialOffset = 0,
}: Params) {
  const query = useInfiniteQuery({
    queryKey: ["pokemon", "infinite", pageSize] as const,
    queryFn: ({ pageParam }) =>
      pokemonsListApi.fetchPokemonPage(
        pageSize,
        (pageParam as number | undefined) ?? initialOffset
      ),
    initialPageParam: initialOffset,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const offset = Number(url.searchParams.get("offset") ?? 0);
      return offset;
    },
  });

  const items = useMemo(
    () => query.data?.pages.flatMap((p) => p.results) ?? [],
    [query.data]
  );

  return { query, items };
}
