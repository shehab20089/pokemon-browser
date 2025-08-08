import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoaderScreen from "@/components/ui/loader-screen";

export default function RootLayout() {
  return (
    <div>
      <main className="app-main">
        <Suspense fallback={<LoaderScreen />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
