import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 md:px-10">
        <p className="text-sm font-medium text-muted-foreground">Cuidarei</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Gestão de cuidados em um só lugar
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Estruture rotinas, acompanhe pacientes e mantenha sua operação de cuidado organizada.
        </p>
      </section>
    </main>
  );
}
