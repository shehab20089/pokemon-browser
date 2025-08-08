import { useQuery } from "@tanstack/react-query";
import pokemonsListApi from "../api";

type Params = { limit: number; offset: number };

export function useGetPokemonList({ limit, offset }: Params) {
  return useQuery({
    queryKey: ["pokemon", "page", limit, offset] as const,
    queryFn: () => pokemonsListApi.fetchPokemonPage(limit, offset),
    placeholderData: (prev) => prev,
  });
}
