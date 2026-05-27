import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Booking } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Bike, Car, Clock, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  component: () => (
    <ProtectedRoute roles={["user"]}>
      <MyBookings />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data.bookings ?? data ?? []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const exit = async (id: string) => {
    try {
      const { data } = await api.post(`/bookings/exit/${id}`);
      toast.success(`Paid ₹${data.amount ?? data.booking?.amount ?? "—"}. Drive safe!`);
      fetchBookings();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Exit failed");
    }
  };

  const rate = async (id: string, rating: number) => {
    try {
      await api.post(`/ratings/${id}`, { rating, feedback: "" });
      toast.success("Thanks for the rating!");
      fetchBookings();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Rating failed");
    }
  };

  const activeCount = bookings.filter((b) => b.status === "active").length;

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader
        eyebrow={activeCount > 0 ? `${activeCount} active session${activeCount > 1 ? "s" : ""}` : "Your history"}
        title="My Bookings"
        subtitle="All your parking history and active sessions."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-center text-sm text-[#2D2D2D]/60">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No bookings yet.</p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {bookings.map((b, i) => {
              const mall = typeof b.mall === "object" ? b.mall : null;
              const active = b.status === "active";
              return (
                <motion.div
                  key={b._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-black/10 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">
                        {mall?.name || b.mallName || "Mall"}
                      </h3>
                      {mall?.city && (
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                          <MapPin className="h-3.5 w-3.5" /> {mall.city}
                        </div>
                      )}
                    </div>
                    <span style={display} className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                      active ? "bg-emerald-700 text-[#F5F3EE]" : "border border-black/10 text-[#2D2D2D]",
                    )}>
                      {active ? "● Active" : "Completed"}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-4 text-sm">
                    <Info label="Vehicle" value={`${b.vehicleType.toUpperCase()} · ${b.vehicleNumber}`} icon={b.vehicleType === "bike" ? Bike : Car} />
                    <Info label="Slot" value={b.slotNumber ? `F${b.floorNumber ?? "-"} · ${b.slotNumber}` : "—"} />
                    <Info label="Entry" value={new Date(b.entryTime).toLocaleString()} icon={Clock} />
                    {b.exitTime && <Info label="Exit" value={new Date(b.exitTime).toLocaleString()} icon={Clock} />}
                  </div>

                  {active && b.qrCode && (
                    <div className="mt-5 flex items-center gap-4 rounded-xl border border-black/10 bg-[#F5F3EE] p-4">
                      <img src={b.qrCode} alt="QR" className="h-24 w-24 rounded-lg border border-black/10 bg-white p-1" />
                      <div>
                        <p style={display} className="text-sm font-bold tracking-tight text-[#0D0D0D]">Scan at entry</p>
                        <p className="mt-1 text-xs text-[#2D2D2D]/70">Show this QR to the gate scanner.</p>
                      </div>
                    </div>
                  )}

                  {active ? (
                    <button
                      onClick={() => exit(b._id)}
                      style={display}
                      className="mt-5 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D]"
                    >
                      Exit & Pay
                    </button>
                  ) : b.amount != null ? (
                    <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                      <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Total paid</span>
                      <span style={display} className="text-xl font-bold text-[#0D0D0D]">₹{b.amount}</span>
                    </div>
                  ) : null}

                  {!active && !b.rated && (
                    <div className="mt-4 flex items-center gap-1">
                      <span style={display} className="mr-2 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Rate</span>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => rate(b._id, n)} className="text-[#0D0D0D] transition-transform hover:scale-110">
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Info({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div>
      <div style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">{label}</div>
      <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#0D0D0D]">
        {Icon && <Icon className="h-3.5 w-3.5 text-[#2D2D2D]/60" />} {value}
      </div>
    </div>
  );
}
