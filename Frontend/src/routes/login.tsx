import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";
import { Car } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { refresh } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      await refresh();
      toast.success("Welcome back!");
      if (data.user?.role === "guard") nav({ to: "/guard/scan" });
      else if (data.user?.role === "mall-owner") nav({ to: "/owner/malls" });
      else if (data.user?.role === "admin") nav({ to: "/admin" });
      else nav({ to: "/" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#F5F3EE] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-[0_18px_50px_-25px_rgba(13,13,13,0.25)]">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] text-[#F5F3EE]">
            <Car className="h-5 w-5" />
          </div>
          <h1 style={display} className="mt-5 text-3xl font-bold tracking-tight text-[#0D0D0D]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#2D2D2D]/60">Log in to manage your bookings</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Email" id="email" type="email" value={email} onChange={setEmail} />
          <Field label="Password" id="password" type="password" value={password} onChange={setPassword} />
          <button
            type="submit"
            disabled={loading}
            style={display}
            className="mt-2 w-full rounded-xl bg-[#0D0D0D] py-3 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-[#2D2D2D]/70">
          No account?{" "}
          <Link to="/register" style={display} className="font-bold uppercase tracking-widest text-[#0D0D0D] hover:underline">
            Sign up
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]/10"
      />
    </div>
  );
}
