import { Outlet, useMatches } from "react-router-dom";
import type { UIMatch } from "react-router-dom";

type LayoutHandle = { layoutClass?: string };

export default function ListLayout() {
  //use matches to get the layout class from the route handle
  const matches = useMatches() as UIMatch<unknown, LayoutHandle>[];
  const layoutClass = [...matches].find((m) => m.handle?.layoutClass)?.handle
    ?.layoutClass;

  return (
    <div className={layoutClass}>
      <Outlet />
    </div>
  );
}
