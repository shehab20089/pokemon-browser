import { NavLink, Outlet, useMatches } from "react-router-dom";
import type { UIMatch } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

type LayoutHandle = { layoutClass?: string; textTitle?: string };

export default function ListLayout() {
  //use matches to get the layout class from the route handle
  const matches = useMatches() as UIMatch<unknown, LayoutHandle>[];
  const layoutClass = [...matches].find((m) => m.handle?.layoutClass)?.handle
    ?.layoutClass;
  const textTitle = [...matches].find((m) => m.handle?.textTitle)?.handle
    ?.textTitle;
  return (
    <div className={cn("min-h-dvh", layoutClass)}>
      <div className="mx-auto max-w-5xl px-4 pt-8 text-center space-y-3">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Zap
            className="inline-block text-orange-300
          "
          />
          Pokédex
        </h1>
        <p className="text-muted-foreground">
          Discover and explore Pokémon with {textTitle}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "outline",
                  size: "lg",
                })
              )
            }
          >
            Page Controls
          </NavLink>
          <NavLink
            to="scroll"
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "outline",
                  size: "lg",
                })
              )
            }
          >
            Load More
          </NavLink>
        </div>
      </div>
      <div className="mx-auto max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
}
