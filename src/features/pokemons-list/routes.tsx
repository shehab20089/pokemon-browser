import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const PokemonListPage = lazy(() => import("./pages/pokemon-pagination-list"));
const PokemonScrollListPage = lazy(() => import("./pages/pokemon-scroll-list"));

export const pokemonRoutes: RouteObject = {
  path: "pokemon",
  children: [
    { index: true, element: <PokemonListPage /> },
    { path: "scroll", element: <PokemonScrollListPage /> },
  ],
};
