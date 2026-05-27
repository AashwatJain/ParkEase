import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Mall } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapPin, Ban, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
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

function Manage() {
  const [malls, setMalls] = useState<Mall[]>([]);

  const fetchAll = async () => {
    try {
      const { data } = await api.get("/admin/all-malls");
      setMalls(data.malls ?? data ?? []);
    } catch {}
  };
  useEffect(() => { fetchAll(); }, []);

  const ban = async (userId: string, currentlyBanned: boolean) => {
    try {
      await api.patch(`/admin/${currentlyBanned ? "unban" : "ban"}/${userId}`);
      toast.success(currentlyBanned ? "User unbanned" : "User banned");
      fetchAll();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader
        eyebrow={`${malls.length} mall${malls.length === 1 ? "" : "s"} on platform`}
        title="Manage Malls & Owners"
        subtitle="All malls and their owners."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {malls.map((m, i) => {
            const owner = typeof m.owner === "object" ? m.owner : null;
            const banned = (owner as any)?.isBanned;
            return (
              <motion.div
                key={m._id}
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
                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                      <MapPin className="h-3.5 w-3.5" /> {m.city}
                    </div>
                    {owner && (
                      <p className="mt-3 text-sm text-[#2D2D2D]">
                        Owner: <b className="text-[#0D0D0D]">{owner.username}</b> · {owner.email}
                      </p>
                    )}
                  </div>
                  {owner && (
                    <button
                      onClick={() => ban(owner._id, !!banned)}
                      style={display}
                      className={cn(
                        "inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors",
                        banned
                          ? "border border-black/15 text-[#0D0D0D] hover:bg-[#F5F3EE]"
                          : "bg-[#0D0D0D] text-[#F5F3EE] hover:bg-[#2D2D2D]",
                      )}
                    >
                      {banned ? <><ShieldCheck className="h-3.5 w-3.5" /> Unban</> : <><Ban className="h-3.5 w-3.5" /> Ban</>}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          {malls.length === 0 && <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No malls yet.</p>}
        </div>
      </section>
    </div>
  );
}
