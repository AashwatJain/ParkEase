import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { LayoutGrid, Car, CheckCircle, Layers, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/owner/dashboard/$mallId")({
  component: () => (
    <ProtectedRoute roles={["mall-owner"]}>
      <Dashboard />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function Dashboard() {
  const { mallId } = Route.useParams();
  const [mallName, setMallName] = useState("");
  const [stats, setStats] = useState({
    available: 0,
    occupied: 0,
    total: 0,
    revenue: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        // Fetch mall info
        const mallRes = await api.get(`/malls/${mallId}`);
        const mallData = mallRes.data.mall ?? mallRes.data;
        setMallName(mallData?.name ?? "Mall");

        // Fetch live stats
        const statsRes = await api.get("/owner/mall-stats");
        const allStats = statsRes.data.data ?? statsRes.data ?? [];
        const mallStats = allStats.find((s: any) => s.mallId === mallId);

        if (mallStats) {
          setStats({
            available: mallStats.slotsAvailable || 0,
            occupied: mallStats.slotsOccupied || 0,
            total: (mallStats.slotsAvailable || 0) + (mallStats.slotsOccupied || 0),
            revenue: mallStats.revenue || 0,
            totalRevenue: mallStats.totalRevenue || 0,
          });
        }
      } catch {}
    })();
  }, [mallId]);

  const cards = [
    { label: "Available Slots", value: stats.available, Icon: LayoutGrid },
    { label: "Occupied Slots", value: stats.occupied, Icon: Car },
    { label: "Today's Revenue", value: `₹${stats.revenue}`, Icon: IndianRupee, accent: true },
    { label: "Total Revenue", value: `₹${stats.totalRevenue}`, Icon: Layers },
  ];

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader eyebrow={mallName} title="Owner Dashboard" subtitle="Overview of your mall's parking capacity." />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <div className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.accent ? "bg-emerald-700 text-[#F5F3EE]" : "bg-[#0D0D0D] text-[#F5F3EE]"}`}>
                <c.Icon className="h-5 w-5" />
              </div>
              <div style={display} className="text-3xl font-bold tracking-tight text-[#0D0D0D]">{c.value}</div>
              <div style={display} className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">{c.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
