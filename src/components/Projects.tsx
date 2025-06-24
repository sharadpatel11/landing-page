
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Shield, Bug, Network, Lock } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Network Vulnerability Scanner",
      description: "Python-based network scanner that identifies open ports, services, and potential vulnerabilities using advanced fingerprinting techniques.",
      icon: Network,
      tags: ["Python", "Nmap", "Networking", "Security"],
      status: "Planned",
      highlights: ["Port scanning", "Service detection", "Vulnerability assessment", "Report generation"]
    },
    {
      title: "Web Application Security Audit",
      description: "Comprehensive security assessment of a web application, including OWASP Top 10 vulnerabilities and custom exploit development.",
      icon: Bug,
      tags: ["Web Security", "OWASP", "Burp Suite", "SQL Injection"],
      status: "Planned",
      highlights: ["XSS detection", "SQL injection testing", "Authentication bypass", "Security reporting"]
    },
    {
      title: "Malware Analysis Lab",
      description: "Virtual environment for safe malware analysis with automated detection and classification using machine learning techniques.",
      icon: Shield,
      tags: ["Malware Analysis", "Machine Learning", "Python", "Virtualization"],
      status: "Planned",
      highlights: ["Static analysis", "Dynamic analysis", "ML classification", "Sandbox environment"]
    },
    {
      title: "Incident Response Toolkit",
      description: "Collection of scripts and tools for digital forensics and incident response, including memory analysis and artifact collection.",
      icon: Lock,
      tags: ["Digital Forensics", "Incident Response", "PowerShell", "Memory Analysis"],
      status: "Planned",
      highlights: ["Memory dumps", "Artifact collection", "Timeline analysis", "Automated reporting"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-cyber-green text-black";
      case "In Progress":
        return "bg-cyber-blue text-white";
      case "Planned":
        return "bg-cyber-purple text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cyber-darker to-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Security <span className="cyber-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hands-on cybersecurity projects demonstrating practical skills and real-world applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card/40 border-cyber-green/30 hover:border-cyber-blue/50 transition-all duration-300 hover:glow-effect group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <project.icon className="w-8 h-8 text-cyber-green group-hover:animate-glow" />
                  <Badge className={`${getStatusColor(project.status)} font-semibold`}>
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-cyber-green transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-cyber-blue font-semibold">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-gray-400 text-sm flex items-center">
                        <div className="w-1 h-1 bg-cyber-green rounded-full mr-2"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="border-cyber-blue/50 text-cyber-blue text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                    disabled={project.status === "Planned"}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                    disabled={project.status === "Planned"}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-cyber-green hover:bg-cyber-green/80 text-black font-semibold px-8 py-3 glow-effect"
          >
            <Github className="w-5 h-5 mr-2" />
            <a href="https://github.com/sharadpatel11?tab=repositories" target="_blank">View All Projects on GitHub</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
