import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Mall } from "@/lib/api/client";
import { Search, MapPin, Star, Bike, Car } from "lucide-react";

export const Route = createFileRoute("/malls/")({ component: MallsPage });

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function MallsPage() {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  const fetchMalls = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/malls", { params: { search, city } });
      setMalls(data.malls ?? data ?? []);
    } catch {
      setMalls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMalls();
  }, []);

  const cities = Array.from(new Set(malls.map((m) => m.city))).sort();

  return (
    <div className="bg-[#F5F3EE]">
      {/* Hero / search */}
      <section className="border-b border-black/10 bg-[#F5F3EE]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
              Live · {malls.length} malls online
            </span>
          </div>
          <h1 style={display} className="mt-4 text-4xl font-bold tracking-tight text-[#0D0D0D] sm:text-5xl">
            Browse Malls
          </h1>
          <p className="mt-3 max-w-xl text-base text-[#2D2D2D]/70">
            Find a mall, check live availability, book your slot.
          </p>

          <div className="mt-10 flex flex-col gap-2 rounded-2xl border border-black/10 bg-[#E8E4DD] p-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D2D2D]/50" />
              <input
                placeholder="Search by mall name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchMalls()}
                className="w-full rounded-xl bg-[#F5F3EE] py-3 pl-11 pr-4 text-sm text-[#0D0D0D] placeholder:text-[#2D2D2D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/20"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={display}
              className="rounded-xl bg-[#F5F3EE] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#0D0D0D] focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/20"
            >
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={fetchMalls}
              style={display}
              className="rounded-xl bg-[#0D0D0D] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl bg-[#E8E4DD]" />
            ))}
          </div>
        ) : malls.length === 0 ? (
          <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No malls found.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {malls.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to="/malls/$mallId"
                  params={{ mallId: m._id }}
                  className="group block rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#0D0D0D]/40 hover:shadow-[0_18px_40px_-20px_rgba(13,13,13,0.25)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">
                      {m.name}
                    </h3>
                    {m.averageRating ? (
                      <div className="flex shrink-0 items-center gap-1 rounded-full border border-black/10 px-2 py-1 text-xs font-semibold text-[#0D0D0D]">
                        <Star className="h-3 w-3 fill-[#0D0D0D] text-[#0D0D0D]" />
                        {m.averageRating.toFixed(1)}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                    <MapPin className="h-3.5 w-3.5" /> {m.city}
                  </div>
                  <div className="mt-6 flex gap-6 border-t border-black/10 pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Bike className="h-4 w-4 text-[#0D0D0D]" />
                      <span className="text-[#2D2D2D]/60">Bike</span>
                      <span className="font-semibold text-[#0D0D0D]">₹{m.bikeRatePerHour}/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="h-4 w-4 text-[#0D0D0D]" />
                      <span className="text-[#2D2D2D]/60">Car</span>
                      <span className="font-semibold text-[#0D0D0D]">₹{m.carRatePerHour}/hr</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
