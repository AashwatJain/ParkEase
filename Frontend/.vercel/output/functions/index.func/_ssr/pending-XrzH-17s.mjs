import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { h as MapPin, c as Check, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
function Pending() {
  const [malls, setMalls] = reactExports.useState([]);
  const [reasons, setReasons] = reactExports.useState({});
  const fetchPending = async () => {
    try {
      const {
        data
      } = await api.get("/admin/malls/pending");
      setMalls(data.malls ?? data ?? []);
    } catch {
    }
  };
  reactExports.useEffect(() => {
    fetchPending();
  }, []);
  const approve = async (id) => {
    try {
      await api.patch(`/admin/malls/${id}/approve`);
      toast.success("Approved");
      fetchPending();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };
  const reject = async (id) => {
    const reason = reasons[id];
    if (!reason) return toast.error("Provide a reason");
    try {
      await api.patch(`/admin/malls/${id}/reject`, {
        reason
      });
      toast.success("Rejected");
      fetchPending();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: `${malls.length} awaiting review`, title: "Pending Malls", subtitle: "Review and approve new submissions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8", children: malls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-20 text-center text-sm text-[#2D2D2D]/60", children: "No pending malls." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: malls.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, className: "rounded-2xl border border-black/10 bg-white p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            m.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-[#2D2D2D]", children: [
            "Bike ₹",
            m.pricing?.bike,
            "/hr · Car ₹",
            m.pricing?.car,
            "/hr"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "rounded-full border border-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]", children: "Pending" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col gap-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Reason if rejecting...", value: reasons[m._id] || "", onChange: (e) => setReasons({
          ...reasons,
          [m._id]: e.target.value
        }), className: "flex-1 rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-2.5 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => approve(m._id), style: display, className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-emerald-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
          " Approve"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => reject(m._id), style: display, className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0D0D0D] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
          " Reject"
        ] })
      ] })
    ] }, m._id)) }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pending, {}) });
export {
  SplitComponent as component
};
