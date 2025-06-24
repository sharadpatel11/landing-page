
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, Twitter, Send, MessageCircle, Target, Instagram } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "sharadpatel115222@gmail.com",
      href: "mailto:sharadpatel115222@gmail.com@gmail.com",
      color: "text-cyber-green"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/sharadpatel115222",
      href: "https://linkedin.com/in/sharadpatel115222",
      color: "text-cyber-blue"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "sharadpatel11",
      href: "https://github.com/sharadpatel11",
      color: "text-cyber-purple"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@sharad_patel11",
      href: "https://instagram.com/sharad_patel11",
      color: "text-cyber-green"
    }
  ];

  return (
    <section className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="cyber-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's connect and discuss cybersecurity opportunities, collaborations, or just chat about the latest security trends
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card/40 border-cyber-green/30">
            <CardHeader>
              <CardTitle className="text-cyber-green text-2xl flex items-center">
                <MessageCircle className="w-6 h-6 mr-3" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <Input 
                    placeholder="Your Name" 
                    className="bg-cyber-darker border-cyber-blue/30 text-white placeholder:text-gray-500 focus:border-cyber-green"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="bg-cyber-darker border-cyber-blue/30 text-white placeholder:text-gray-500 focus:border-cyber-green"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <Input 
                  placeholder="Project Collaboration, Job Opportunity, etc." 
                  className="bg-cyber-darker border-cyber-blue/30 text-white placeholder:text-gray-500 focus:border-cyber-green"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <Textarea 
                  placeholder="Tell me about your project, opportunity, or question..." 
                  rows={6}
                  className="bg-cyber-darker border-cyber-blue/30 text-white placeholder:text-gray-500 focus:border-cyber-green resize-none"
                />
              </div>
              
              <Button 
                className="w-full bg-cyber-green hover:bg-cyber-green/80 text-black font-semibold py-3 glow-effect"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            <Card className="bg-card/40 border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-cyber-blue text-2xl">Let's Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I'm always interested in discussing cybersecurity topics, potential collaborations, 
                  or learning opportunities. Whether you're a fellow student, security professional, 
                  or potential employer, I'd love to hear from you.
                </p>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_black"
                      className="flex items-center space-x-4 p-3 rounded-lg bg-cyber-darker/50 hover:bg-cyber-darker transition-all duration-300 hover:glow-effect group"
                    >
                      <link.icon className={`w-6 h-6 ${link.color} group-hover:animate-glow`} />
                      <div>
                        <div className="text-white font-medium">{link.label}</div>
                        <div className="text-gray-400 text-sm">{link.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-cyber-purple/30">
              <CardHeader>
                <CardTitle className="text-cyber-purple text-xl">Open to Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cyber-green rounded-full mr-3"></div>
                    Cybersecurity Internships
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mr-3"></div>
                    Security Research Projects
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cyber-purple rounded-full mr-3"></div>
                    Bug Bounty Collaborations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cyber-green rounded-full mr-3"></div>
                    Mentorship Opportunities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
