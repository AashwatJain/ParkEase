import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Loader } from "./Loader-Dt07BbzL.mjs";
import { R as Route$b, d as api } from "./router-D_sUj32p.mjs";
import "../_libs/sonner.mjs";
import { S as Search, l as Star, h as MapPin, B as Bike, C as Car } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
function MallsPage() {
  const {
    q
  } = Route$b.useSearch();
  const [malls, setMalls] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState(q || "");
  const fetchMalls = async (searchOverride) => {
    setLoading(true);
    try {
      const {
        data
      } = await api.get("/malls", {
        params: {
          name: searchOverride !== void 0 ? searchOverride : search
        }
      });
      setMalls(data.malls ?? data ?? []);
    } catch {
      setMalls([]);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchMalls(q);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-black/10 bg-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: [
          "Live · ",
          malls.length,
          " malls online"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: display, className: "mt-4 text-4xl font-bold tracking-tight text-[#0D0D0D] sm:text-5xl", children: "Browse Malls" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-base text-[#2D2D2D]/70", children: "Find a mall, check live availability, book your slot." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col gap-2 rounded-2xl border border-black/10 bg-[#E8E4DD] p-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D2D2D]/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Search by mall name...", value: search, onChange: (e) => setSearch(e.target.value), onKeyDown: (e) => e.key === "Enter" && fetchMalls(), className: "w-full rounded-xl bg-[#F5F3EE] py-3 pl-11 pr-4 text-sm text-[#0D0D0D] placeholder:text-[#2D2D2D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/20" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchMalls, style: display, className: "rounded-xl bg-[#0D0D0D] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]", children: "Search" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { text: "Loading Malls" }) : malls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-20 text-center text-sm text-[#2D2D2D]/60", children: "No malls found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: malls.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 16
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/malls/$mallId", params: {
      mallId: m._id
    }, className: "group block rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#0D0D0D]/40 hover:shadow-[0_18px_40px_-20px_rgba(13,13,13,0.25)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: m.name }),
        m.averageRating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1 rounded-full border border-black/10 px-2 py-1 text-xs font-semibold text-[#0D0D0D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-[#0D0D0D] text-[#0D0D0D]" }),
          m.averageRating.toFixed(1)
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
        " ",
        m.city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-6 border-t border-black/10 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-4 w-4 text-[#0D0D0D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#2D2D2D]/60", children: "Bike" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0D0D0D]", children: [
            "₹",
            m.pricing?.bike,
            "/hr"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-[#0D0D0D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#2D2D2D]/60", children: "Car" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0D0D0D]", children: [
            "₹",
            m.pricing?.car,
            "/hr"
          ] })
        ] })
      ] })
    ] }) }, m._id)) }) })
  ] });
}
export {
  MallsPage as component
};
