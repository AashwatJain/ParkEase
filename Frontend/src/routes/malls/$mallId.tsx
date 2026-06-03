import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Mall, type Floor } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapPin, Star, Bike, Car, Building2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/malls/$mallId")({ component: MallDetail });

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function MallDetail() {
  const { mallId } = Route.useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [mall, setMall] = useState<Mall | null>(null);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [vehicleType, setVehicleType] = useState<"bike" | "car">("car");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [m, f] = await Promise.all([
          api.get(`/malls/${mallId}`),
          api.get(`/malls/${mallId}/floors`),
        ]);
        setMall(m.data.mall ?? m.data);
        setFloors(f.data.floors ?? f.data ?? []);
      } catch {
        toast.error("Failed to load mall");
      }
    })();
  }, [mallId]);

  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book");
      nav({ to: "/login" });
      return;
    }
    setBooking(true);
    try {
      await api.post("/bookings/entry", { mallId, vehicleType, vehicleNumber });
      toast.success("Booked! Check My Bookings for your QR code.");
      nav({ to: "/bookings" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (!mall) return <div className="bg-[#F5F3EE] py-20 text-center text-sm text-[#2D2D2D]/60">Loading...</div>;

  return (
    <div className="bg-[#F5F3EE]">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
              Live · accepting bookings
            </span>
          </div>
          <h1 style={display} className="mt-3 text-4xl font-bold tracking-tight text-[#0D0D0D] sm:text-5xl">
            {mall.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#2D2D2D]/70">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {mall.address || mall.city}</span>
            {mall.averageRating ? (
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-[#0D0D0D] text-[#0D0D0D]" /> {mall.averageRating.toFixed(1)}</span>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <div style={display} className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0D0D0D]">
              <Bike className="mr-1.5 inline h-3.5 w-3.5" /> ₹{mall.pricing?.bike}/hr · Bike
            </div>
            <div style={display} className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0D0D0D]">
              <Car className="mr-1.5 inline h-3.5 w-3.5" /> ₹{mall.pricing?.car}/hr · Car
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <h2 style={display} className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-[#0D0D0D]">
            <Building2 className="h-5 w-5" /> Floor-wise Availability
          </h2>
          {floors.length === 0 ? (
            <p className="rounded-2xl border border-black/10 bg-white p-8 text-center text-sm text-[#2D2D2D]/60">
              No floors configured yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {floors.map((f) => (
                <motion.div
                  key={f._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">Floor {f.floorNumber}</h3>
                  </div>
                  <Avail label="Bikes" available={f.bikeAvailable ?? f.bikeSlots} total={f.bikeSlots} />
                  <div className="mt-4" />
                  <Avail label="Cars" available={f.carAvailable ?? f.carSlots} total={f.carSlots} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="sticky top-20 rounded-2xl border border-black/10 bg-white p-6">
            <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">Park Here</h3>
            <p className="mt-1 text-sm text-[#2D2D2D]/70">Book your slot in seconds.</p>
            <form onSubmit={book} className="mt-5 space-y-4">
              <div>
                <label style={display} className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
                  Vehicle Type
                </label>
                <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#E8E4DD] p-1">
                  {(["bike", "car"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVehicleType(v)}
                      style={display}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all",
                        vehicleType === v ? "bg-[#0D0D0D] text-[#F5F3EE]" : "text-[#2D2D2D]/70 hover:text-[#0D0D0D]",
                      )}
                    >
                      {v === "bike" ? <Bike className="h-3.5 w-3.5" /> : <Car className="h-3.5 w-3.5" />}
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="vn" style={display} className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
                  Vehicle Number
                </label>
                <input
                  id="vn"
                  required
                  placeholder="MH 01 AB 1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10"
                />
              </div>
              <button
                type="submit"
                disabled={booking}
                style={display}
                className="w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60"
              >
                {booking ? "Booking..." : `Book at ₹${vehicleType === "bike" ? mall.pricing?.bike : mall.pricing?.car}/hr`}
              </button>
              {!user && <p className="text-center text-xs text-[#2D2D2D]/60">You'll be asked to log in</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function Avail({ label, available, total }: { label: string; available: number; total: number }) {
  const pct = total > 0 ? (available / total) * 100 : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">{label}</span>
        <span className="font-semibold text-[#0D0D0D]">{available} / {total}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#E8E4DD]">
        <div className="h-full bg-[#0D0D0D] transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
