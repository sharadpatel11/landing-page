import { Button } from "@/components/ui/button";
import { useUiMode } from "@/theme/ui-mode";

type UiModeToggleProps = {
  variant?: "nav" | "footer";
  className?: string;
};

export default function UiModeToggle({ variant = "nav", className }: UiModeToggleProps) {
  const { mode, toggleMode } = useUiMode();
  const isModern = mode === "modern";

  const label = isModern ? "View Classic Site" : "View Modern Site";

  if (variant === "footer") {
    return (
      <button
        type="button"
        onClick={toggleMode}
        className={[
          "text-sm text-muted-foreground hover:text-foreground transition-colors",
          "underline underline-offset-4 decoration-border hover:decoration-foreground/50",
          className,
        ].filter(Boolean).join(" ")}
      >
        {label}
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleMode}
      className={[
        "h-8 px-2 text-xs font-medium",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-foreground/5",
        className,
      ].filter(Boolean).join(" ")}
    >
      {label}
    </Button>
  );
}

