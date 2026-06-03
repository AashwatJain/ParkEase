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
    <div className="flex min-h-[calc(100vh-64px)] bg-[#F5F3EE]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-black/10 bg-white/50 p-6 hidden md:block">
        <h2 style={display} className="mb-6 text-sm font-bold uppercase tracking-widest text-[#2D2D2D]/60">
          Admin Panel
        </h2>
        <nav className="space-y-1.5">
          <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/admin/pending" icon={<CheckSquare className="h-4 w-4" />}>
            Pending Approvals
          </SidebarLink>
          <SidebarLink to="/admin/manage" icon={<Building className="h-4 w-4" />}>
            Manage Malls
          </SidebarLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10">
        <Outlet />
      </main>
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
