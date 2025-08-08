import type { PokemonListItem } from "../types";
import PokemonCard from "./pokemon-card";

type PokemonGridProps = {
  items: PokemonListItem[];
};

export default function PokemonGrid({ items }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((p) => (
        <PokemonCard key={p.name} item={p} />
      ))}
    </div>
  );
}
