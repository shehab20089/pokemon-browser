import { useQuery } from "@tanstack/react-query";
import pokemonDetailsApi from "../api";

export function usePokemonDetails(idOrName: string | number) {
  return useQuery({
    queryKey: ["pokemon", "details", idOrName],
    queryFn: () => pokemonDetailsApi.fetchPokemonDetails(idOrName),
  });
}
