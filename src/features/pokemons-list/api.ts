import axiosInstance from "@/lib/axios";
import type { PokemonListResponse } from "./types";

const pokemonsListApi = {
  fetchPokemonPage: async function (
    limit: number,
    offset: number
  ): Promise<PokemonListResponse> {
    const res = await axiosInstance.get(`/pokemon`, {
      params: { limit, offset },
    });
    return res.data as PokemonListResponse;
  },
  extractPokemonIdFromUrl: function (resourceUrl: string): number | null {
    const match = resourceUrl.match(/\/pokemon\/(\d+)\/?$/);
    return match ? Number(match[1]) : null;
  },
  buildPokemonSpriteUrl: function (id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },
};

export default pokemonsListApi;
