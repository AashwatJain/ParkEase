import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Store } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/owner/register-mall")({
  component: () => (
    <ProtectedRoute roles={["mall-owner"]}>
      <RegisterMall />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function RegisterMall() {
  const [form, setForm] = useState({ name: "", address: "", city: "", bikeRatePerHour: 10, carRatePerHour: 30 });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/malls", form);
      toast.success("Mall submitted! Awaiting admin approval.");
      nav({ to: "/owner/malls" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F3EE]">
      <PageHeader
        eyebrow="Owner onboarding"
        title="Register a Mall"
        subtitle="Add your parking facility to the platform."
      />

      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <form
          onSubmit={submit}
          className="rounded-3xl border border-black/10 bg-white p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D0D0D] text-[#F5F3EE]">
              <Store className="h-5 w-5" />
            </div>
            <h2 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">Mall details</h2>
          </div>

          <div className="space-y-4">
            <Field label="Mall Name" id="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Address" id="address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            <Field label="City" id="city" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Bike Rate (₹/hr)" id="bike" type="number" value={String(form.bikeRatePerHour)} onChange={(v) => setForm({ ...form, bikeRatePerHour: Number(v) })} />
              <Field label="Car Rate (₹/hr)" id="car" type="number" value={String(form.carRatePerHour)} onChange={(v) => setForm({ ...form, carRatePerHour: Number(v) })} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={display}
            className="mt-6 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({ label, id, type = "text", value, onChange }: { label: string; id: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} style={display} className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        min={type === "number" ? 0 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10"
      />
    </div>
  );
}
