import { useEffect, useState } from "react";

const SESSION_KEY = "site_boot_loader_done";

export default function InitialBootLoader() {
  const [hidden, setHidden] = useState(true);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      const done = window.sessionStorage.getItem(SESSION_KEY) === "1";
      if (done) {
        setHidden(true);
        setGone(true);
        return;
      }
    } catch {
      // ignore
    }

    setHidden(false);
    const t1 = window.setTimeout(() => setHidden(true), 900);
    const t2 = window.setTimeout(() => setGone(true), 1200);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "fixed inset-0 z-[80] flex items-center justify-center",
        "bg-background/85 backdrop-blur-xl",
        "transition-opacity duration-300",
        hidden ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -left-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -right-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute inset-0 ops-scanline opacity-60" />
        </div>

        <div className="relative flex items-center gap-4">
          <div className="cyber-loader" />
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground">INITIALIZING</p>
            <p className="mt-1 text-sm text-foreground/90">Bringing systems online…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

