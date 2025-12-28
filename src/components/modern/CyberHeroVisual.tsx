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

        <div className="relative flex items-center gap-6">
          <div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-indigo-400/10" />
            <div className="relative">
              <CyberShieldHologram />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground">SECURITY HOLOGRAM</p>
            <p className="mt-2 text-lg font-medium text-foreground/90">Encrypted · Monitored · Incident-ready</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A clean, calm interface — backed by defensive engineering.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              Shield online
              <span className="text-white/10">•</span>
              TLS 1.3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CyberShieldHologram() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-24 w-24 text-emerald-200/80"
      role="img"
      aria-label="Cybersecurity shield hologram"
    >
      <defs>
        <linearGradient id="cyberGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(16,185,129,0.9)" />
          <stop offset="1" stopColor="rgba(99,102,241,0.9)" />
        </linearGradient>
      </defs>

      <g className="ops-sigil-flicker">
        <circle cx="90" cy="90" r="76" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
        <circle
          cx="90"
          cy="90"
          r="66"
          fill="none"
          stroke="url(#cyberGlow)"
          strokeWidth="2"
          className="ops-sigil-dash"
          opacity="0.7"
        />

        <g className="ops-sigil-rotate" opacity="0.95">
          <path
            d="M90 28 C112 38 128 42 144 46 V90 C144 124 118 146 90 154 C62 146 36 124 36 90 V46 C52 42 68 38 90 28 Z"
            fill="rgba(0,0,0,0.18)"
            stroke="url(#cyberGlow)"
            strokeWidth="2"
          />
          <path
            d="M90 54 C106 61 118 64 128 66 V92 C128 112 112 128 90 134 C68 128 52 112 52 92 V66 C62 64 74 61 90 54 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
        </g>

        {/* circuit traces */}
        <path d="M90 90 L90 44" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <path d="M90 90 L128 72" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <path d="M90 90 L56 124" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />

        <circle cx="90" cy="44" r="3" fill="rgba(99,102,241,0.65)" />
        <circle cx="128" cy="72" r="3" fill="rgba(16,185,129,0.65)" />
        <circle cx="56" cy="124" r="3" fill="rgba(16,185,129,0.65)" />

        <circle cx="90" cy="90" r="6" fill="rgba(16,185,129,0.55)" />
      </g>
    </svg>
  );
}

