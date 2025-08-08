import { Link } from "react-router-dom";
import type { PokemonListItem } from "../types";
import pokemonsListApi from "../api";

type PokemonCardProps = {
  item: PokemonListItem;
};

export default function PokemonCard({ item }: PokemonCardProps) {
  const id = pokemonsListApi.extractPokemonIdFromUrl(item.url);
  const sprite = id ? pokemonsListApi.buildPokemonSpriteUrl(id) : undefined;

  return (
    <Link
      to={`/pokemon/${id ?? item.name}`}
      className="rounded-md border p-3 hover:bg-accent"
    >
      {sprite ? (
        <img
          src={sprite}
          alt={item.name}
          className="w-20 h-20 object-contain mx-auto"
        />
      ) : (
        <div className="w-20 h-20 mx-auto" />
      )}
      <div className="mt-2 text-center capitalize">{item.name}</div>
    </Link>
  );
}
