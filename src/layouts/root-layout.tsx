import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoaderScreen from "@/components/ui/loader-screen";
import ErrorBoundary from "@/components/common/error-boundary";

export default function RootLayout() {
  return (
    <div>
      <main className="app-main">
        <ErrorBoundary fallbackTitle="Oops! Something went wrong">
          <Suspense fallback={<LoaderScreen />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
