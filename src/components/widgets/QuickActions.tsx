import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { useUiMode } from "@/theme/ui-mode";

type QuickActionsProps = {
  className?: string;
};

export default function QuickActions({ className }: QuickActionsProps) {
  const { toast } = useToast();
  const { toggleMode } = useUiMode();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("sharadpatel115222@gmail.com");
      toast({ title: "Copied", description: "Email copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not access clipboard.", variant: "destructive" });
    }
  }

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-9 rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Quick actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={copyEmail}>
            <Copy className="mr-2 h-4 w-4" />
            Copy email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open("Sharad_Patel_Resume.pdf", "_blank", "noopener,noreferrer")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open resume
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open("https://github.com/sharadpatel11", "_blank", "noopener,noreferrer")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleMode}>Toggle classic/modern</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

