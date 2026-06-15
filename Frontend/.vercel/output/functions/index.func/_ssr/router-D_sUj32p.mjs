import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent, u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { C as Car, g as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "crypto";
import "async_hooks";
import "util";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
const api = axios.create({
  baseURL: "/api",
  withCredentials: true
});
api.interceptors.response.use((response) => {
  if (response.data && response.data.data) {
    response.data = response.data.data;
  }
  return response;
});
const Ctx = reactExports.createContext({
  user: null,
  loading: true,
  refresh: async () => {
  },
  logout: async () => {
  },
  setUser: () => {
  }
});
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const refresh = async () => {
    try {
      const { data } = await api.get("/auth/profile");
      setUser(data.user ?? data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
    }
    setUser(null);
  };
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") refresh();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { user, loading, refresh, logout, setUser }, children });
}
const useAuth = () => reactExports.useContext(Ctx);
const display$1 = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };
function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const onLogout = async () => {
    await logout();
    toast.success("Logged out");
    nav({ to: "/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 w-full border-b border-black/10 bg-[#F5F3EE]/85 backdrop-blur-md dark:border-white/10 dark:bg-[#0D0D0D]/85", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#0D0D0D] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#0D0D0D]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4", strokeWidth: 2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display$1, className: "text-lg font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F3EE]", children: "ParkEase." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center justify-center gap-1 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/malls", children: "Browse Malls" }),
      user?.role === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/bookings", children: "My Bookings" }),
      user?.role === "mall-owner" && /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/owner/malls", children: "Owner Dashboard" }),
      user?.role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/dashboard", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/pending", children: "Pending Approvals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/manage", children: "Manage Malls" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/users", children: "Manage Users" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 justify-self-end", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden text-xs uppercase tracking-widest text-[#2D2D2D]/70 sm:inline dark:text-[#F5F3EE]/70", style: display$1, children: [
        "Hi, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-[#0D0D0D] dark:text-[#F5F3EE]", children: user.username })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onLogout,
          style: display$1,
          className: "flex items-center gap-1.5 rounded-full border border-[#0D0D0D]/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0D0D0D] transition-colors hover:bg-[#0D0D0D] hover:text-[#F5F3EE] dark:border-[#F5F3EE]/30 dark:text-[#F5F3EE]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
            " Logout"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          style: display$1,
          className: "hidden rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0D0D0D] hover:underline sm:inline-block dark:text-[#F5F3EE]",
          children: "Login"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/register",
          style: display$1,
          className: "rounded-full bg-[#0D0D0D] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-emerald-700 dark:bg-[#F5F3EE] dark:text-[#0D0D0D] dark:hover:bg-emerald-700 dark:hover:text-[#F5F3EE]",
          children: "Sign Up"
        }
      )
    ] }) })
  ] }) });
}
function NavLink({ to, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      style: display$1,
      className: "rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#2D2D2D] transition-colors hover:text-[#0D0D0D] dark:text-[#F5F3EE]/70 dark:hover:text-[#F5F3EE]",
      activeProps: {
        className: "bg-[#0D0D0D] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#0D0D0D]"
      },
      children
    }
  );
}
const appCss = "/assets/styles-bLjTMTfJ.css";
const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#F5F3EE] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: display, className: "text-7xl font-bold tracking-tight text-[#0D0D0D]", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: display, className: "mt-4 text-xl font-bold tracking-tight text-[#2D2D2D]", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", style: display, className: "inline-flex rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-[#2D2D2D]", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#F5F3EE] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: display, className: "text-xl font-bold tracking-tight text-[#0D0D0D]", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#2D2D2D]/70", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        style: display,
        className: "mt-6 rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-[#2D2D2D]",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$i = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ParkEase — Mall Parking Made Effortless" },
      { name: "description", content: "Book mall parking instantly. Find slots, pay seamlessly, exit with a tap." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "font-sans antialiased", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$i.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-[#F5F3EE]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true })
  ] }) });
}
const $$splitComponentImporter$h = () => import("./register-ysquMxt9.mjs");
const Route$h = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./owner-B2towut3.mjs");
const Route$g = createFileRoute("/owner")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./login-MrrNV4Rc.mjs");
const Route$f = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./bookings-CxNUt94R.mjs");
const Route$e = createFileRoute("/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin-CxXBfsXi.mjs");
const Route$d = createFileRoute("/admin")({
  beforeLoad: ({
    context
  }) => {
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-C1JtuOjQ.mjs");
const Route$c = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./index-B4hGaNY3.mjs");
const Route$b = createFileRoute("/malls/")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component"),
  validateSearch: (search) => {
    return {
      q: search.q || ""
    };
  }
});
const $$splitComponentImporter$a = () => import("./register-mall-BA2NMi3M.mjs");
const Route$a = createFileRoute("/owner/register-mall")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./malls-CFKuVHSm.mjs");
const Route$9 = createFileRoute("/owner/malls")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./guards-s887CLyj.mjs");
const Route$8 = createFileRoute("/owner/guards")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_mallId-Ht8aoMaQ.mjs");
const Route$7 = createFileRoute("/malls/$mallId")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./scan-B8rFJGb1.mjs");
const Route$6 = createFileRoute("/guard/scan")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./users-C07saot9.mjs");
const Route$5 = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./pending-XrzH-17s.mjs");
const Route$4 = createFileRoute("/admin/pending")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./manage-WBWPPXSo.mjs");
const Route$3 = createFileRoute("/admin/manage")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard-DZG21_s4.mjs");
const Route$2 = createFileRoute("/admin/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./floors._mallId-DjLTQeuJ.mjs");
const Route$1 = createFileRoute("/owner/floors/$mallId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard._mallId-D8LORUsT.mjs");
const Route = createFileRoute("/owner/dashboard/$mallId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$h.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$i
});
const OwnerRoute = Route$g.update({
  id: "/owner",
  path: "/owner",
  getParentRoute: () => Route$i
});
const LoginRoute = Route$f.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$i
});
const BookingsRoute = Route$e.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => Route$i
});
const AdminRoute = Route$d.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const MallsIndexRoute = Route$b.update({
  id: "/malls/",
  path: "/malls/",
  getParentRoute: () => Route$i
});
const OwnerRegisterMallRoute = Route$a.update({
  id: "/register-mall",
  path: "/register-mall",
  getParentRoute: () => OwnerRoute
});
const OwnerMallsRoute = Route$9.update({
  id: "/malls",
  path: "/malls",
  getParentRoute: () => OwnerRoute
});
const OwnerGuardsRoute = Route$8.update({
  id: "/guards",
  path: "/guards",
  getParentRoute: () => OwnerRoute
});
const MallsMallIdRoute = Route$7.update({
  id: "/malls/$mallId",
  path: "/malls/$mallId",
  getParentRoute: () => Route$i
});
const GuardScanRoute = Route$6.update({
  id: "/guard/scan",
  path: "/guard/scan",
  getParentRoute: () => Route$i
});
const AdminUsersRoute = Route$5.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRoute
});
const AdminPendingRoute = Route$4.update({
  id: "/pending",
  path: "/pending",
  getParentRoute: () => AdminRoute
});
const AdminManageRoute = Route$3.update({
  id: "/manage",
  path: "/manage",
  getParentRoute: () => AdminRoute
});
const AdminDashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AdminRoute
});
const OwnerFloorsMallIdRoute = Route$1.update({
  id: "/floors/$mallId",
  path: "/floors/$mallId",
  getParentRoute: () => OwnerRoute
});
const OwnerDashboardMallIdRoute = Route.update({
  id: "/dashboard/$mallId",
  path: "/dashboard/$mallId",
  getParentRoute: () => OwnerRoute
});
const AdminRouteChildren = {
  AdminDashboardRoute,
  AdminManageRoute,
  AdminPendingRoute,
  AdminUsersRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const OwnerRouteChildren = {
  OwnerGuardsRoute,
  OwnerMallsRoute,
  OwnerRegisterMallRoute,
  OwnerDashboardMallIdRoute,
  OwnerFloorsMallIdRoute
};
const OwnerRouteWithChildren = OwnerRoute._addFileChildren(OwnerRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  BookingsRoute,
  LoginRoute,
  OwnerRoute: OwnerRouteWithChildren,
  RegisterRoute,
  GuardScanRoute,
  MallsMallIdRoute,
  MallsIndexRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$b as R,
  Route$7 as a,
  Route$1 as b,
  Route as c,
  api as d,
  router as r,
  useAuth as u
};
