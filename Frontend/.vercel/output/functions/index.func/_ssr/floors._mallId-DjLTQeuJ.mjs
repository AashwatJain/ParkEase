import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { b as Route$1, d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, L as Layers, B as Bike, C as Car } from "../_libs/lucide-react.mjs";
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
function Floors() {
  const {
    mallId
  } = Route$1.useParams();
  const [floors, setFloors] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    floorNumber: 1,
    bikeSlots: 20,
    carSlots: 40
  });
  const [loading, setLoading] = reactExports.useState(false);
  const fetchFloors = async () => {
    try {
      const {
        data
      } = await api.get(`/malls/${mallId}/floors`);
      setFloors(data.floors ?? data ?? []);
    } catch {
    }
  };
  reactExports.useEffect(() => {
    fetchFloors();
  }, [mallId]);
  const add = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/malls/${mallId}/floors`, form);
      toast.success("Floor added");
      setForm({
        floorNumber: form.floorNumber + 1,
        bikeSlots: 20,
        carSlots: 40
      });
      fetchFloors();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Mall configuration", title: "Manage Floors", subtitle: "Add and view floors for this mall." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "rounded-2xl border border-black/10 bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D0D0D] text-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: display, className: "text-base font-bold tracking-tight text-[#0D0D0D]", children: "Add a floor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Floor Number", id: "fn", value: String(form.floorNumber), onChange: (v) => setForm({
            ...form,
            floorNumber: Number(v)
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bike Slots", id: "bs", value: String(form.bikeSlots), onChange: (v) => setForm({
            ...form,
            bikeSlots: Number(v)
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Car Slots", id: "cs", value: String(form.carSlots), onChange: (v) => setForm({
            ...form,
            carSlots: Number(v)
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, style: display, className: "w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60", children: loading ? "Adding..." : "Add Floor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: display, className: "mb-5 flex items-center gap-2 text-lg font-bold tracking-tight text-[#0D0D0D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }),
          " Floors (",
          floors.length,
          ")"
        ] }),
        floors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-black/10 bg-white p-8 text-center text-sm text-[#2D2D2D]/60", children: "No floors yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: floors.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.05
        }, className: "rounded-2xl border border-black/10 bg-white p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: [
            "Floor ",
            f.floorNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-4 text-sm text-[#2D2D2D]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "mr-1 inline h-4 w-4 text-[#0D0D0D]" }),
              f.bikeSlots,
              " bikes"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "mr-1 inline h-4 w-4 text-[#0D0D0D]" }),
              f.carSlots,
              " cars"
            ] })
          ] })
        ] }, f._id)) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  id,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, style: display, className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, type: "number", min: 0, required: true, value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10" })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["mall-owner"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Floors, {}) });
export {
  SplitComponent as component
};
