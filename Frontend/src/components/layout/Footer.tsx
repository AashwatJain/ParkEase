import { Link } from "@tanstack/react-router";
import { Car } from "lucide-react";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#0D0D0D] text-[#F5F3EE]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 lg:gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F3EE] text-[#0D0D0D]">
                <Car className="h-4 w-4" strokeWidth={2} />
              </div>
              <span style={display} className="text-lg font-bold tracking-tight">ParkEase.</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-[#F5F3EE]/60">
              Mall parking made effortless. Find, book, and pay — all in one place.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#F5F3EE]/60">
                Live · 50+ malls online
              </span>
            </div>
          </div>

          <FooterCol title="Product">
            <FooterLink to="/malls">Browse Malls</FooterLink>
            <FooterLink to="/bookings">My Bookings</FooterLink>
          </FooterCol>

          <FooterCol title="For Owners">
            <FooterLink to="/owner/malls">Owner Dashboard</FooterLink>
            <FooterLink to="/owner/register-mall">Register Mall</FooterLink>
          </FooterCol>

          <FooterCol title="Account">
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/register">Register</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-widest text-[#F5F3EE]/40 sm:flex-row sm:items-center" style={display}>
          <span>© {new Date().getFullYear()} ParkEase · All rights reserved</span>
          <span>Mumbai · Bangalore · Delhi</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 style={display} className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#F5F3EE]/40">
        {title}
      </h4>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-[#F5F3EE]/80 transition-colors hover:text-[#F5F3EE]"
      >
        {children}
      </Link>
    </li>
  );
}
