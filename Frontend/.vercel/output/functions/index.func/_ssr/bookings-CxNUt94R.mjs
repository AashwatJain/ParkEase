import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as api } from "./router-D_sUj32p.mjs";
import { a as ProtectedRoute, P as PageHeader } from "./PageHeader-Bun2U15s.mjs";
import { L as Loader } from "./Loader-Dt07BbzL.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { h as MapPin, B as Bike, C as Car, e as Clock, l as Star } from "../_libs/lucide-react.mjs";
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
function MyBookings() {
  const [bookings, setBookings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [ratedBookings, setRatedBookings] = reactExports.useState(() => {
    return JSON.parse(localStorage.getItem("ratedBookings") || "[]");
  });
  const [feedbackInputs, setFeedbackInputs] = reactExports.useState({});
  const [submittedReviews, setSubmittedReviews] = reactExports.useState({});
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await api.get("/bookings/my");
      const fetchedBookings = data.bookings ?? data ?? [];
      setBookings(fetchedBookings);
      const mallIds = [...new Set(fetchedBookings.map((b) => typeof b.mall === "object" && b.mall !== null ? b.mall._id : b.mall).filter(Boolean))];
      const reviewsMap = {};
      await Promise.all(mallIds.map(async (mallId) => {
        try {
          const res = await api.get(`/ratings/mall/${mallId}?limit=100`);
          const ratings = res.data?.ratings ?? res.data?.data?.ratings ?? [];
          ratings.forEach((r) => {
            if (r.booking) reviewsMap[r.booking] = r;
          });
        } catch (e) {
        }
      }));
      setSubmittedReviews(reviewsMap);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchBookings();
  }, []);
  const exit = async (id) => {
    try {
      const {
        data
      } = await api.patch(`/bookings/exit/${id}`);
      toast.success(`Paid ₹${data.fare ?? data.booking?.fare ?? "—"}. Drive safe!`);
      fetchBookings();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Exit failed");
    }
  };
  const rate = async (id, rating) => {
    try {
      const feedback = feedbackInputs[id] || "";
      await api.post(`/ratings/${id}`, {
        rate: rating,
        feedback: feedback || "Great!"
      });
      const newRated = [...ratedBookings, id];
      setRatedBookings(newRated);
      localStorage.setItem("ratedBookings", JSON.stringify(newRated));
      setSubmittedReviews((prev) => ({
        ...prev,
        [id]: {
          rating,
          feedback
        }
      }));
      toast.success("Thanks for the rating!");
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message || "";
      if (errMsg.includes("duplicate") || errMsg.includes("E11000") || errMsg.includes("already")) {
        const newRated = [...ratedBookings, id];
        setRatedBookings(newRated);
        localStorage.setItem("ratedBookings", JSON.stringify(newRated));
        toast.info("You had already rated this! Hiding stars.");
      } else {
        toast.error(errMsg || "Rating failed");
      }
    }
  };
  const activeCount = bookings.filter((b) => b.status === "active").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: activeCount > 0 ? `${activeCount} active session${activeCount > 1 ? "s" : ""}` : "Your history", title: "My Bookings", subtitle: "All your parking history and active sessions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { text: "Loading Bookings" }) : bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-20 text-center text-sm text-[#2D2D2D]/60", children: "No bookings yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 lg:grid-cols-2", children: bookings.map((b, i) => {
      const mall = typeof b.mall === "object" && b.mall !== null ? b.mall : null;
      const slotObj = typeof b.slot === "object" && b.slot !== null ? b.slot : null;
      const floorObj = typeof b.floor === "object" && b.floor !== null ? b.floor : null;
      const active = b.status === "active";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.05
      }, className: "rounded-2xl border border-black/10 bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: mall?.name || b.mall?.name || "Mall" }),
            (mall?.city || b.mall?.city) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              " ",
              mall?.city || b.mall?.city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: cn("rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest", active ? "bg-emerald-700 text-[#F5F3EE]" : "border border-black/10 text-[#2D2D2D]"), children: active ? "● Active" : "Completed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Vehicle", value: `${b.vehicleType.toUpperCase()} · ${b.vehicleNumber}`, icon: b.vehicleType === "bike" ? Bike : Car }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Slot", value: slotObj?.slotNumber ? `F${floorObj?.floorNumber ?? "-"} · ${slotObj.slotNumber}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Entry", value: new Date(b.entryTime).toLocaleString(), icon: Clock }),
          b.exitTime && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Exit", value: new Date(b.exitTime).toLocaleString(), icon: Clock })
        ] }),
        active && b.qrCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-4 rounded-xl border border-black/10 bg-[#F5F3EE] p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: b.qrCode, alt: "QR", className: "h-24 w-24 rounded-lg border border-black/10 bg-white p-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: display, className: "text-sm font-bold tracking-tight text-[#0D0D0D]", children: "Scan at entry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#2D2D2D]/70", children: "Show this QR to the gate scanner." })
          ] })
        ] }),
        active ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => exit(b._id), style: display, className: "mt-5 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]", children: "Exit & Pay" }) : b.fare ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between border-t border-black/10 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Total paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: display, className: "text-xl font-bold text-[#0D0D0D]", children: [
            "₹",
            b.fare
          ] })
        ] }) : null,
        !active && !ratedBookings.includes(b._id) && !submittedReviews[b._id] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-black/10 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "How was your parking experience?", className: "w-full rounded-xl border border-black/10 bg-[#F5F3EE] p-3 text-sm text-[#0D0D0D] placeholder-[#2D2D2D]/50 focus:border-[#0D0D0D] focus:outline-none", rows: 2, value: feedbackInputs[b._id] || "", onChange: (e) => setFeedbackInputs((prev) => ({
            ...prev,
            [b._id]: e.target.value
          })) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Select Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => rate(b._id, n), className: "text-[#0D0D0D] transition-transform hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 fill-current" }) }, n)) })
          ] })
        ] }) }),
        !active && (ratedBookings.includes(b._id) || submittedReviews[b._id]) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-black/10 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-black/10 bg-[#F5F3EE] p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Your Review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-4 w-4", n <= (submittedReviews[b._id]?.rating || 5) ? "fill-[#0D0D0D] text-[#0D0D0D]" : "text-black/10") }, n)) })
          ] }),
          submittedReviews[b._id]?.feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#2D2D2D]", children: submittedReviews[b._id].feedback })
        ] }) })
      ] }, b._id);
    }) }) })
  ] });
}
function Info({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-sm font-medium text-[#0D0D0D]", children: [
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-[#2D2D2D]/60" }),
      " ",
      value
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["user"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyBookings, {}) });
export {
  SplitComponent as component
};
