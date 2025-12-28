import { ShieldCheck } from "lucide-react";

export default function CyberHeroVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 opacity-60">
        <div className="absolute left-6 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-8 bottom-6 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]">
        <div className="pointer-events-none absolute inset-0 ops-scanline opacity-35" />
        <div className="pointer-events-none absolute inset-0 bg-cyber-grid bg-grid opacity-[0.06] animate-grid-pan" />

        <div className="relative flex items-center justify-center">
          <div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-indigo-400/10" />
            <div className="relative">
              <CybersecurityIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CybersecurityIcon() {
  return (
    <div className="relative grid place-items-center">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-transparent to-indigo-400/10 blur-xl" />
      <div className="pointer-events-none absolute -inset-4 rounded-full border border-white/10 opacity-60 ops-sigil-dash" />
      <ShieldCheck className="h-24 w-24 text-emerald-200/80 ops-sigil-flicker" aria-hidden="true" />
    </div>
  );
}

