import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Mall } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Check, X, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pending")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <Pending />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function Pending() {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const fetchPending = async () => {
    try {
      const { data } = await api.get("/admin/malls/pending");
      setMalls(data.malls ?? data ?? []);
    } catch {}
  };
  useEffect(() => { fetchPending(); }, []);

  const approve = async (id: string) => {
    try {
      await api.patch(`/admin/malls/${id}/approve`);
      toast.success("Approved");
      fetchPending();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };
  const reject = async (id: string) => {
    const rejectionReason = reasons[id];
    if (!rejectionReason) return toast.error("Provide a reason");
    try {
      await api.patch(`/admin/malls/${id}/reject`, { rejectionReason });
      toast.success("Rejected");
      fetchPending();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader
        eyebrow={`${malls.length} awaiting review`}
        title="Pending Malls"
        subtitle="Review and approve new submissions."
      />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {malls.length === 0 ? (
          <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No pending malls.</p>
        ) : (
          <div className="space-y-4">
            {malls.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">{m.name}</h3>
                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                      <MapPin className="h-3.5 w-3.5" /> {m.city}
                    </div>
                    <p className="mt-3 text-sm text-[#2D2D2D]">
                      Bike ₹{m.bikeRatePerHour}/hr · Car ₹{m.carRatePerHour}/hr
                    </p>
                  </div>
                  <span style={display} className="rounded-full border border-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]">
                    Pending
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <input
                    placeholder="Reason if rejecting..."
                    value={reasons[m._id] || ""}
                    onChange={(e) => setReasons({ ...reasons, [m._id]: e.target.value })}
                    className="flex-1 rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-2.5 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10"
                  />
                  <button
                    onClick={() => approve(m._id)}
                    style={display}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-emerald-800"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => reject(m._id)}
                    style={display}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0D0D0D] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
