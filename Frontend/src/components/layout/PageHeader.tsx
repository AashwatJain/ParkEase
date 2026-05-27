import type { ReactNode } from "react";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" };

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <section className="border-b border-black/10 bg-[#F5F3EE]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 py-14 sm:px-6 lg:px-8">
        <div>
          {eyebrow && (
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
              <span style={display} className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/70">
                {eyebrow}
              </span>
            </div>
          )}
          <h1 style={display} className="mt-3 text-4xl font-bold tracking-tight text-[#0D0D0D] sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-3 max-w-xl text-base text-[#2D2D2D]/70">{subtitle}</p>}
        </div>
        {right}
      </div>
    </section>
  );
}
