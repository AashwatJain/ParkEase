import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as Route, d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import "../_libs/sonner.mjs";
import { f as LayoutGrid, C as Car, I as IndianRupee, L as Layers } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
function Dashboard() {
  const {
    mallId
  } = Route.useParams();
  const [mallName, setMallName] = reactExports.useState("");
  const [stats, setStats] = reactExports.useState({
    available: 0,
    occupied: 0,
    total: 0,
    revenue: 0,
    totalRevenue: 0
  });
  reactExports.useEffect(() => {
    (async () => {
      try {
        const mallRes = await api.get(`/malls/${mallId}`);
        const mallData = mallRes.data.mall ?? mallRes.data;
        setMallName(mallData?.name ?? "Mall");
        const statsRes = await api.get("/owner/mall-stats");
        const allStats = statsRes.data.data ?? statsRes.data ?? [];
        const mallStats = allStats.find((s) => s.mallId === mallId);
        if (mallStats) {
          setStats({
            available: mallStats.slotsAvailable || 0,
            occupied: mallStats.slotsOccupied || 0,
            total: (mallStats.slotsAvailable || 0) + (mallStats.slotsOccupied || 0),
            revenue: mallStats.revenue || 0,
            totalRevenue: mallStats.totalRevenue || 0
          });
        }
      } catch {
      }
    })();
  }, [mallId]);
  const cards = [{
    label: "Available Slots",
    value: stats.available,
    Icon: LayoutGrid
  }, {
    label: "Occupied Slots",
    value: stats.occupied,
    Icon: Car
  }, {
    label: "Today's Revenue",
    value: `₹${stats.revenue}`,
    Icon: IndianRupee,
    accent: true
  }, {
    label: "Total Revenue",
    value: `₹${stats.totalRevenue}`,
    Icon: Layers
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: mallName, title: "Owner Dashboard", subtitle: "Overview of your mall's parking capacity." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: cards.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
    ] }, c.label)) }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["mall-owner"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) });
export {
  SplitComponent as component
};
