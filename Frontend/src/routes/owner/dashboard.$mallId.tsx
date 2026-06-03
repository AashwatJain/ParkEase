import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { LayoutGrid, Car, CheckCircle, Layers } from "lucide-react";

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
    totalSlots: 0,
    totalFloors: 0,
    bikeSlots: 0,
    carSlots: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        // Fetch mall info
        const mallRes = await api.get(`/malls/${mallId}`);
        const mallData = mallRes.data.mall ?? mallRes.data;
        setMallName(mallData?.name ?? "Mall");

        // Fetch floors to calculate slot stats
        const floorsRes = await api.get(`/malls/${mallId}/floors`);
        const floors = floorsRes.data.floors ?? floorsRes.data ?? [];

        let bikeSlots = 0;
        let carSlots = 0;
        for (const f of floors) {
          bikeSlots += f.bikeSlots ?? 0;
          carSlots += f.carSlots ?? 0;
        }

        setStats({
          totalSlots: bikeSlots + carSlots,
          totalFloors: floors.length,
          bikeSlots,
          carSlots,
        });
      } catch {}
    })();
  }, [mallId]);

  const cards = [
    { label: "Total Floors", value: stats.totalFloors, Icon: Layers },
    { label: "Total Slots", value: stats.totalSlots, Icon: LayoutGrid },
    { label: "Bike Slots", value: stats.bikeSlots, Icon: Car },
    { label: "Car Slots", value: stats.carSlots, Icon: CheckCircle, accent: true },
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
