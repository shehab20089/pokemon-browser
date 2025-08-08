import { Skeleton } from "@/components/ui/skeleton";

export default function PokemonDetailsSkeleton() {
  return (
    <div className="px-4 py-6 bg-gradient-to-t from-[#fde9f4] to-[#f9f1fe] min-h-screen">
      <div className="md:px-10 px-0 mb-3">
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>

      <div className="mx-auto max-w-4xl rounded-lg shadow-sm border overflow-hidden">
        <div className="bg-gradient-to-r from-[#aa54f3] to-[#e9499f] p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-7 w-40" />
          </div>
          <div className="mt-4 flex justify-center">
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 bg-background">
          <div className="flex flex-col items-center gap-5">
            <div className="rounded-full bg-muted/50 w-64 h-64 grid place-items-center">
              <Skeleton className="h-40 w-40 rounded-full" />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="rounded-lg p-4 text-center bg-[#fafbfd] space-y-3">
                <Skeleton className="h-4 w-16 mx-auto" />
                <Skeleton className="h-6 w-20 mx-auto" />
              </div>
              <div className="rounded-lg p-4 text-center bg-[#fafbfd] space-y-3">
                <Skeleton className="h-4 w-16 mx-auto" />
                <Skeleton className="h-6 w-20 mx-auto" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-6 w-28 mb-3" />
              <div className="flex flex-col items-start gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>

            <div>
              <Skeleton className="h-6 w-36 mb-1" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
