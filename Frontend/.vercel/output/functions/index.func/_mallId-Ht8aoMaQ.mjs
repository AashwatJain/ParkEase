import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { a as Route$7, u as useAuth, d as api } from "./_ssr/router-D_sUj32p.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { h as MapPin, l as Star, B as Bike, C as Car, b as Building2 } from "./_libs/lucide-react.mjs";
import { m as motion } from "./_libs/framer-motion.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "crypto";
import "async_hooks";
import "util";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/axios.mjs";
import "./_libs/form-data.mjs";
import "fs";
import "./_libs/combined-stream.mjs";
import "./_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "./_libs/mime-types.mjs";
import "./_libs/mime-db.mjs";
import "./_libs/asynckit.mjs";
import "./_libs/es-set-tostringtag.mjs";
import "./_libs/get-intrinsic.mjs";
import "./_libs/es-object-atoms.mjs";
import "./_libs/es-errors.mjs";
import "./_libs/math-intrinsics.mjs";
import "./_libs/gopd.mjs";
import "./_libs/es-define-property.mjs";
import "./_libs/has-symbols.mjs";
import "./_libs/get-proto.mjs";
import "./_libs/dunder-proto.mjs";
import "./_libs/call-bind-apply-helpers.mjs";
import "./_libs/function-bind.mjs";
import "./_libs/hasown.mjs";
import "./_libs/has-tostringtag.mjs";
import "./_libs/proxy-from-env.mjs";
import "./_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "./_libs/debug.mjs";
import "./_libs/ms.mjs";
import "tty";
import "./_libs/supports-color.mjs";
import "os";
import "./_libs/has-flag.mjs";
import "./_libs/agent-base.mjs";
import "events";
import "http2";
import "./_libs/follow-redirects.mjs";
import "zlib";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
function MallDetail() {
  const {
    mallId
  } = Route$7.useParams();
  const {
    user
  } = useAuth();
  const nav = useNavigate();
  const [mall, setMall] = reactExports.useState(null);
  const [floors, setFloors] = reactExports.useState([]);
  const [vehicleType, setVehicleType] = reactExports.useState("car");
  const [vehicleNumber, setVehicleNumber] = reactExports.useState("");
  const [booking, setBooking] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const [m, f] = await Promise.all([api.get(`/malls/${mallId}`), api.get(`/malls/${mallId}/floors`)]);
        setMall(m.data.mall ?? m.data);
        setFloors(f.data.floors ?? f.data ?? []);
      } catch {
        toast.error("Failed to load mall");
      }
    })();
  }, [mallId]);
  const book = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book");
      nav({
        to: "/login"
      });
      return;
    }
    setBooking(true);
    try {
      await api.post("/bookings/entry", {
        mallId,
        vehicleType,
        vehicleNumber
      });
      toast.success("Booked! Check My Bookings for your QR code.");
      nav({
        to: "/bookings"
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };
  if (!mall) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#F5F3EE] py-20 text-center text-sm text-[#2D2D2D]/60", children: "Loading..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-black/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: "Live · accepting bookings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: display, className: "mt-3 text-4xl font-bold tracking-tight text-[#0D0D0D] sm:text-5xl", children: mall.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-4 text-sm text-[#2D2D2D]/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
          " ",
          mall.address || mall.city
        ] }),
        mall.averageRating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-[#0D0D0D] text-[#0D0D0D]" }),
          " ",
          mall.averageRating.toFixed(1)
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: display, className: "rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0D0D0D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "mr-1.5 inline h-3.5 w-3.5" }),
          " ₹",
          mall.pricing?.bike,
          "/hr · Bike"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: display, className: "rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0D0D0D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "mr-1.5 inline h-3.5 w-3.5" }),
          " ₹",
          mall.pricing?.car,
          "/hr · Car"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: display, className: "mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-[#0D0D0D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5" }),
          " Floor-wise Availability"
        ] }),
        floors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-black/10 bg-white p-8 text-center text-sm text-[#2D2D2D]/60", children: "No floors configured yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: floors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "rounded-2xl border border-black/10 bg-white p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: [
            "Floor ",
            f.floorNumber
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avail, { label: "Bikes", available: f.bikeAvailable ?? f.bikeSlots, total: f.bikeSlots }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avail, { label: "Cars", available: f.carAvailable ?? f.carSlots, total: f.carSlots })
        ] }, f._id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20 rounded-2xl border border-black/10 bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "text-lg font-bold tracking-tight text-[#0D0D0D]", children: "Park Here" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[#2D2D2D]/70", children: "Book your slot in seconds." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: book, className: "mt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: display, className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: "Vehicle Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1 rounded-xl bg-[#E8E4DD] p-1", children: ["bike", "car"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setVehicleType(v), style: display, className: cn("flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all", vehicleType === v ? "bg-[#0D0D0D] text-[#F5F3EE]" : "text-[#2D2D2D]/70 hover:text-[#0D0D0D]"), children: [
              v === "bike" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-3.5 w-3.5" }),
              v
            ] }, v)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vn", style: display, className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: "Vehicle Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "vn", required: true, placeholder: "MH 01 AB 1234", value: vehicleNumber, onChange: (e) => setVehicleNumber(e.target.value.toUpperCase()), className: "w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: booking, style: display, className: "w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60", children: booking ? "Booking..." : `Book at ₹${vehicleType === "bike" ? mall.pricing?.bike : mall.pricing?.car}/hr` }),
          !user && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-[#2D2D2D]/60", children: "You'll be asked to log in" })
        ] })
      ] }) })
    ] })
  ] });
}
function Avail({
  label,
  available,
  total
}) {
  const pct = total > 0 ? available / total * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0D0D0D]", children: [
        available,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-[#E8E4DD]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[#0D0D0D] transition-all", style: {
      width: `${pct}%`
    } }) })
  ] });
}
export {
  MallDetail as component
};
