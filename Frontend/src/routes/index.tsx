import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Search,
  MapPin,
  Zap,
  Shield,
  QrCode,
  Clock,
  Gift,
  ArrowUpRight,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/")({ component: Home });

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };
const body = { fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" };

const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"];

function Home() {
  return (
    <div className="bg-[#F5F3EE] text-[#0D0D0D]" style={body}>
      {/* SPLIT SCREEN HERO */}
      <section className="border-b border-black/10">
        <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1600px] grid-cols-1 lg:grid-cols-2">
          {/* LEFT — search & controls */}
          <HeroLeft />
          {/* RIGHT — live visualization */}
          <HeroRight />
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-black/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#2D2D2D]/60">
                / 02 — Toolkit
              </span>
              <h2 style={display} className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
                Built for modern malls and the people who shop in them.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={MapPin} title="Live Availability" desc="Real-time sensor data. Never navigate to a full basement again." />
            <Feature icon={Zap} title="Instant Payments" desc="UPI & cards. No tickets, no cash, no queues." />
            <Feature icon={Shield} title="Secure Zones" desc="Enhanced surveillance and wider slots for premium vehicles." />
            <Feature icon={QrCode} title="Express Entry" desc="ANPR + dynamic QR. Boom barriers lift automatically." />
            <Feature icon={Clock} title="Extension Alerts" desc="Extend your booking with one tap from anywhere in the mall." />
            <Feature icon={Gift} title="Mall Rewards" desc="Earn points every booking. Redeem at food courts & stores." />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="border-b border-black/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#2D2D2D]/60">
            / 03 — Three steps
          </span>
          <h2 style={display} className="mt-3 mb-12 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
            Locate, lock, glide in.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Locate & Select", d: "Search your destination mall and choose your floor or premium zone." },
              { n: "02", t: "Secure Spot", d: "Pre-pay digitally to lock your slot. Receive a dynamic QR code." },
              { n: "03", t: "Glide In", d: "Follow the in-app guide to your bay. Park and walk straight to shopping." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border border-black/10 bg-[#E8E4DD] p-8"
              >
                <div style={display} className="text-sm font-bold text-[#2D2D2D]/40">{s.n} / 03</div>
                <h3 style={display} className="mt-10 text-2xl font-bold sm:text-3xl">{s.t}</h3>
                <p className="mt-3 text-sm text-[#2D2D2D]/70">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-[#0D0D0D] p-8 text-[#F5F3EE] sm:p-16 lg:p-24">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#F5F3EE]/50">
                  / 04 — Reclaim your time
                </span>
                <h2 style={display} className="mt-6 text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                  14 minutes wasted.<br />
                  <span className="italic text-[#E8E4DD]/70">14 seconds with us.</span>
                </h2>
              </div>
              <div className="col-span-12 flex flex-col justify-end gap-4 lg:col-span-4">
                <p className="text-sm text-[#F5F3EE]/60">
                  Join thousands of drivers who never circle a mall lot again.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/register">
                    <button style={display} className="rounded-full bg-[#F5F3EE] px-7 py-4 text-sm font-bold uppercase tracking-widest text-[#0D0D0D] hover:bg-white">
                      Create account
                    </button>
                  </Link>
                  <Link to="/malls">
                    <button style={display} className="rounded-full border border-white/30 bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-white/10">
                      Browse malls
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function HeroLeft() {
  const [activeCity, setActiveCity] = useState("Mumbai");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-between gap-10 border-b border-black/10 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-16"
    >
      <header className="flex items-start justify-between">
        <div style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]">
          / 01 — Find your spot
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0D0D0D]">
          <span className="h-1 w-1 rounded-full bg-[#0D0D0D]" />
        </div>
      </header>

      <div className="space-y-8">
        <h1 style={display} className="text-5xl font-bold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
          Where are<br />you headed?
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search malls..."
            className="w-full border-b-2 border-[#0D0D0D] bg-transparent py-3 pr-10 text-lg placeholder-[#2D2D2D]/40 focus:outline-none"
            style={body}
          />
          <Search className="absolute right-0 top-3.5 h-5 w-5 text-[#0D0D0D]" />
        </div>

        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCity(c)}
              style={display}
              className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                activeCity === c
                  ? "bg-[#0D0D0D] text-[#F5F3EE]"
                  : "border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F3EE]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Link to="/malls" className="block">
        <button
          style={display}
          className="group flex w-full items-center justify-center gap-3 bg-[#0D0D0D] py-5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-emerald-700"
        >
          Find parking
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </Link>
    </motion.div>
  );
}

// Live parking grid — auto-flips a few cells every 2s
function HeroRight() {
  const total = 24;
  const initial = Array.from({ length: total }, (_, i) => i % 3 === 0);
  const [available, setAvailable] = useState<boolean[]>(initial);

  useEffect(() => {
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

  const capacity = Math.round(((total - available.filter(Boolean).length) / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative flex flex-col overflow-hidden bg-[#E8E4DD]"
    >
      {/* Live badge */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-sm border border-[#0D0D0D] bg-[#F5F3EE] px-3 py-1.5 sm:left-6 sm:top-6">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
        </span>
        <span style={display} className="text-[10px] font-bold uppercase tracking-widest">
          Live · Phoenix Marketcity
        </span>
      </div>

      {/* Tilted grid */}
      <div className="flex flex-1 items-center justify-center p-8 pt-20 sm:p-12">
        <div className="rotate-[-12deg] scale-110">
          <div className="grid grid-cols-6 gap-2">
            {available.map((isFree, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor: isFree ? "rgba(4,120,87,0.18)" : "#2D2D2D",
                  borderColor: isFree ? "#047857" : "#0D0D0D",
                }}
                transition={{ duration: 0.4 }}
                className="relative h-14 w-9 rounded-sm border"
              >
                {isFree && (
                  <div className="absolute inset-1 border border-dashed border-emerald-700/40" />
                )}
              </motion.div>
            ))}
          </div>
          {/* Road divider */}
          <div className="my-3 h-px w-full bg-[#0D0D0D]/15" />
        </div>
      </div>

      {/* Bottom fade + stats */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E8E4DD] to-transparent" />
      <div className="relative z-10 flex items-end justify-between px-6 pb-6 sm:px-10 sm:pb-10">
        <div>
          <div style={display} className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
            {capacity}%
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">
            Capacity
          </div>
        </div>
        <div className="text-right">
          <div style={display} className="text-[10px] font-bold uppercase tracking-widest">
            Level 3 — Zone A
          </div>
          <div className="text-[10px] text-[#2D2D2D]/60">Updated live</div>
        </div>
      </div>
    </motion.div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof MapPin;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex flex-col bg-[#F5F3EE] p-8 transition-colors hover:bg-[#E8E4DD]">
      <Icon className="h-5 w-5 opacity-70" strokeWidth={1.5} />
      <h3 style={display} className="mt-10 text-xl font-bold sm:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[#2D2D2D]/70">{desc}</p>
      <div className="mt-8">
        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </div>
  );
}
