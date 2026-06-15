import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as Store } from "../_libs/lucide-react.mjs";
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
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
function RegisterMall() {
  const [form, setForm] = reactExports.useState({
    name: "",
    address: "",
    city: "",
    pricing: {
      bike: 10,
      car: 30
    }
  });
  const [loading, setLoading] = reactExports.useState(false);
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/malls", form);
      toast.success("Mall submitted! Awaiting admin approval.");
      nav({
        to: "/owner/malls"
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Owner onboarding", title: "Register a Mall", subtitle: "Add your parking facility to the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "rounded-3xl border border-black/10 bg-white p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D0D0D] text-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: "Mall details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mall Name", id: "name", value: form.name, onChange: (v) => setForm({
          ...form,
          name: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Address", id: "address", value: form.address, onChange: (v) => setForm({
          ...form,
          address: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City", id: "city", value: form.city, onChange: (v) => setForm({
          ...form,
          city: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bike Rate (₹/hr)", id: "bike", type: "number", value: String(form.pricing.bike), onChange: (v) => setForm({
            ...form,
            pricing: {
              ...form.pricing,
              bike: Number(v)
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Car Rate (₹/hr)", id: "car", type: "number", value: String(form.pricing.car), onChange: (v) => setForm({
            ...form,
            pricing: {
              ...form.pricing,
              car: Number(v)
            }
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, style: display, className: "mt-6 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60", children: loading ? "Submitting..." : "Submit for Approval" })
    ] }) })
  ] });
}
function Field({
  label,
  id,
  type = "text",
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, style: display, className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, type, required: true, min: type === "number" ? 0 : void 0, value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10" })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["mall-owner"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterMall, {}) });
export {
  SplitComponent as component
};
