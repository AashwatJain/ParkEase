import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";

import appCss from "../styles.css?url";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EE] px-4">
      <div className="max-w-md text-center">
        <h1 style={display} className="text-7xl font-bold tracking-tight text-[#0D0D0D]">404</h1>
        <h2 style={display} className="mt-4 text-xl font-bold tracking-tight text-[#2D2D2D]">Page not found</h2>
        <div className="mt-6">
          <Link to="/" style={display} className="inline-flex rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-[#2D2D2D]">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EE] px-4">
      <div className="max-w-md text-center">
        <h1 style={display} className="text-xl font-bold tracking-tight text-[#0D0D0D]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[#2D2D2D]/70">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          style={display}
          className="mt-6 rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-[#2D2D2D]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ParkEase — Mall Parking Made Effortless" },
      { name: "description", content: "Book mall parking instantly. Find slots, pay seamlessly, exit with a tap." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body className="font-sans antialiased">
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
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-[#F5F3EE]">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}
