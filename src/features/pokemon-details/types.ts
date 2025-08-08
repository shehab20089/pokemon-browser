export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites?: {
    front_default?: string;
    other?: {
      "official-artwork": {
        front_default?: string;
      };
    };
  };
};
