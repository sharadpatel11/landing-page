import { Activity, Fingerprint, Lock, Radar, ShieldCheck, Server } from "lucide-react";

function StatPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-1/2 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-x" />
      </div>
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">{label}</p>
          <p className="mt-2 text-lg font-semibold tracking-tight lg:text-xl">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground/90">
          {icon}
        </div>
      </div>
    </div>
  );
}

function RadarWidget() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">SITUATIONAL AWARENESS</p>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          Online
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="relative aspect-square rounded-2xl border border-white/10 bg-black/20 p-3">
          <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-[0.18] animate-grid-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />

          <div className="absolute left-1/2 top-1/2 h-[140%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-12 bg-gradient-to-b from-transparent via-emerald-400/60 to-transparent animate-spin [animation-duration:4.5s]" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <Radar className="h-7 w-7 text-emerald-200/80" />
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Scan</span>
              <span className="text-foreground/90">Active</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/5">
              <div className="h-1.5 w-[78%] rounded-full bg-gradient-to-r from-emerald-400/80 to-indigo-400/80" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-300/90" />
              Hardening
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Baselines applied, drift monitored, and remediation queued.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lock className="h-4 w-4 text-indigo-300/90" />
              Secure by default
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Least privilege, audit trails, and fast rollback paths.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CyberOpsPanel() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 opacity-60">
        <div className="absolute left-6 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-8 bottom-6 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative grid gap-4 lg:gap-5">
        <RadarWidget />

        <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
          <div className="sm:col-span-1 animate-float-y motion-reduce:animate-none">
            <StatPill
              label="RISK SCORE"
              value="Low · 0.14"
              icon={<Fingerprint className="h-5 w-5" />}
            />
          </div>
          <div className="sm:col-span-1 sm:translate-y-2 animate-float-y motion-reduce:animate-none [animation-delay:900ms]">
            <StatPill
              label="DETECTIONS"
              value="12 triaged"
              icon={<Activity className="h-5 w-5" />}
            />
          </div>
          <div className="sm:col-span-1 animate-float-y motion-reduce:animate-none [animation-delay:450ms]">
            <StatPill
              label="INFRA"
              value="Hardened"
              icon={<Server className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

