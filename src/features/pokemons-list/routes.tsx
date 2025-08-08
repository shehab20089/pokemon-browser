import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import ListLayout from "./layouts/list-layout";

const PokemonListPage = lazy(() => import("./pages/pokemon-pagination-list"));
const PokemonScrollListPage = lazy(
  () => import("./pages/pokemon-load-more-list")
);

export const pokemonRoutes: RouteObject = {
  path: "pokemon",
  element: <ListLayout />,
  children: [
    {
      index: true,
      element: <PokemonListPage />,
      handle: { layoutClass: "bg-[#ebfbf1]" },
    },
    {
      path: "scroll",
      element: <PokemonScrollListPage />,
      handle: { layoutClass: "bg-[#eef5ff]" },
    },
  ],
};
