import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Car, LogOut } from "lucide-react";
import { toast } from "sonner";


const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

export function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    toast.success("Logged out");
    nav({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-[#F5F3EE]/85 backdrop-blur-md dark:border-white/10 dark:bg-[#0D0D0D]/85">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D0D0D] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#0D0D0D]">
            <Car className="h-4 w-4" strokeWidth={2} />
          </div>
          <span style={display} className="text-lg font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F3EE]">
            ParkEase.
          </span>
        </Link>

        {/* Center: nav */}
        <nav className="hidden items-center justify-center gap-1 md:flex">
          <NavLink to="/malls">Browse Malls</NavLink>
          {user?.role === "user" && <NavLink to="/bookings">My Bookings</NavLink>}
          {user?.role === "mall-owner" && (
            <>
              <NavLink to="/owner/malls">My Malls</NavLink>
              <NavLink to="/owner/register-mall">Register Mall</NavLink>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <NavLink to="/admin/pending">Pending</NavLink>
              <NavLink to="/admin/manage">Manage</NavLink>
            </>
          )}
        </nav>

        {/* Right: theme + auth */}
        <div className="flex items-center gap-3 justify-self-end">

          {user ? (
            <>
              <span className="hidden text-xs uppercase tracking-widest text-[#2D2D2D]/70 sm:inline dark:text-[#F5F3EE]/70" style={display}>
                Hi, <b className="text-[#0D0D0D] dark:text-[#F5F3EE]">{user.username}</b>
              </span>
              <button
                onClick={onLogout}
                style={display}
                className="flex items-center gap-1.5 rounded-full border border-[#0D0D0D]/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0D0D0D] transition-colors hover:bg-[#0D0D0D] hover:text-[#F5F3EE] dark:border-[#F5F3EE]/30 dark:text-[#F5F3EE]"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={display}
                className="hidden rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0D0D0D] hover:underline sm:inline-block dark:text-[#F5F3EE]"
              >
                Login
              </Link>
              <Link
                to="/register"
                style={display}
                className="rounded-full bg-[#0D0D0D] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F5F3EE] hover:bg-emerald-700 dark:bg-[#F5F3EE] dark:text-[#0D0D0D] dark:hover:bg-emerald-700 dark:hover:text-[#F5F3EE]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={display}
      className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#2D2D2D] transition-colors hover:text-[#0D0D0D] dark:text-[#F5F3EE]/70 dark:hover:text-[#F5F3EE]"
      activeProps={{
        className:
          "bg-[#0D0D0D] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#0D0D0D]",
      }}
    >
      {children}
    </Link>
  );
}
