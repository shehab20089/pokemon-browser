import { Link, useParams } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import PokemonDetailsSkeleton from "../components/details-skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Ruler, Weight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PokemonDetailsPage() {
  const params = useParams<{ id: string }>();
  const idOrName = params.id!;

  const { data, isLoading, isError, error } = usePokemonDetails(idOrName);

  const typeClass: Record<string, string> = {
    fire: "bg-red-400 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-600 text-white",
    electric: "bg-yellow-600 text-white",
    poison: "bg-purple-600 text-white",
    bug: "bg-lime-600 text-white",
    fairy: "bg-pink-600 text-white",
    normal: "bg-zinc-700 text-white",
    ground: "bg-amber-700 text-white",
    rock: "bg-stone-700 text-white",
    psychic: "bg-fuchsia-600 text-white",
    ghost: "bg-indigo-700 text-white",
    ice: "bg-cyan-700 text-white",
    dragon: "bg-violet-700 text-white",
    fighting: "bg-orange-700 text-white",
    steel: "bg-slate-700 text-white",
    dark: "bg-neutral-800 text-white",
    flying: "bg-sky-600 text-white",
  };
  if (isLoading) {
    return <PokemonDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6 text-destructive">{(error as Error).message}</div>
    );
  }

  const idNum = data?.id ? String(data.id).padStart(3, "0") : "";
  const artwork = data?.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="px-4 py-6 bg-gradient-to-t from-[#fde9f4] to-[#f9f1fe] min-h-screen">
      <div className="md:px-10  px-0 mb-3">
        <Link
          to="/pokemon"
          className="inline-flex items-center gap-2 text-sm font-semibold bg-muted hover:bg-muted/80 rounded-md px-3 py-1.5 border "
        >
          <ArrowLeft className="h-4 w-4" /> Back to List
        </Link>
      </div>

      <div className="mx-auto max-w-4xl rounded-lg shadow-sm border overflow-hidden">
        <div className="bg-gradient-to-r from-[#aa54f3] to-[#e9499f] text-white p-6 text-center">
          <h1 className="text-2xl font-semibold capitalize inline-flex items-center gap-4">
            <Zap className="h-5 w-5" /> {data?.name}
          </h1>
          <div className="text-xs/5 opacity-90 mt-4">#{idNum}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6 bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted/50 height-84 w-auto grid place-items-center  ">
              {artwork && (
                <img
                  src={artwork}
                  alt={data?.name}
                  className="max-h-80 object-cover"
                />
              )}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {data?.types?.map((t) => {
                const type = t.type.name;

                return (
                  <Badge
                    key={type}
                    className={cn(
                      "capitalize",
                      typeClass[type] ?? "bg-muted text-foreground"
                    )}
                  >
                    {type}
                  </Badge>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="rounded-lg  p-4 text-center bg-[#fafbfd]">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Ruler className="h-4 w-4" /> Height
                </div>
                <div className="font-bold text-xl mt-3">
                  {(data?.height ?? 0) / 10} m
                </div>
              </div>
              <div className="rounded-lg  p-4 text-center bg-[#fafbfd]">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Weight className="h-4 w-4" /> Weight
                </div>
                <div className="font-bold text-xl mt-3">
                  {(data?.weight ?? 0) / 10} kg
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-xl">Base Stats</h3>
              <div className="space-y-3">
                {data?.stats?.map((s) => (
                  <div key={s.stat.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-primary font-medium capitalize">
                        {s.stat.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.base_stat}
                      </div>
                    </div>
                    <Progress
                      value={s.base_stat}
                      max={100}
                      barClassName="bg-black"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-xl">Abilities</h3>
              <div className="flex flex-col  items-start gap-2">
                {data?.abilities?.map((a) => (
                  <div
                    key={a.ability.name}
                    className="flex items-center  gap-1"
                  >
                    <Badge
                      variant={a.is_hidden ? "secondary" : "outline"}
                      className="capitalize font-semibold"
                    >
                      {a.ability.name}{" "}
                    </Badge>
                    {a.is_hidden && (
                      <span className="text-muted-foreground text-xs ml-1">
                        (Hidden)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-1 text-xl">Base Experience</h3>
              <div className="font-extrabold text-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 bg-clip-text text-transparent">
                {data?.base_experience} XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
