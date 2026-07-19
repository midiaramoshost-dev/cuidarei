import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cuidarei | Cuidadores de Idosos em Sorocaba e Região" },
      {
        name: "description",
        content:
          "Cuidadores de idosos em Sorocaba e região. Home care, casa de repouso e vagas para cuidadores. Plataforma com tecnologia, segurança e carinho.",
      },
      {
        name: "keywords",
        content:
          "cuidador de idosos Sorocaba, cuidado com idosos, casa de repouso Sorocaba, home care Sorocaba, emprego para cuidadores, vagas cuidador de idosos, cuidador domiciliar, cuidadora de idosos, Cuidarei",
      },
      { name: "author", content: "Cuidarei" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BR-SP" },
      { name: "geo.placename", content: "Sorocaba" },
      { name: "geo.position", content: "-23.5015;-47.4526" },
      { name: "ICBM", content: "-23.5015, -47.4526" },
      { property: "og:site_name", content: "Cuidarei" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Cuidarei | Cuidadores de Idosos em Sorocaba e Região" },
      {
        property: "og:description",
        content:
          "Cuidadores, home care e casas de repouso em Sorocaba e região. Vagas para cuidadores e tecnologia para famílias.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cuidarei.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cuidarei | Cuidadores de Idosos em Sorocaba e Região" },
      { name: "twitter:description", content: "Cuidadores, home care e casas de repouso em Sorocaba e região." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://cuidarei.lovable.app/#business",
          name: "Cuidarei",
          description:
            "Plataforma de cuidadores de idosos, home care e casas de repouso em Sorocaba e região.",
          url: "https://cuidarei.lovable.app/",
          image: "https://cuidarei.lovable.app/favicon.png",
          telephone: "+55-15-0000-0000",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sorocaba",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -23.5015,
            longitude: -47.4526,
          },
          areaServed: [
            "Sorocaba",
            "Votorantim",
            "Itu",
            "Salto",
            "Itapetininga",
            "São Roque",
            "Mairinque",
            "Boituva",
            "Tatuí",
            "Piedade",
            "Alumínio",
            "Araçoiaba da Serra",
          ].map((n) => ({ "@type": "City", name: n })),
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
          sameAs: ["https://cuidarei.lovable.app/"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Cuidarei",
          url: "https://cuidarei.lovable.app/",
          inLanguage: "pt-BR",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://cuidarei.lovable.app/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
