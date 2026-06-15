import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { L as Loader } from "./Loader-Dt07BbzL.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { C as Car, d as CircleCheckBig, I as IndianRupee } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/axios.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
const badgeStyle = {
  pending: "border border-black/15 text-[#2D2D2D]",
  approved: "bg-emerald-700 text-[#F5F3EE]",
  rejected: "bg-[#0D0D0D] text-[#F5F3EE]"
};
function Manage() {
  const [malls, setMalls] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const fetchAll = async () => {
    try {
      const {
        data
      } = await api.get("/admin/all-malls");
      setMalls(Array.isArray(data) ? data : data.malls ?? data ?? []);
    } catch {
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchAll();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: `${malls.length} mall${malls.length === 1 ? "" : "s"} on platform`, title: "Manage Malls", subtitle: "Live stats for all malls on the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { text: "Loading Platform Stats" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      malls.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.03
      }, className: "rounded-2xl border border-black/10 bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest capitalize", badgeStyle[m.status ?? "pending"]), children: m.status ?? "pending" })
        ] }) }) }),
        m.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-3 gap-4 border-t border-black/10 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Parked Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-lg font-bold text-[#0D0D0D]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-[#2D2D2D]/60" }),
              " ",
              m.liveStats.currentlyParked
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-lg font-bold text-emerald-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
              " ",
              m.liveStats.availableSlots
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Today's Revenue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-lg font-bold text-[#0D0D0D]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4 text-[#2D2D2D]/60" }),
              " ₹",
              m.liveStats.todayRevenue
            ] })
          ] })
        ] })
      ] }, `${m.name}-${i}`)),
      malls.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-20 text-center text-sm text-[#2D2D2D]/60", children: "No malls yet." })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Manage, {}) });
export {
  SplitComponent as component
};
