import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    if (mql.addEventListener) mql.addEventListener("change", listener);
    else mql.addListener(listener);
    setMatches(mql.matches);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", listener);
      else mql.removeListener(listener);
    };
  }, [query]);

  return matches;
}
