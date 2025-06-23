
import { Button } from "@/components/ui/button";
import { Shield, Code, Lock } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative matrix-bg">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-20 h-20 text-cyber-green animate-glow" />
              <div className="absolute inset-0 w-20 h-20 border-2 border-cyber-blue rounded-full animate-spin"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="cyber-text">Cyber</span>
            <span className="text-white">Security</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyber-green animate-typing">
              Protecting Digital Assets Through Code & Analysis
            </span>
          </div>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Cybersecurity student passionate about ethical hacking, penetration testing, 
            and building secure systems. Turning vulnerabilities into solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-cyber-green hover:bg-cyber-green/80 text-black font-semibold px-8 py-3 glow-effect"
            >
              <Code className="w-5 h-5 mr-2" />
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 px-8 py-3"
            >
              <Lock className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating cyber elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-cyber-blue rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-cyber-purple rounded-full animate-pulse delay-2000"></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-cyber-green rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;
