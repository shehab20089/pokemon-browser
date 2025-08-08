import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const PokemonDetailsPage = lazy(() => import("./pages/pokemon-details"));

export const pokemonDetailsRoutes: RouteObject = {
  path: "pokemon/:id",
  element: <PokemonDetailsPage />,
};
