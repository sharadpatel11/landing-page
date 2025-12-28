import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModernNavigation from "@/components/modern/ModernNavigation";
import ModernHero from "@/components/modern/ModernHero";
import UiModeToggle from "@/components/UiModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Code2, Network, Shield, Wrench } from "lucide-react";

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

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  } as const;

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
        <ModernHero
          copy={{
            eyebrow: "CYBERSECURITY · IAM · CONTAINER SECURITY · INCIDENT RESPONSE",
            headline: "Sharad Patel // Securing the Digital Frontier",
            subheadline:
              "M.S. Cybersecurity student at NYU Tandon. IT & Security professional focused on IAM, container security, and incident response",
            highlights: ["NYU Tandon · M.S. Cybersecurity", "Queens College · B.S. Computer Science"],
            primaryCtaLabel: "Explore projects",
            secondaryCtaLabel: "Contact",
            primaryTarget: "#projects",
            secondaryTarget: "#contact",
          }}
        />

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="relative py-20 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-[0.045] animate-grid-pan" />
            <motion.div
              className="absolute -top-24 left-0 right-0 h-[140%] opacity-[0.10]"
              initial={{ y: 0 }}
              animate={{ y: [0, 28, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.22) 40%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
          </div>

          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-10 md:grid-cols-2"
            >
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  Education & Certifications
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Academic rigor paired with practical, operational security work.
                </p>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]"
                >
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">NYU TANDON</p>
                  <p className="mt-2 text-lg font-medium">M.S. Cybersecurity</p>
                  <p className="mt-1 text-sm text-muted-foreground">Graduate studies focused on defense and response.</p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]"
                >
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">QUEENS COLLEGE</p>
                  <p className="mt-2 text-lg font-medium">B.S. Computer Science</p>
                  <p className="mt-1 text-sm text-muted-foreground">Strong foundation in systems and problem-solving.</p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-colors hover:bg-white/[0.05]"
                >
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">CERTIFICATIONS</p>
                  <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-muted-foreground">
                      CompTIA A+ · In Progress
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-muted-foreground">
                      CompTIA Security+ · In Progress
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-10 lg:grid-cols-2"
            >
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Experience</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  A clean, operator-first timeline — built around uptime, access, and incident readiness.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7">
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" aria-hidden="true" />
                    <div className="absolute left-[3px] top-2 h-4 w-4 rounded-full border border-white/15 bg-emerald-400/25" aria-hidden="true" />

                    <p className="text-sm font-medium tracking-tight">Oxford International Education Group</p>
                    <p className="mt-1 text-sm text-muted-foreground">IT & Security Operations</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">UPTIME</p>
                        <p className="mt-2 font-mono text-xl text-foreground/90">99%</p>
                        <p className="mt-1 text-xs text-muted-foreground">Maintained service availability.</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">USERS</p>
                        <p className="mt-2 font-mono text-xl text-foreground/90">50+ / week</p>
                        <p className="mt-1 text-xs text-muted-foreground">Supported active weekly users.</p>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
                        Strengthened identity and access workflows with least-privilege defaults.
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
                        Improved incident response readiness with documented playbooks and fast triage.
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
                        Hardened endpoints and services without sacrificing user experience.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7">
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">PROJECTS (BENTO)</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:bg-white/[0.03]">
                      <p className="text-base font-medium tracking-tight">Helpdesk Ticketing System</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        A workflow-first ticketing setup to improve triage, accountability, and response time.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                          ITSM
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                          Ops
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:bg-white/[0.03]">
                      <p className="text-base font-medium tracking-tight">Cybersecurity Homelab</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        A safe environment for detection practice, container hardening, and incident-response drills.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                          Docker
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                          IR
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm font-medium tracking-tight">Operator mindset</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Minimal interfaces, clear signals, and repeatable processes — the same approach used across the
                        site.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Command Center</h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    Four clean capability groups — presented like a systems dashboard.
                  </p>
                </div>
              </motion.div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: <Shield className="h-4 w-4" aria-hidden="true" />,
                    title: "Security Operations",
                    items: ["Incident response", "IAM fundamentals", "Log review", "Threat triage", "Container security"],
                  },
                  {
                    icon: <Network className="h-4 w-4" aria-hidden="true" />,
                    title: "Networking & Infrastructure",
                    items: ["TCP/IP", "DNS/HTTP", "Firewalls", "Wireshark", "Nmap"],
                  },
                  {
                    icon: <Wrench className="h-4 w-4" aria-hidden="true" />,
                    title: "IT Operations",
                    items: ["Helpdesk workflows", "Uptime monitoring", "Endpoint hardening", "Documentation", "User support"],
                  },
                  {
                    icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
                    title: "Programming",
                    items: ["Python", "Bash", "PowerShell", "APIs", "Automation"],
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6 transition-all hover:bg-white/[0.05] hover:border-white/15"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground/90">
                        {card.icon}
                      </span>
                      <p className="text-sm font-medium">{card.title}</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground font-mono">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PLAYGROUND */}
        <section id="games" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Playground</h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    Interactive challenges that mirror real security scenarios.
                  </p>
                </div>
              </motion.div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {games.map((g) => (
                  <motion.button
                    key={g.id}
                    type="button"
                    variants={fadeUp}
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
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/70 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      Open
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
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
              </motion.div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {projects.map((p) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-10 md:grid-cols-2"
            >
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Contact</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Hiring, collaborating, or swapping notes? Reach me quickly via email or LinkedIn.
                </p>

                <div className="mt-8 space-y-2 text-sm">
                  <a
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    href="mailto:sharadpatel.cs@gmail.com"
                  >
                    Email: sharadpatel.cs@gmail.com
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
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7"
              >
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
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              © 2025 Sharad Patel
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="https://linkedin.com/in/sharadpatel115222"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="mailto:sharadpatel.cs@gmail.com"
              >
                Email
              </a>
              <UiModeToggle variant="footer" />
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

