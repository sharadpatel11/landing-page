import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialBootLoader from "@/components/animations/InitialBootLoader";
import RouteLoadingBar from "@/components/animations/RouteLoadingBar";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";
import ScrollRevealObserver from "@/components/animations/ScrollRevealObserver";
import Index from "./pages/Index";
import RogueFileHuntPage from "./pages/RogueFileHuntPage";
import SpotThePhishPage from "./pages/SpotThePhishPage";
import CryptoToolPage from "./pages/CryptoToolPage";
import FirewallRuleChallengePage from "./pages/FirewallRuleChallengePage";
import CodeVulnerabilityAuditPage from "./pages/CodeVulnerabilityAuditPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <InitialBootLoader />
      <BrowserRouter>
        <RouteLoadingBar />
        <ScrollProgressBar />
        <ScrollRevealObserver />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rogue-file-hunt" element={<RogueFileHuntPage />} />
          <Route path="/spot-the-phish" element={<SpotThePhishPage />} />
          <Route path="/crypto-tool" element={<CryptoToolPage />} />
          <Route path="/firewall-rule-challenge" element={<FirewallRuleChallengePage />} />
          <Route path="/code-vulnerability-audit" element={<CodeVulnerabilityAuditPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
