import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Mall } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapPin, Bike, Car, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner/malls")({
  component: () => (
    <ProtectedRoute roles={["mall-owner"]}>
      <OwnerMalls />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

const badgeStyle = {
  pending: "border border-black/10 text-[#2D2D2D]",
  approved: "bg-emerald-700 text-[#F5F3EE]",
  rejected: "bg-[#0D0D0D] text-[#F5F3EE]",
} as const;

function OwnerMalls() {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/malls");
        setMalls(data.malls ?? data ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader
        eyebrow={`${malls.length} mall${malls.length === 1 ? "" : "s"} registered`}
        title="My Malls"
        subtitle="Manage your registered parking facilities."
        right={
          <Link
            to="/owner/register-mall"
            style={display}
            className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]"
          >
            <Plus className="h-3.5 w-3.5" /> Register Mall
          </Link>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-center text-sm text-[#2D2D2D]/60">Loading...</p>
        ) : malls.length === 0 ? (
          <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No malls yet. Register your first one!</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {malls.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(13,13,13,0.25)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">{m.name}</h3>
                  <span style={display} className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest capitalize",
                    badgeStyle[m.status ?? "pending"],
                  )}>
                    {m.status ?? "pending"}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                  <MapPin className="h-3.5 w-3.5" /> {m.city}
                </div>
                <div className="mt-5 flex gap-4 border-t border-black/10 pt-4 text-sm text-[#2D2D2D]">
                  <span><Bike className="mr-1 inline h-3.5 w-3.5 text-[#0D0D0D]" />₹{m.bikeRatePerHour}/hr</span>
                  <span><Car className="mr-1 inline h-3.5 w-3.5 text-[#0D0D0D]" />₹{m.carRatePerHour}/hr</span>
                </div>
                {m.status === "rejected" && m.rejectionReason && (
                  <p className="mt-3 rounded-lg border border-black/10 bg-[#F5F3EE] p-3 text-xs text-[#2D2D2D]">{m.rejectionReason}</p>
                )}
                {m.status === "approved" && (
                  <div className="mt-5 flex gap-2">
                    <Link
                      to="/owner/dashboard/$mallId"
                      params={{ mallId: m._id }}
                      style={display}
                      className="flex-1 rounded-xl border border-black/15 py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-[#0D0D0D] transition-colors hover:bg-[#F5F3EE]"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/owner/floors/$mallId"
                      params={{ mallId: m._id }}
                      style={display}
                      className="flex-1 rounded-xl bg-[#0D0D0D] py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]"
                    >
                      Floors
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
