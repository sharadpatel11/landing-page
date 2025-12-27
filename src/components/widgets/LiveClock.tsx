import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type LiveClockProps = {
  className?: string;
  timeZone?: string;
  label?: string;
};

function formatTime(d: Date, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(d);
}

export default function LiveClock({
  className,
  timeZone = "America/New_York",
  label = "NYC",
}: LiveClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const text = useMemo(() => `${label} · ${formatTime(now, timeZone)}`, [label, now, timeZone]);

  return (
    <div
      className={cn(
        "items-center rounded-full border px-3 py-1 text-xs font-medium",
        "border-white/10 bg-white/5 text-muted-foreground",
        className
      )}
      aria-label="Local time"
      title={timeZone}
    >
      {text}
    </div>
  );
}

