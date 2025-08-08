export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience?: number;
  types?: { slot: number; type: { name: string } }[];
  abilities?: { ability: { name: string }; is_hidden: boolean; slot: number }[];
  stats?: { base_stat: number; effort: number; stat: { name: string } }[];
  sprites?: {
    front_default?: string;
    other?: {
      "official-artwork": {
        front_default?: string;
      };
    };
  };
};
