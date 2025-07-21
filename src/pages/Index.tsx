
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RogueFileHunt from "@/components/RogueFileHunt";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
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
        
        <section id="game">
          <RogueFileHunt />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-cyber-darker border-t border-cyber-green/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Sharad Patel Portfolio. Built with security in mind.
          </p>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
            <span className="text-cyber-green text-sm font-mono">System Secure</span>
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
