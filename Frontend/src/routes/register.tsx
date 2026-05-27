import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";
import { Car, User, Store } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({ component: RegisterPage });

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [role, setRole] = useState<"user" | "mall-owner">("user");
  const [loading, setLoading] = useState(false);
  const { refresh } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { ...form, role });
      await refresh();
      toast.success("Account created!");
      nav({ to: "/" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#F5F3EE] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-[0_18px_50px_-25px_rgba(13,13,13,0.25)]">
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] text-[#F5F3EE]">
            <Car className="h-5 w-5" />
          </div>
          <h1 style={display} className="mt-5 text-3xl font-bold tracking-tight text-[#0D0D0D]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[#2D2D2D]/60">Park smarter in seconds</p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-[#E8E4DD] p-1">
          {[
            { v: "user", label: "User", Icon: User },
            { v: "mall-owner", label: "Mall Owner", Icon: Store },
          ].map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => setRole(opt.v as any)}
              style={display}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all",
                role === opt.v ? "bg-[#0D0D0D] text-[#F5F3EE]" : "text-[#2D2D2D]/70 hover:text-[#0D0D0D]",
              )}
            >
              <opt.Icon className="h-3.5 w-3.5" />
              {opt.label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Username" id="username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} />
          <Field label="Email" id="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Password" id="password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
          <button
            type="submit"
            disabled={loading}
            style={display}
            className="mt-2 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-[#2D2D2D]/70">
          Already have an account?{" "}
          <Link to="/login" style={display} className="font-bold uppercase tracking-widest text-[#0D0D0D] hover:underline">
            Log in
          </Link>
        </p>
      </div>
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
        minLength={type === "password" ? 6 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10"
      />
    </div>
  );
}
