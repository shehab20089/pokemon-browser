export default function LoaderScreen() {
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
