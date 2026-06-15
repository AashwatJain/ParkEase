import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link, u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { h as MapPin, Z as Zap, i as Shield, Q as QrCode, e as Clock, G as Gift, S as Search, A as ArrowRight, a as ArrowUpRight, C as Car } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const display$1 = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-black/10 bg-[#0D0D0D] text-[#F5F3EE]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-10 md:grid-cols-5 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F3EE] text-[#0D0D0D]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4", strokeWidth: 2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display$1, className: "text-lg font-bold tracking-tight", children: "ParkEase." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-sm text-sm text-[#F5F3EE]/60", children: "Mall parking made effortless. Find, book, and pay — all in one place." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display$1, className: "text-[10px] font-bold uppercase tracking-widest text-[#F5F3EE]/60", children: "Live · 50+ malls online" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FooterCol, { title: "Product", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/malls", children: "Browse Malls" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/bookings", children: "My Bookings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FooterCol, { title: "For Owners", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/owner/malls", children: "Owner Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/owner/register-mall", children: "Register Mall" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FooterCol, { title: "Account", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/login", children: "Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/register", children: "Register" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-widest text-[#F5F3EE]/40 sm:flex-row sm:items-center", style: display$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ParkEase · All rights reserved"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mumbai · Bangalore · Delhi" })
    ] })
  ] }) });
}
function FooterCol({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: display$1, className: "mb-5 text-[10px] font-bold uppercase tracking-widest text-[#F5F3EE]/40", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm", children })
  ] });
}
function FooterLink({ to, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      className: "text-[#F5F3EE]/80 transition-colors hover:text-[#F5F3EE]",
      children
    }
  ) });
}
const display = {
  fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
};
const body = {
  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif"
};
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F3EE] text-[#0D0D0D]", style: body, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-black/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid min-h-[calc(100vh-64px)] max-w-[1600px] grid-cols-1 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroLeft, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroRight, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-black/10 px-4 py-16 sm:px-6 sm:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 sm:flex-row sm:items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-[#2D2D2D]/60", children: "/ 02 — Toolkit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: display, className: "mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl", children: "Built for modern malls and the people who shop in them." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: MapPin, title: "Live Availability", desc: "Real-time sensor data. Never navigate to a full basement again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Zap, title: "Instant Payments", desc: "UPI & cards. No tickets, no cash, no queues." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Shield, title: "Secure Zones", desc: "Enhanced surveillance and wider slots for premium vehicles." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: QrCode, title: "Express Entry", desc: "ANPR + dynamic QR. Boom barriers lift automatically." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Clock, title: "Extension Alerts", desc: "Extend your booking with one tap from anywhere in the mall." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Gift, title: "Mall Rewards", desc: "Earn points every booking. Redeem at food courts & stores." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-black/10 px-4 py-16 sm:px-6 sm:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-[#2D2D2D]/60", children: "/ 03 — Three steps" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: display, className: "mt-3 mb-12 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl", children: "Locate, lock, glide in." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [{
        n: "01",
        t: "Locate & Select",
        d: "Search your destination mall and choose your floor or premium zone."
      }, {
        n: "02",
        t: "Secure Spot",
        d: "Pre-pay digitally to lock your slot. Receive a dynamic QR code."
      }, {
        n: "03",
        t: "Glide In",
        d: "Follow the in-app guide to your bay. Park and walk straight to shopping."
      }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.45,
        delay: i * 0.08
      }, className: "rounded-2xl border border-black/10 bg-[#E8E4DD] p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: display, className: "text-sm font-bold text-[#2D2D2D]/40", children: [
          s.n,
          " / 03"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "mt-10 text-2xl font-bold sm:text-3xl", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-[#2D2D2D]/70", children: s.d })
      ] }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-16 sm:px-6 sm:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-[#0D0D0D] p-8 text-[#F5F3EE] sm:p-16 lg:p-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-[#F5F3EE]/50", children: "/ 04 — Reclaim your time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: display, className: "mt-6 text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl", children: [
          "14 minutes wasted.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[#E8E4DD]/70", children: "14 seconds with us." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 flex flex-col justify-end gap-4 lg:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F5F3EE]/60", children: "Join thousands of drivers who never circle a mall lot again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: display, className: "rounded-full bg-[#F5F3EE] px-7 py-4 text-sm font-bold uppercase tracking-widest text-[#0D0D0D] hover:bg-white", children: "Create account" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/malls", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: display, className: "rounded-full border border-white/30 bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-white/10", children: "Browse malls" }) })
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function HeroLeft() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const navigate = useNavigate({
    from: "/"
  });
  const handleSearch = (e) => {
    e?.preventDefault();
    navigate({
      to: "/malls",
      search: {
        q: searchQuery
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 12
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.5
  }, className: "flex flex-col justify-between gap-10 border-b border-black/10 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]", children: "/ 01 — Find your spot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0D0D0D]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-[#0D0D0D]" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: display, className: "text-5xl font-bold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl", children: [
        "Where are",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "you headed?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search malls...", className: "w-full border-b-2 border-[#0D0D0D] bg-transparent py-3 pr-10 text-lg placeholder-[#2D2D2D]/40 focus:outline-none", style: body }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "absolute right-0 top-3.5 outline-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-[#0D0D0D]" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSearch(), style: display, className: "group flex w-full items-center justify-center gap-3 bg-[#0D0D0D] py-5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-emerald-700 block", children: [
      "Find parking",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
    ] })
  ] });
}
function HeroRight() {
  const total = 24;
  const initial = Array.from({
    length: total
  }, (_, i) => i % 3 === 0);
  const [available, setAvailable] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setAvailable((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * total);
        next[idx] = !next[idx];
        return next;
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);
  const capacity = Math.round((total - available.filter(Boolean).length) / total * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, transition: {
    duration: 0.6,
    delay: 0.1
  }, className: "relative flex flex-col overflow-hidden bg-[#E8E4DD]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 top-4 z-10 flex items-center gap-2 rounded-sm border border-[#0D0D0D] bg-[#F5F3EE] px-3 py-1.5 sm:left-6 sm:top-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-700" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: display, className: "text-[10px] font-bold uppercase tracking-widest", children: "Live · Phoenix Marketcity" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center p-8 pt-20 sm:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rotate-[-12deg] scale-110", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-2", children: available.map((isFree, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: false, animate: {
        backgroundColor: isFree ? "rgba(4,120,87,0.18)" : "#2D2D2D",
        borderColor: isFree ? "#047857" : "#0D0D0D"
      }, transition: {
        duration: 0.4
      }, className: "relative h-14 w-9 rounded-sm border", children: isFree && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-1 border border-dashed border-emerald-700/40" }) }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-3 h-px w-full bg-[#0D0D0D]/15" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E8E4DD] to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-end justify-between px-6 pb-6 sm:px-10 sm:pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: display, className: "text-5xl font-bold leading-none tracking-tight sm:text-6xl", children: [
          capacity,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60", children: "Capacity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: display, className: "text-[10px] font-bold uppercase tracking-widest", children: "Level 3 — Zone A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-[#2D2D2D]/60", children: "Updated live" })
      ] })
    ] })
  ] });
}
function Feature({
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col bg-[#F5F3EE] p-8 transition-colors hover:bg-[#E8E4DD]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 opacity-70", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: display, className: "mt-10 text-xl font-bold sm:text-2xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#2D2D2D]/70", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" }) })
  ] });
}
export {
  Home as component
};
