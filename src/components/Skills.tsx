
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Security Tools",
      skills: [
        { name: "Nmap", level: 85 },
        { name: "Wireshark", level: 80 },
        { name: "Metasploit", level: 75 },
        { name: "Burp Suite", level: 70 },
        { name: "OWASP ZAP", level: 65 }
      ]
    },
    {
      title: "Programming",
      skills: [
        { name: "Python", level: 90 },
        { name: "Bash/Shell", level: 85 },
        { name: "PowerShell", level: 70 },
        { name: "JavaScript", level: 75 },
        { name: "C/C++", level: 60 }
      ]
    },
    {
      title: "Cybersecurity",
      skills: [
        { name: "Penetration Testing", level: 80 },
        { name: "Vulnerability Assessment", level: 85 },
        { name: "Network Security", level: 75 },
        { name: "Incident Response", level: 70 },
        { name: "Digital Forensics", level: 65 }
      ]
    }
  ];

  const certifications = [
    "Google IT Support Specialist (Completed)",
    "Google Cybersecurity Professional (Completed)",
    "A+ (In Progress)",
    "Security+ (Planned)",
  ];

  return (
    <section className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glitch" data-text="Technical Skills">
            Technical <span className="cyber-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for <span className="redacted">cybersecurity analysis and defense</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card/30 border-cyber-blue/30 hover:border-cyber-green/50 transition-all duration-300 scan-line">
              <CardHeader>
                <CardTitle className="text-cyber-green text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-cyber-blue text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyber-green to-cyber-blue h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/30 border-cyber-purple/30">
          <CardHeader>
            <CardTitle className="text-cyber-purple text-2xl text-center">Certifications & Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10 px-4 py-2 text-sm"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
