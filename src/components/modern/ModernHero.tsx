import { useCallback, useMemo, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ModernHeroCopy = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  highlights: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  primaryTarget: string;
  secondaryTarget: string;
};

export const DEFAULT_MODERN_HERO_COPY: ModernHeroCopy = {
  eyebrow: "CYBERSECURITY · DEFENSE · SYSTEMS",
  headline: "Building digital experiences with precision.",
  subheadline:
    "I’m Sharad Patel — focused on threat intelligence, secure infrastructure, and incident-ready programs. Calm design. Clear outcomes.",
  highlights: ["NYU Tandon · MS Cybersecurity", "Threat Intel", "Incident Response"],
  primaryCtaLabel: "Explore projects",
  secondaryCtaLabel: "Contact",
  primaryTarget: "#projects",
  secondaryTarget: "#contact",
};

type ModernHeroProps = {
  copy?: Partial<ModernHeroCopy>;
  className?: string;
};

function scrollToTarget(target: string) {
  const el = document.querySelector(target);
  el?.scrollIntoView({ behavior: "smooth" });
}

export default function ModernHero({ copy, className }: ModernHeroProps) {
  const c = useMemo(() => ({ ...DEFAULT_MODERN_HERO_COPY, ...(copy ?? {}) }), [copy]);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(45);
  const x = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.35 });
  const y = useSpring(my, { stiffness: 120, damping: 22, mass: 0.35 });

  const meshX = useTransform(x, [0, 100], [-18, 18]);
  const meshY = useTransform(y, [0, 100], [-14, 14]);

  const glow = useMotionTemplate`
    radial-gradient(900px circle at ${x}% ${y}%, rgba(99, 102, 241, 0.22), transparent 55%),
    radial-gradient(760px circle at ${y}% ${x}%, rgba(16, 185, 129, 0.16), transparent 60%),
    radial-gradient(520px circle at 50% 10%, rgba(255, 255, 255, 0.06), transparent 50%)
  `;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      mx.set(Math.max(0, Math.min(100, px)));
      my.set(Math.max(0, Math.min(100, py)));
    },
    [mx, my]
  );

  const reveal = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  } as const;

  return (
    <section id="home" className={cn("relative", className)}>
      <div className="mx-auto max-w-7xl px-4">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]",
            "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
          )}
        >
          {/* Mouse-reactive glow + mesh */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{ backgroundImage: glow }}
          />
          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -inset-24 opacity-[0.18]",
              "[background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]",
              "[background-size:72px_72px]",
              "[mask-image:radial-gradient(60%_60%_at_50%_35%,black,transparent)]"
            )}
            style={{ x: meshX, y: meshY }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cyber-grid bg-grid opacity-[0.05] animate-grid-pan"
          />

          {/* Content */}
          <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-14">
            <div className="flex min-h-[min(68vh,520px)] items-center">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mx-auto w-full max-w-3xl text-center"
              >
                <motion.p
                  variants={reveal}
                  className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground sm:text-xs"
                >
                  {c.eyebrow}
                </motion.p>

                <motion.h1
                  variants={reveal}
                  className={cn(
                    "mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl",
                    "leading-[1.02]"
                  )}
                >
                  {c.headline}
                </motion.h1>

                <motion.p
                  variants={reveal}
                  className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {c.subheadline}
                </motion.p>

                <motion.div
                  variants={reveal}
                  className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
                >
                  <Button
                    size="lg"
                    className={cn(
                      "group rounded-xl bg-white text-black hover:bg-white/90",
                      "transition-[transform,box-shadow,background-color] duration-300",
                      "hover:shadow-[0_16px_50px_-20px_rgba(255,255,255,0.55)]"
                    )}
                    onClick={() => scrollToTarget(c.primaryTarget)}
                  >
                    {c.primaryCtaLabel}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={cn(
                      "group rounded-xl border-white/15 bg-white/0 hover:bg-white/5",
                      "transition-[transform,background-color,border-color] duration-300"
                    )}
                    onClick={() => scrollToTarget(c.secondaryTarget)}
                  >
                    <Mail className="mr-2 h-4 w-4 opacity-80" aria-hidden="true" />
                    {c.secondaryCtaLabel}
                  </Button>
                </motion.div>

                <motion.div variants={reveal} className="mt-10 flex flex-wrap justify-center gap-2">
                  {c.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
              type="button"
              aria-label="Scroll to about section"
              onClick={() => scrollToTarget("#about")}
              className={cn(
                "absolute bottom-5 left-1/2 -translate-x-1/2",
                "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5",
                "text-xs text-muted-foreground backdrop-blur-xl",
                "hover:bg-white/[0.04] hover:text-foreground transition-colors"
              )}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Scroll
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

