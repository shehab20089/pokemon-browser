import axiosInstance from "@/lib/axios";
import type { PokemonDetails } from "./types";

const pokemonDetailsApi = {
  fetchPokemonDetails: async function (
    idOrName: string | number
  ): Promise<PokemonDetails> {
    const res = await axiosInstance.get(`/pokemon/${idOrName}`);
    return res.data as PokemonDetails;
  },
};

export default pokemonDetailsApi;
