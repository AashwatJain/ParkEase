import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapPin, Car, CheckCircle, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/manage")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <Manage />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

const badgeStyle = {
  pending: "border border-black/15 text-[#2D2D2D]",
  approved: "bg-emerald-700 text-[#F5F3EE]",
  rejected: "bg-[#0D0D0D] text-[#F5F3EE]",
} as const;

interface MallStat {
  name: string;
  status: "pending" | "approved" | "rejected";
  liveStats: {
    currentlyParked: number;
    availableSlots: number;
    todayRevenue: number;
  };
}

function Manage() {
  const [malls, setMalls] = useState<MallStat[]>([]);

  const fetchAll = async () => {
    try {
      const { data } = await api.get("/admin/all-malls");
      // Backend returns array directly (not wrapped in {malls})
      setMalls(Array.isArray(data) ? data : data.malls ?? data ?? []);
    } catch {}
  };
  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader
        eyebrow={`${malls.length} mall${malls.length === 1 ? "" : "s"} on platform`}
        title="Manage Malls"
        subtitle="Live stats for all malls on the platform."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {malls.map((m, i) => (
            <motion.div
              key={`${m.name}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">{m.name}</h3>
                    <span style={display} className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest capitalize", badgeStyle[m.status ?? "pending"])}>
                      {m.status ?? "pending"}
                    </span>
                  </div>
                </div>
              </div>

              {m.status === "approved" && (
                <div className="mt-5 grid grid-cols-3 gap-4 border-t border-black/10 pt-4">
                  <div>
                    <div style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Parked Now</div>
                    <div className="mt-1 flex items-center gap-1.5 text-lg font-bold text-[#0D0D0D]">
                      <Car className="h-4 w-4 text-[#2D2D2D]/60" /> {m.liveStats.currentlyParked}
                    </div>
                  </div>
                  <div>
                    <div style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Available</div>
                    <div className="mt-1 flex items-center gap-1.5 text-lg font-bold text-emerald-700">
                      <CheckCircle className="h-4 w-4" /> {m.liveStats.availableSlots}
                    </div>
                  </div>
                  <div>
                    <div style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Today's Revenue</div>
                    <div className="mt-1 flex items-center gap-1.5 text-lg font-bold text-[#0D0D0D]">
                      <IndianRupee className="h-4 w-4 text-[#2D2D2D]/60" /> ₹{m.liveStats.todayRevenue}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {malls.length === 0 && <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No malls yet.</p>}
        </div>
      </section>
    </div>
  );
}
