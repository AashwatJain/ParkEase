import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { L as Loader } from "./Loader-Dt07BbzL.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, d as CircleCheckBig, C as Car, I as IndianRupee, L as Layers, h as MapPin, B as Bike } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
  pending: "border border-black/10 text-[#2D2D2D]",
  approved: "bg-emerald-700 text-[#F5F3EE]",
  rejected: "bg-[#0D0D0D] text-[#F5F3EE]"
};
function OwnerMalls() {
  const [malls, setMalls] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [globalStats, setGlobalStats] = reactExports.useState(null);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const [mallsRes, statsRes] = await Promise.all([api.get("/owner/malls"), api.get("/owner/dashboard")]);
        setMalls(mallsRes.data.data ?? mallsRes.data.malls ?? mallsRes.data ?? []);
        setGlobalStats(statsRes.data.data ?? statsRes.data ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: `${malls.length} mall${malls.length === 1 ? "" : "s"} registered`, title: "My Malls", subtitle: "Manage your registered parking facilities.", right: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/owner/register-mall", style: display, className: "inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Register Mall"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { text: "Loading Your Malls" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      globalStats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [{
        label: "Available Slots",
        value: globalStats.availableSlots,
        Icon: CircleCheckBig
      }, {
        label: "Occupied Slots",
        value: globalStats.occupiedSlots,
        Icon: Car
      }, {
        label: "Today's Revenue",
        value: `₹${globalStats.todaysRevenue}`,
        Icon: IndianRupee,
        accent: true
      }, {
        label: "Total Revenue",
        value: `₹${globalStats.totalRevenue}`,
        Icon: Layers
      }].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.05
      }, className: "rounded-2xl border border-black/10 bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.accent ? "bg-emerald-700 text-[#F5F3EE]" : "bg-[#0D0D0D] text-[#F5F3EE]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-3xl font-bold tracking-tight text-[#0D0D0D]", children: c.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "mt-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: c.label })
      ] }, c.label)) }),
      malls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-20 text-center text-sm text-[#2D2D2D]/60", children: "No malls yet. Register your first one!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: malls.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.05
      }, className: "rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(13,13,13,0.25)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: cn("rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest capitalize", badgeStyle[m.status ?? "pending"]), children: m.status ?? "pending" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          " ",
          m.city
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-4 border-t border-black/10 pt-4 text-sm text-[#2D2D2D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "mr-1 inline h-3.5 w-3.5 text-[#0D0D0D]" }),
            "₹",
            m.pricing?.bike,
            "/hr"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "mr-1 inline h-3.5 w-3.5 text-[#0D0D0D]" }),
            "₹",
            m.pricing?.car,
            "/hr"
          ] })
        ] }),
        m.status === "rejected" && m.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 rounded-lg border border-black/10 bg-[#F5F3EE] p-3 text-xs text-[#2D2D2D]", children: m.rejectionReason }),
        m.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/owner/dashboard/$mallId", params: {
            mallId: m._id
          }, style: display, className: "flex-1 rounded-xl border border-black/15 py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-[#0D0D0D] transition-colors hover:bg-[#F5F3EE]", children: "Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/owner/floors/$mallId", params: {
            mallId: m._id
          }, style: display, className: "flex-1 rounded-xl bg-[#0D0D0D] py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]", children: "Floors" })
        ] })
      ] }, m._id)) })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["mall-owner"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerMalls, {}) });
export {
  SplitComponent as component
};
