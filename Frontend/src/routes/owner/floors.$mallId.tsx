import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Floor } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Bike, Car, Layers, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/owner/floors/$mallId")({
  component: () => (
    <ProtectedRoute roles={["mall-owner"]}>
      <Floors />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function Floors() {
  const { mallId } = Route.useParams();
  const [floors, setFloors] = useState<Floor[]>([]);
  const [form, setForm] = useState({ floorNumber: 1, bikeSlots: 20, carSlots: 40 });
  const [loading, setLoading] = useState(false);

  const fetchFloors = async () => {
    try {
      const { data } = await api.get(`/malls/${mallId}/floors`);
      setFloors(data.floors ?? data ?? []);
    } catch {}
  };

  useEffect(() => { fetchFloors(); }, [mallId]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/malls/${mallId}/floors`, form);
      toast.success("Floor added");
      setForm({ floorNumber: form.floorNumber + 1, bikeSlots: 20, carSlots: 40 });
      fetchFloors();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader eyebrow="Mall configuration" title="Manage Floors" subtitle="Add and view floors for this mall." />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <form onSubmit={add} className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D0D0D] text-[#F5F3EE]">
              <Plus className="h-5 w-5" />
            </div>
            <h2 style={display} className="text-base font-bold tracking-tight text-[#0D0D0D]">Add a floor</h2>
          </div>
          <div className="space-y-4">
            <Field label="Floor Number" id="fn" value={String(form.floorNumber)} onChange={(v) => setForm({ ...form, floorNumber: Number(v) })} />
            <Field label="Bike Slots" id="bs" value={String(form.bikeSlots)} onChange={(v) => setForm({ ...form, bikeSlots: Number(v) })} />
            <Field label="Car Slots" id="cs" value={String(form.carSlots)} onChange={(v) => setForm({ ...form, carSlots: Number(v) })} />
            <button
              type="submit"
              disabled={loading}
              style={display}
              className="w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Floor"}
            </button>
          </div>
        </form>

        <div className="lg:col-span-2">
          <h2 style={display} className="mb-5 flex items-center gap-2 text-lg font-bold tracking-tight text-[#0D0D0D]">
            <Layers className="h-5 w-5" /> Floors ({floors.length})
          </h2>
          {floors.length === 0 ? (
            <p className="rounded-2xl border border-black/10 bg-white p-8 text-center text-sm text-[#2D2D2D]/60">No floors yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {floors.map((f, i) => (
                <motion.div
                  key={f._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">Floor {f.floorNumber}</h3>
                  <div className="mt-3 flex gap-4 text-sm text-[#2D2D2D]">
                    <span><Bike className="mr-1 inline h-4 w-4 text-[#0D0D0D]" />{f.bikeSlots} bikes</span>
                    <span><Car className="mr-1 inline h-4 w-4 text-[#0D0D0D]" />{f.carSlots} cars</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, id, value, onChange }: { label: string; id: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} style={display} className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10"
      />
    </div>
  );
}
