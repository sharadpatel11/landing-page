const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Playground", href: "#games" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function ModernNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={[
            "mt-3 rounded-2xl border border-white/10",
            "bg-white/[0.04] backdrop-blur-2xl saturate-150",
            "shadow-[0_1px_0_0_rgba(255,255,255,0.10)_inset,0_18px_40px_-28px_rgba(0,0,0,0.65)]",
            "supports-[backdrop-filter]:bg-white/[0.035]",
          ].join(" ")}
        >
          <div className="flex h-14 items-center justify-between px-3 lg:h-16 lg:px-4">
            <button
              type="button"
              onClick={() => scrollToSection("#home")}
              className="rounded-lg px-2 py-1 text-base font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors"
            >
              Sharad Patel
            </button>

            <div className="hidden md:flex items-center gap-1">
              {nav.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="Sharad_Patel_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-foreground/90 hover:bg-white/10 transition-colors"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

