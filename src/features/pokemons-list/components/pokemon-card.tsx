import { Link } from "react-router-dom";
import type { PokemonListItem } from "../types";
import pokemonsListApi from "../api";

type PokemonCardProps = {
  item: PokemonListItem;
};

function formatId(id: number | null): string {
  if (!id) return "";
  return `#${String(id).padStart(3, "0")}`;
}

export default function PokemonCard({ item }: PokemonCardProps) {
  const id = pokemonsListApi.extractPokemonIdFromUrl(item.url);
  const sprite = id ? pokemonsListApi.buildPokemonSpriteUrl(id) : undefined;

  return (
    <Link
      to={`/pokemon/${id ?? item.name}`}
      className="group rounded-sm border bg-background/80 p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="rounded-md bg-muted aspect-auto grid place-items-center overflow-hidden">
        {sprite ? (
          <img
            src={sprite}
            alt={item.name}
            className="w-auto h-48 object-contain drop-shadow-sm transition-transform group-hover:scale-[1.02]"
            loading="lazy"
            width={256}
            height={256}
          />
        ) : (
          <div className="h-28" />
        )}
      </div>
      <div className="mt-3 text-center">
        <div className="capitalize font-semibold leading-none">{item.name}</div>
        <div className="text-xs text-muted-foreground mt-1">{formatId(id)}</div>
      </div>
    </Link>
  );
}
