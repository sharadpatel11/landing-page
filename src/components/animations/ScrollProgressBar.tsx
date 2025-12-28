import { useEffect, useRef, useState } from "react";

function getScrollProgress(): number {
  const el = document.documentElement;
  const scrollTop = el.scrollTop || document.body.scrollTop || 0;
  const scrollHeight = el.scrollHeight || 0;
  const clientHeight = el.clientHeight || window.innerHeight || 1;
  const denom = Math.max(1, scrollHeight - clientHeight);
  return Math.min(1, Math.max(0, scrollTop / denom));
}

export default function ScrollProgressBar() {
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setProgress(getScrollProgress());
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-white/5"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-emerald-400/80 via-indigo-400/80 to-emerald-400/80 motion-safe:transition-transform motion-safe:duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

