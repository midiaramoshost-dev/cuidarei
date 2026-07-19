import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const App = lazy(() => import("@/App"));

export const Route = createFileRoute("/$")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <App />
    </Suspense>
  );
}
