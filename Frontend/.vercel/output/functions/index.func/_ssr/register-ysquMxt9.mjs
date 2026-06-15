import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, d as api } from "./router-D_sUj32p.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { C as Car, U as User, m as Store } from "../_libs/lucide-react.mjs";
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
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
function RegisterPage() {
  const [form, setForm] = reactExports.useState({
    username: "",
    email: "",
    password: ""
  });
  const [role, setRole] = reactExports.useState("user");
  const [loading, setLoading] = reactExports.useState(false);
  const {
    refresh
  } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", {
        ...form,
        role
      });
      await refresh();
      toast.success("Account created!");
      nav({
        to: "/"
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#F5F3EE] px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-[0_18px_50px_-25px_rgba(13,13,13,0.25)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] text-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: display, className: "mt-5 text-3xl font-bold tracking-tight text-[#0D0D0D]", children: "Create your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-[#2D2D2D]/60", children: "Park smarter in seconds" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 grid grid-cols-2 gap-1 rounded-xl bg-[#E8E4DD] p-1", children: [{
      v: "user",
      label: "User",
      Icon: User
    }, {
      v: "mall-owner",
      label: "Mall Owner",
      Icon: Store
    }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setRole(opt.v), style: display, className: cn("flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all", role === opt.v ? "bg-[#0D0D0D] text-[#F5F3EE]" : "text-[#2D2D2D]/70 hover:text-[#0D0D0D]"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(opt.Icon, { className: "h-3.5 w-3.5" }),
      opt.label
    ] }, opt.v)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Username", id: "username", value: form.username, onChange: (v) => setForm({
        ...form,
        username: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", id: "email", type: "email", value: form.email, onChange: (v) => setForm({
        ...form,
        email: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", id: "password", type: "password", value: form.password, onChange: (v) => setForm({
        ...form,
        password: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, style: display, className: "mt-2 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60", children: loading ? "Creating..." : "Create account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-center text-sm text-[#2D2D2D]/70", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", style: display, className: "font-bold uppercase tracking-widest text-[#0D0D0D] hover:underline", children: "Log in" })
    ] })
  ] }) });
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, type, required: true, minLength: type === "password" ? 6 : void 0, value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10" })
  ] });
}
export {
  RegisterPage as component
};
