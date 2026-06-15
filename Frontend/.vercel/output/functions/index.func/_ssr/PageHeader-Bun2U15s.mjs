import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth } from "./router-D_sUj32p.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
function ProtectedRoute({
  children,
  roles
}) {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (roles && !roles.includes(user.role)) nav({ to: "/" });
  }, [user, loading, roles, nav]);
  if (loading || !user || roles && !roles.includes(user.role)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center bg-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-[#E8E4DD] border-t-[#0D0D0D]" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };
function PageHeader({
  eyebrow,
  title,
  subtitle,
  right
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-black/10 bg-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 py-14 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: eyebrow })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: display, className: "mt-3 text-4xl font-bold tracking-tight text-[#0D0D0D] sm:text-5xl", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-base text-[#2D2D2D]/70", children: subtitle })
    ] }),
    right
  ] }) });
}
export {
  PageHeader as P,
  ProtectedRoute as a
};
