
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Shield, Bug, Users } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Terminal,
      title: "Penetration Testing",
      description: "Identifying vulnerabilities through ethical hacking methodologies"
    },
    {
      icon: Shield,
      title: "Security Analysis",
      description: "Comprehensive risk assessment and security auditing"
    },
    {
      icon: Bug,
      title: "Vulnerability Research",
      description: "Discovering and documenting security flaws in systems"
    },
    {
      icon: Users,
      title: "Security Awareness",
      description: "Educating teams on cybersecurity best practices"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cyber-dark to-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="cyber-text">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a dedicated cybersecurity student with a passion for understanding and defending 
            against digital threats. I am currently pursing MS in Cybersecurity at NYU Tandon School of Engineering. My journey combines technical expertise with hands-on experience 
            in security research and ethical hacking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyber-green mb-4">My Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              My journey into the world of IT and cybersecurity is driven by a fundamental interest in safeguarding the technologies that connect our world. With a Bachelor's in Computer Science from Queens College and hands-on experience in maintaining and securing software systems, I've developed a keen understanding of the critical need for robust digital defenses.
           </p>
            <p className="text-gray-300 leading-relaxed">
              This passion has led me to the prestigious Cybersecurity Master's program at NYU Tandon School of Engineering. I am particularly drawn to Tandon's practical approach to cybersecurity education and am eager to immerse myself in areas such as vulnerability analysis and threat mitigation. My ongoing pursuit of CompTIA A+ and Security+ certifications is a testament to my commitment to building a comprehensive skill set. Proficient in Linux, Python, Java, C++, and JavaScript, I look forward to connecting with industry leaders and contributing to innovative solutions that address the evolving landscape of cyber threats.
            </p>
          </div>
          
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-lg border border-cyber-green/30 flex items-center justify-center">
              <Terminal className="w-24 h-24 text-cyber-green animate-glow" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className="bg-card/50 border-cyber-blue/30 hover:border-cyber-green/50 transition-all duration-300 hover:glow-effect"
            >
              <CardContent className="p-6 text-center">
                <item.icon className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
