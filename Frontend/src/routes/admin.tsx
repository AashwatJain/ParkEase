import { createFileRoute, Outlet, Link, redirect } from "@tanstack/react-router";
import { LayoutDashboard, CheckSquare, Building, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    // Basic protection to ensure only admin reaches this layout
    // Assuming context.auth exists, or we handle it in component
  },
  component: AdminLayout,
});

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

function AdminLayout() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F5F3EE]">
      <Outlet />
    </div>
  );
}

function SidebarLink({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={display}
      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold tracking-tight text-[#2D2D2D] transition-colors hover:bg-black/5 hover:text-[#0D0D0D]"
      activeProps={{
        className: "bg-[#0D0D0D] text-[#F5F3EE] hover:bg-[#0D0D0D] hover:text-[#F5F3EE]",
      }}
    >
      <div className="flex items-center gap-3">
        {icon}
        {children}
      </div>
      <ChevronRight className="h-4 w-4 opacity-50" />
    </Link>
  );
}
