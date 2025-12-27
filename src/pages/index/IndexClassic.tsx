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
        <section id="home">
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
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Sharad Patel Portfolio. Built with security in mind.</p>

          <div className="mt-3 flex justify-center">
            <UiModeToggle
              variant="footer"
              className="text-gray-400 hover:text-white decoration-cyber-green/40 hover:decoration-cyber-green"
            />
          </div>

          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
              <span className="text-cyber-green text-sm font-mono">System Secure</span>
              <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

