import { PropsWithChildren, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUiMode } from "@/theme/ui-mode";
import UiModeToggle from "@/components/UiModeToggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type PlaygroundFrameProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  contentClassName?: string;
}>;

export default function PlaygroundFrame({
  title,
  subtitle,
  rightSlot,
  contentClassName,
  children,
}: PlaygroundFrameProps) {
  const navigate = useNavigate();
  const { mode } = useUiMode();
  const isModern = mode === "modern";

  return (
    <div className={cn("min-h-screen text-foreground", isModern ? "bg-transparent" : "bg-cyber-dark")}>
      <header
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-xl",
          isModern ? "border-white/10 bg-background/70" : "border-cyber-green/30 bg-cyber-darker"
        )}
      >
        <div className={cn("mx-auto px-4", isModern ? "max-w-6xl" : "container")}>
          <div className={cn("flex items-center justify-between gap-3", isModern ? "h-14" : "h-12")}>
            <div className="flex min-w-0 items-center gap-2">
              <Button
                type="button"
                variant={isModern ? "outline" : "ghost"}
                size="sm"
                onClick={() => navigate("/")}
                className={cn(
                  "h-9 gap-2",
                  isModern
                    ? "rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    : "text-cyber-green hover:text-white hover:bg-cyber-green/10"
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              <div className="min-w-0">
                <div
                  className={cn(
                    "truncate font-semibold tracking-tight",
                    isModern ? "text-base sm:text-lg" : "text-lg font-mono cyber-text"
                  )}
                >
                  {title}
                </div>
                {subtitle ? (
                  <div className={cn("truncate text-xs", isModern ? "text-muted-foreground" : "text-gray-400 font-mono")}>
                    {subtitle}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {rightSlot ? <div className="hidden sm:block">{rightSlot}</div> : null}
              <UiModeToggle />
            </div>
          </div>
          {rightSlot ? <div className="pb-3 sm:hidden">{rightSlot}</div> : null}
        </div>
      </header>

      <main className={cn("mx-auto px-4 py-8", isModern ? "max-w-6xl" : "container", contentClassName)}>
        {children}
      </main>
    </div>
  );
}

