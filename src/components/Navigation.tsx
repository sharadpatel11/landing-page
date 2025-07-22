
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: "Home", command: "~/", href: "#home", tooltip: "Home" },
    { name: "About", command: "whoami", href: "#about", tooltip: "About Me" },
    { name: "Games", command: "ls /games", href: "#games", tooltip: "Security Games" },
    { name: "Skills", command: "man skills", href: "#skills", tooltip: "Skills & Expertise" },
    { name: "Projects", command: "ls /projects", href: "#projects", tooltip: "Projects Portfolio" },
    { name: "Contact", command: "ping", href: "#contact", tooltip: "Contact Information" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/95 backdrop-blur-md border-b border-cyber-green/20 font-mono">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Ready Prompt Logo */}
          <div className="flex items-center">
            <div 
              className="text-cyber-green font-bold text-lg tracking-wide hover:text-cyber-green/80 transition-colors cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              SP_SYS&gt;
              <span className="blinking-cursor text-cyber-green ml-1">_</span>
            </div>
          </div>

          {/* Center Section: Navigation Commands (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-cyber-green transition-colors duration-300 font-mono text-sm px-2 py-1 rounded hover:bg-cyber-green/10"
                  title={item.tooltip}
                >
                  {item.command}
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-cyber-dark border border-cyber-green/30 rounded text-xs text-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {item.tooltip}
                </div>
              </div>
            ))}
            <Button 
              size="sm"
              className="bg-cyber-green hover:bg-cyber-green/80 text-black font-mono font-semibold glow-effect text-xs px-3 py-1"
            >
              <a href="Sharad_Patel_Resume.pdf" target="_blank">
                cat resume.pdf
              </a>
            </Button>
          </div>

          {/* Right Section: Live Status Ticker (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center text-cyber-green">
              <span className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse"></span>
              SECURE
            </span>
            <span className="text-gray-300">
              {currentTime.toLocaleTimeString()}
            </span>
            <span className="text-gray-400">
              THREAT: NONE
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyber-green"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-cyber-dark/98 backdrop-blur-md border-b border-cyber-green/20">
            <div className="flex flex-col space-y-1 p-4">
              {/* Mobile Status */}
              <div className="flex items-center justify-between text-xs font-mono mb-4 pb-2 border-b border-cyber-green/20">
                <span className="flex items-center text-cyber-green">
                  <span className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse"></span>
                  SECURE
                </span>
                <span className="text-gray-300">
                  {currentTime.toLocaleTimeString()}
                </span>
                <span className="text-gray-400">
                  THREAT: NONE
                </span>
              </div>
              
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-cyber-green hover:bg-cyber-green/10 transition-colors duration-300 font-mono text-left py-3 px-2 rounded flex justify-between items-center"
                >
                  <span>{item.command}</span>
                  <span className="text-xs text-gray-500"># {item.tooltip}</span>
                </button>
              ))}
              
              <Button 
                size="sm"
                className="bg-cyber-green hover:bg-cyber-green/80 text-black font-mono font-semibold glow-effect w-fit mt-4"
              >
                <a href="Sharad_Patel_Resume.pdf" target="_blank">
                  cat resume.pdf
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
