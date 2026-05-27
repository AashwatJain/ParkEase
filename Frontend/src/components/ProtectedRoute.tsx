import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import type { Role } from "@/lib/api/client";

export function ProtectedRoute({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: Role[];
}) {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (roles && !roles.includes(user.role)) nav({ to: "/" });
  }, [user, loading, roles, nav]);

  if (loading || !user || (roles && !roles.includes(user.role))) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F5F3EE]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8E4DD] border-t-[#0D0D0D]" />
      </div>
    );
  }
  return <>{children}</>;
}
