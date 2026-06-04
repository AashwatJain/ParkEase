import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Booking } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Loader } from "@/components/ui/Loader";
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

  const [ratedBookings, setRatedBookings] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("ratedBookings") || "[]");
  });
  const [feedbackInputs, setFeedbackInputs] = useState<Record<string, string>>({});
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, any>>({});

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings/my");
      const fetchedBookings = data.bookings ?? data ?? [];
      setBookings(fetchedBookings);

      // Frontend-only hack to get past reviews without touching backend
      const mallIds = [...new Set(fetchedBookings.map((b: any) => 
        (typeof b.mall === "object" && b.mall !== null) ? b.mall._id : b.mall
      ).filter(Boolean))];

      const reviewsMap: Record<string, any> = {};
      await Promise.all(
        mallIds.map(async (mallId) => {
          try {
            const res = await api.get(`/ratings/mall/${mallId}?limit=100`);
            const ratings = res.data?.ratings ?? res.data?.data?.ratings ?? [];
            ratings.forEach((r: any) => {
              if (r.booking) reviewsMap[r.booking] = r;
            });
          } catch (e) {}
        })
      );
      setSubmittedReviews(reviewsMap);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const exit = async (id: string) => {
    try {
      const { data } = await api.patch(`/bookings/exit/${id}`);
      toast.success(`Paid ₹${data.fare ?? data.booking?.fare ?? "—"}. Drive safe!`);
      fetchBookings();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Exit failed");
    }
  };

  const rate = async (id: string, rating: number) => {
    try {
      const feedback = feedbackInputs[id] || "";
      await api.post(`/ratings/${id}`, { rate: rating, feedback: feedback || "Great!" });
      const newRated = [...ratedBookings, id];
      setRatedBookings(newRated);
      localStorage.setItem("ratedBookings", JSON.stringify(newRated));
      setSubmittedReviews(prev => ({ ...prev, [id]: { rating, feedback } }));
      toast.success("Thanks for the rating!");
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "";
      if (errMsg.includes("duplicate") || errMsg.includes("E11000") || errMsg.includes("already")) {
        const newRated = [...ratedBookings, id];
        setRatedBookings(newRated);
        localStorage.setItem("ratedBookings", JSON.stringify(newRated));
        toast.info("You had already rated this! Hiding stars.");
      } else {
        toast.error(errMsg || "Rating failed");
      }
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
          <Loader text="Loading Bookings" />
        ) : bookings.length === 0 ? (
          <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No bookings yet.</p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {bookings.map((b, i) => {
              const mall = (typeof b.mall === "object" && b.mall !== null) ? b.mall as any : null;
              const slotObj = (typeof b.slot === "object" && b.slot !== null) ? b.slot as any : null;
              const floorObj = (typeof b.floor === "object" && b.floor !== null) ? b.floor as any : null;
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
                        {mall?.name || b.mall?.name || "Mall"}
                      </h3>
                      {(mall?.city || b.mall?.city) && (
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                          <MapPin className="h-3.5 w-3.5" /> {mall?.city || b.mall?.city}
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
                    <Info label="Slot" value={slotObj?.slotNumber ? `F${floorObj?.floorNumber ?? "-"} · ${slotObj.slotNumber}` : "—"} />
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
                  ) : b.fare ? (
                    <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                      <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Total paid</span>
                      <span style={display} className="text-xl font-bold text-[#0D0D0D]">₹{b.fare}</span>
                    </div>
                  ) : null}

                  {!active && !ratedBookings.includes(b._id) && !submittedReviews[b._id] && (
                    <div className="mt-4 border-t border-black/10 pt-4">
                      <div className="flex flex-col gap-2">
                        <textarea
                          placeholder="How was your parking experience?"
                          className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] p-3 text-sm text-[#0D0D0D] placeholder-[#2D2D2D]/50 focus:border-[#0D0D0D] focus:outline-none"
                          rows={2}
                          value={feedbackInputs[b._id] || ""}
                          onChange={(e) => setFeedbackInputs(prev => ({ ...prev, [b._id]: e.target.value }))}
                        />
                        <div className="flex items-center justify-between">
                          <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Select Rating</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button key={n} onClick={() => rate(b._id, n)} className="text-[#0D0D0D] transition-transform hover:scale-110">
                                <Star className="h-6 w-6 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!active && (ratedBookings.includes(b._id) || submittedReviews[b._id]) && (
                    <div className="mt-4 border-t border-black/10 pt-4">
                      <div className="rounded-xl border border-black/10 bg-[#F5F3EE] p-4">
                        <div className="flex items-center justify-between">
                          <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/60">Your Review</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star 
                                key={n} 
                                className={cn("h-4 w-4", n <= (submittedReviews[b._id]?.rating || 5) ? "fill-[#0D0D0D] text-[#0D0D0D]" : "text-black/10")} 
                              />
                            ))}
                          </div>
                        </div>
                        {submittedReviews[b._id]?.feedback && (
                          <p className="mt-2 text-sm text-[#2D2D2D]">{submittedReviews[b._id].feedback}</p>
                        )}
                      </div>
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
