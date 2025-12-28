import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MiniGames from "@/components/MiniGames";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import UiModeToggle from "@/components/UiModeToggle";

export default function IndexClassic() {
  return (
    <div className="min-h-screen bg-cyber-dark">
      <Navigation />

      <main>
        <section id="home" className="scroll-mt-24 pt-6 pb-10">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="games">
          <MiniGames />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer className="bg-cyber-darker border-t border-cyber-green/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-400 text-sm">© 2025 Sharad Patel</p>
            <UiModeToggle
              variant="footer"
              className="text-gray-400 hover:text-white decoration-cyber-green/40 hover:decoration-cyber-green"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

