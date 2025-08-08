import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import RootLayout from "../layouts/root-layout";

// Feature routes
import { pokemonRoutes } from "@/features/pokemons-list/routes";
import NotFound from "./not-found.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="pokemon" replace /> },
      pokemonRoutes,
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
