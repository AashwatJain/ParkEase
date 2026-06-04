import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Loader } from "@/components/ui/Loader";
import { ShieldAlert, ShieldCheck, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/users")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <ManageUsers />
    </ProtectedRoute>
  ),
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
}

function ManageUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBanToggle = async (userId: string, isBanned: boolean) => {
    try {
      if (isBanned) {
        await api.patch(`/admin/unban/${userId}`);
        toast.success("User unbanned successfully");
      } else {
        await api.patch(`/admin/ban/${userId}`);
        toast.success("User banned successfully");
      }
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="bg-[#F5F3EE] min-h-[calc(100vh-64px)]">
      <PageHeader
        eyebrow="User Management"
        title="Manage Users"
        subtitle="View and manage all users and owners on the platform."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {loading ? (
          <Loader text="Loading Users" />
        ) : (
          <div className="space-y-4">
            {users.map((u, i) => (
              <motion.div
                key={u._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "rounded-2xl border border-black/10 bg-white p-6 transition-all",
                  u.isBanned && "opacity-60 grayscale-[0.5]"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E4DD] text-[#0D0D0D]">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D]">
                          {u.name}
                        </h3>
                        <span style={display} className="rounded-full bg-[#E8E4DD] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]">
                          {u.role}
                        </span>
                        {u.isBanned && (
                          <span style={display} className="rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                            Banned
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-[#2D2D2D]/70">
                        <Mail className="h-3.5 w-3.5" /> {u.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBanToggle(u._id, u.isBanned)}
                    style={display}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors",
                      u.isBanned
                        ? "bg-[#0D0D0D] text-[#F5F3EE] hover:bg-[#2D2D2D]"
                        : "border-2 border-red-200 text-red-600 hover:bg-red-50"
                    )}
                  >
                    {u.isBanned ? (
                      <>
                        <ShieldCheck className="h-4 w-4" /> Unban User
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4 w-4" /> Ban User
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
            {users.length === 0 && <p className="py-20 text-center text-sm text-[#2D2D2D]/60">No users found.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
