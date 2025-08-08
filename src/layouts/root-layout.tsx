import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";

export default function RootLayout() {
  return (
    <div>
      <main className="app-main">
        <Suspense fallback={<div className="route-fallback">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
