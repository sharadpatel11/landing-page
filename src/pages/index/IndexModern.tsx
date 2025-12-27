import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModernNavigation from "@/components/modern/ModernNavigation";
import CyberOpsPanel from "@/components/modern/CyberOpsPanel";
import UiModeToggle from "@/components/UiModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Game = {
  id: string;
  title: string;
  description: string;
  path: string;
  difficulty: string;
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  status: "Planned" | "In Progress" | "Completed";
};

export default function IndexModern() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const games = useMemo<Game[]>(
    () => [
      {
        id: "rogue-file-hunt",
        title: "The Rogue File Hunt",
        description: "A timed terminal-style challenge: locate and remove the malicious file.",
        path: "/rogue-file-hunt",
        difficulty: "Intermediate",
      },
      {
        id: "spot-the-phish",
        title: "Spot the Phish",
        description: "Review real-looking emails and flag social engineering techniques.",
        path: "/spot-the-phish",
        difficulty: "Beginner",
      },
      {
        id: "crypto-tool",
        title: "Crypto Tool Playground",
        description: "Explore Caesar/ROT13/Base64 and learn how transformations behave.",
        path: "/crypto-tool",
        difficulty: "Beginner",
      },
      {
        id: "firewall-rule-challenge",
        title: "Firewall Rule Challenge",
        description: "Translate change requests into correct firewall policy decisions.",
        path: "/firewall-rule-challenge",
        difficulty: "Advanced",
      },
      {
        id: "code-vulnerability-audit",
        title: "Code Vulnerability Audit",
        description: "Identify vulnerabilities across languages with guided review prompts.",
        path: "/code-vulnerability-audit",
        difficulty: "Expert",
      },
    ],
    []
  );

  const projects = useMemo<Project[]>(
    () => [
      {
        title: "Network Vulnerability Scanner",
        description:
          "A lightweight scanner that fingerprints services and surfaces potential weakness signals with clean reporting.",
        tags: ["Python", "Nmap", "Networking"],
        status: "Planned",
      },
      {
        title: "Web Application Security Audit",
        description: "A structured OWASP-style assessment workflow, from recon through actionable remediation notes.",
        tags: ["Web Security", "OWASP", "Burp Suite"],
        status: "Planned",
      },
      {
        title: "Malware Analysis Lab",
        description: "A safe sandbox with repeatable triage steps for static/dynamic analysis and classification.",
        tags: ["Malware", "Forensics", "Automation"],
        status: "Planned",
      },
      {
        title: "Incident Response Toolkit",
        description:
          "A pragmatic set of scripts for artifact collection, timeline creation, and operator-friendly reporting.",
        tags: ["IR", "Forensics", "PowerShell"],
        status: "Planned",
      },
    ],
    []
  );

  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.message) {
      toast({
        title: "Missing fields",
        description: "Please include at least your email and a message.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://n8n.thecyberadmin.com/webhook/b3fc4f9d-411d-453c-aaec-c37339d2e5f0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: "portfolio_modern",
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      toast({
        title: "Message sent",
        description: "Thanks — I’ll get back to you shortly.",
      });
      setForm({ email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen text-foreground">
      <ModernNavigation />

      <main className="pt-20">
        {/* HERO */}
        <section id="home" className="relative">
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-[0.06] animate-grid-pan" />
              </div>

              <div className="relative px-6 py-14 sm:px-10 sm:py-18 lg:px-12 lg:py-20">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                  <div className="text-center lg:text-left">
                    <p className="text-xs font-medium tracking-[0.28em] text-muted-foreground">
                    CYBERSECURITY · DEFENSE · SYSTEMS
                    </p>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                      Security work that’s calm, clear, and built to last.
                    </h1>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                      I’m Sharad Patel — focused on threat intelligence, secure infrastructure, and incident-ready
                      programs. A portfolio that prioritizes clarity over noise.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                      <Button
                        size="lg"
                        className="rounded-xl bg-white text-black hover:bg-white/90"
                        onClick={() => {
                          const el = document.querySelector("#projects");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Explore projects
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-xl border-white/15 bg-white/0 hover:bg-white/5"
                        onClick={() => {
                          const el = document.querySelector("#contact");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Contact
                      </Button>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                      <Badge variant="outline" className="border-white/10 bg-white/5 text-muted-foreground">
                        NYU Tandon · MS Cybersecurity
                      </Badge>
                      <Badge variant="outline" className="border-white/10 bg-white/5 text-muted-foreground">
                        Threat Intel
                      </Badge>
                      <Badge variant="outline" className="border-white/10 bg-white/5 text-muted-foreground">
                        Incident Response
                      </Badge>
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <CyberOpsPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">About</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  I translate complex risk into focused, actionable defense. I enjoy building systems that stand up to
                  real-world constraints — time, noise, and imperfect inputs — without losing usability.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Currently pursuing an MS in Cybersecurity at NYU Tandon, sharpening my practice across threat
                  intelligence, secure infrastructure, and incident response.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]">
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">FOCUS</p>
                  <p className="mt-2 text-lg font-medium">Threat intelligence</p>
                  <p className="mt-1 text-sm text-muted-foreground">Signal over noise, with reliable triage.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]">
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">LOCATION</p>
                  <p className="mt-2 text-lg font-medium">New York City</p>
                  <p className="mt-1 text-sm text-muted-foreground">Available for collaboration.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]">
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">APPROACH</p>
                  <p className="mt-2 text-lg font-medium">Defensible defaults</p>
                  <p className="mt-1 text-sm text-muted-foreground">Hardening with clear trade-offs.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]">
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">PRIORITY</p>
                  <p className="mt-2 text-lg font-medium">Incident-ready</p>
                  <p className="mt-1 text-sm text-muted-foreground">Response plans people can execute.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Skills</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  A toolkit centered on practical defense, investigation, and automation.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Network & infra",
                  items: ["TCP/IP", "Wireshark", "Nmap", "Firewalls", "DNS/HTTP"],
                },
                {
                  title: "Security analysis",
                  items: ["OWASP", "Burp Suite", "Threat triage", "Logging", "Detection engineering"],
                },
                {
                  title: "Automation",
                  items: ["Python", "Bash", "PowerShell", "APIs", "Repeatable workflows"],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-all hover:bg-white/[0.05] hover:border-white/15"
                >
                  <p className="text-sm font-medium">{card.title}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLAYGROUND */}
        <section id="games" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Playground</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Interactive challenges that mirror real security scenarios.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {games.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    if (g.id === "crypto-tool") window.open(g.path, "_blank");
                    else navigate(g.path);
                  }}
                  className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7 transition-all hover:bg-white/[0.05] hover:border-white/15"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-medium tracking-tight">{g.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      {g.difficulty}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/70 opacity-0 transition-opacity group-hover:opacity-100" />
                    Open
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Projects</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  A small set of security-focused builds — designed for clarity, repeatability, and impact.
                </p>
              </div>
              <a
                href="https://github.com/sharadpatel11?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors"
              >
                GitHub
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7 transition-all hover:bg-white/[0.05] hover:border-white/15"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-medium tracking-tight">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      {p.status}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Contact</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  If you’re hiring, collaborating, or just want to talk security, send a note. I reply quickly.
                </p>

                <div className="mt-8 space-y-2 text-sm">
                  <a
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    href="mailto:sharadpatel115222@gmail.com"
                  >
                    Email: sharadpatel115222@gmail.com
                  </a>
                  <a
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    href="https://linkedin.com/in/sharadpatel115222"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn: in/sharadpatel115222
                  </a>
                  <a
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    href="https://github.com/sharadpatel11"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub: sharadpatel11
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="you@company.com"
                      type="email"
                      className="rounded-xl border-white/10 bg-white/5 focus-visible:ring-white/20"
                      disabled={sending}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Subject</label>
                    <Input
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      placeholder="What’s up?"
                      className="rounded-xl border-white/10 bg-white/5 focus-visible:ring-white/20"
                      disabled={sending}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Message</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Write a short message…"
                      rows={6}
                      className="rounded-xl border-white/10 bg-white/5 focus-visible:ring-white/20"
                      disabled={sending}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-xl bg-white text-black hover:bg-white/90"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">© 2025 Sharad Patel</p>
            <UiModeToggle variant="footer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

