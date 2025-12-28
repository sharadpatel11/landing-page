import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type Phase = "idle" | "loading" | "settling";

export default function RouteLoadingBar() {
  const location = useLocation();
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    // Clear any pending timers.
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    setPhase("loading");
    timers.current.push(
      window.setTimeout(() => setPhase("settling"), 420),
      window.setTimeout(() => setPhase("idle"), 820)
    );

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [location.key]);

  const visible = phase !== "idle";
  const width = phase === "loading" ? "72%" : phase === "settling" ? "100%" : "0%";

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[3px]",
        visible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-200",
      ].join(" ")}
    >
      <div className="h-full bg-white/5" />
      <div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-400/90 via-emerald-400/90 to-indigo-400/90 shadow-[0_0_18px_rgba(16,185,129,0.35)] transition-[width] duration-500 ease-out"
        style={{ width }}
      />
    </div>
  );
}

