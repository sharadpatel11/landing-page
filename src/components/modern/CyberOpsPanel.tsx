import type { ReactNode } from "react";
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Clock3, Shield, TerminalSquare } from "lucide-react";

type Severity = "info" | "warn" | "ok";

function OpsHologramIcon() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-16 w-16 text-emerald-200/80"
      role="img"
      aria-label="Ops hologram icon"
    >
      <defs>
        <linearGradient id="opsGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(16,185,129,0.85)" />
          <stop offset="1" stopColor="rgba(99,102,241,0.85)" />
        </linearGradient>
      </defs>

      <g className="ops-sigil-flicker">
        <circle cx="80" cy="80" r="62" fill="none" stroke="url(#opsGlow)" strokeWidth="2" opacity="0.55" />
        <circle
          cx="80"
          cy="80"
          r="72"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
          className="ops-sigil-dash"
        />

        <g className="ops-sigil-rotate" opacity="0.9">
          <path
            d="M80 34 L119 57 L119 103 L80 126 L41 103 L41 57 Z"
            fill="rgba(0,0,0,0.18)"
            stroke="url(#opsGlow)"
            strokeWidth="2"
          />
          <path
            d="M80 54 L103 67 L103 93 L80 106 L57 93 L57 67 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
        </g>

        <circle cx="80" cy="80" r="6" fill="rgba(16,185,129,0.55)" />
        <path d="M80 80 L80 46" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
        <path d="M80 80 L114 64" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <path d="M80 80 L48 104" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <circle cx="80" cy="46" r="3" fill="rgba(99,102,241,0.55)" />
        <circle cx="114" cy="64" r="3" fill="rgba(16,185,129,0.55)" />
        <circle cx="48" cy="104" r="3" fill="rgba(16,185,129,0.55)" />
      </g>
    </svg>
  );
}

function SeverityDot({ severity }: { severity: Severity }) {
  const color =
    severity === "ok"
      ? "bg-emerald-400/80"
      : severity === "warn"
        ? "bg-amber-400/80"
        : "bg-indigo-400/80";

  return <span className={`h-2 w-2 rounded-full ${color}`} aria-hidden="true" />;
}

function SectionTitle({
  icon,
  title,
  meta,
}: {
  icon: ReactNode;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground/90">
          {icon}
        </span>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">{title}</p>
          {meta ? <p className="mt-1 text-xs text-muted-foreground">{meta}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function CyberOpsPanel() {
  const events: Array<{ time: string; severity: Severity; text: string }> = [
    { time: "00:12", severity: "info", text: "Auth logs normalized · 3 sources" },
    { time: "00:09", severity: "warn", text: "Suspicious sign-in pattern · rate limited" },
    { time: "00:06", severity: "ok", text: "EDR policy drift · remediated" },
    { time: "00:03", severity: "info", text: "DNS telemetry ingest · healthy" },
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 opacity-60">
        <div className="absolute left-6 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-8 bottom-6 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative grid gap-4 lg:gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">OPS BRIEF</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <span className="status-indicator h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              Ready
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
                <div className="pointer-events-none absolute inset-0 ops-scanline opacity-40" />
                <div className="relative">
                  <OpsHologramIcon />
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">ACTIVE CONSOLE</p>
                <p className="mt-1 text-sm font-medium text-foreground/90">Triage → Document → Remediate</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <TerminalSquare className="h-3.5 w-3.5 text-emerald-200/70" />
                  <span className="truncate">signals queue · operator mode</span>
                  <span className="text-white/10">•</span>
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>Updated just now</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p className="font-mono">
                <span className="text-foreground/80">$</span> triage --queue=signals --mode=quiet
              </p>
              <p className="font-mono">
                <span className="text-foreground/80">→</span> keep alerts actionable · document decisions
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
            <SectionTitle
              icon={<Activity className="h-4 w-4" />}
              title="EVENT STREAM"
              meta="Last 15 minutes (sample)"
            />

            <div className="mt-4 space-y-2">
              {events.map((e) => (
                <div
                  key={`${e.time}-${e.text}`}
                  className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2"
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <SeverityDot severity={e.severity} />
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{e.text}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{e.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
            <SectionTitle icon={<Shield className="h-4 w-4" />} title="NEXT ACTIONS" meta="Operator checklist" />

            <div className="mt-4 space-y-2">
              {[
                { icon: <CheckCircle2 className="h-4 w-4 text-emerald-300/90" />, text: "Harden baseline & monitor drift" },
                { icon: <AlertTriangle className="h-4 w-4 text-amber-300/90" />, text: "Review risky auth patterns (SaaS)" },
                { icon: <ChevronRight className="h-4 w-4 text-indigo-300/90" />, text: "Ship a short incident note template" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2"
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground">SIGNAL COVERAGE</p>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Auth", value: 88 },
                  { label: "EDR", value: 74 },
                  { label: "DNS", value: 92 },
                  { label: "Netflow", value: 61 },
                ].map((row) => (
                  <div key={row.label} className="grid grid-cols-[52px,1fr,32px] items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{row.label}</span>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400/70 to-indigo-400/70"
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                    <span className="text-right font-mono text-[11px] text-muted-foreground">{row.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

