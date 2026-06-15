import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { L as Loader } from "./Loader-Dt07BbzL.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { U as User, M as Mail, k as ShieldCheck, j as ShieldAlert } from "../_libs/lucide-react.mjs";
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
function ManageUsers() {
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const fetchUsers = async () => {
    try {
      const {
        data
      } = await api.get("/admin/users");
      setUsers(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchUsers();
  }, []);
  const handleBanToggle = async (userId, isBanned) => {
    try {
      if (isBanned) {
        await api.patch(`/admin/unban/${userId}`);
        toast.success("User unbanned successfully");
      } else {
        await api.patch(`/admin/ban/${userId}`);
        toast.success("User banned successfully");
      }
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE] min-h-[calc(100vh-64px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "User Management", title: "Manage Users", subtitle: "View and manage all users and owners on the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { text: "Loading Users" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      users.map((u, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.03
      }, className: cn("rounded-2xl border border-black/10 bg-white p-6 transition-all", u.isBanned && "opacity-60 grayscale-[0.5]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E4DD] text-[#0D0D0D]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: u.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "rounded-full bg-[#E8E4DD] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]", children: u.role }),
              u.isBanned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest", children: "Banned" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
              " ",
              u.email
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleBanToggle(u._id, u.isBanned), style: display, className: cn("inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors", u.isBanned ? "bg-[#0D0D0D] text-[#F5F3EE] hover:bg-[#2D2D2D]" : "border-2 border-red-200 text-red-600 hover:bg-red-50"), children: u.isBanned ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
          " Unban User"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4" }),
          " Ban User"
        ] }) })
      ] }) }, u._id)),
      users.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-20 text-center text-sm text-[#2D2D2D]/60", children: "No users found." })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManageUsers, {}) });
export {
  SplitComponent as component
};
