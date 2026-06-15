import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/owner/guards")({
  component: ManageGuardsPage,
});

function ManageGuardsPage() {
  const [malls, setMalls] = useState<any[]>([]);
  const [selectedMall, setSelectedMall] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const res = await api.get("/owner/malls");
        setMalls(res.data.data);
        if (res.data.data.length > 0) setSelectedMall(res.data.data[0]._id);
      } catch (err) {}
    };
    if (user?.role === "mall-owner") {
      fetchMalls();
    }
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMall) return toast.error("Please select a mall");
    
    setLoading(true);
    try {
      await api.post("/owner/guard", { username, email, password, mallId: selectedMall });
      toast.success("Guard registered successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to register guard");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "mall-owner") {
    return <div className="p-10 text-center">Unauthorized</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F3EE] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0D0D0D]">Manage Guards</h1>
            <p className="mt-1.5 text-sm text-[#2D2D2D]/60">Create staff accounts for your parking gates.</p>
          </div>
        </div>
        
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-xl font-bold uppercase tracking-widest text-[#0D0D0D]">Register New Guard</h2>
          <form onSubmit={submit} className="space-y-5 max-w-md">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">Assign to Mall</label>
              <select
                value={selectedMall}
                onChange={(e) => setSelectedMall(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none"
              >
                <option value="" disabled>Select a mall</option>
                {malls.map(m => (
                  <option key={m._id} value={m._id}>{m.name} - {m.city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">Username</label>
              <input type="text" required value={username} onChange={e=>setUsername(e.target.value)} className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">Email Address</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">Temporary Password</label>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border border-black/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#0D0D0D] focus:border-[#0D0D0D]/40 focus:outline-none" />
            </div>
            <button type="submit" disabled={loading} className="mt-6 w-full rounded-xl bg-[#0D0D0D] py-4 text-xs font-bold uppercase tracking-widest text-[#F5F3EE] transition-colors hover:bg-[#2D2D2D] disabled:opacity-50">
              {loading ? "Registering..." : "Create Guard Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
