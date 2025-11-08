
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, Instagram, Shield, Lock, Radio, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState("Awaiting Handshake...");
  
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [encryptedData, setEncryptedData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const statuses = [
      "Awaiting Handshake...",
      "Establishing Secure Channel...",
      "TLS Handshake Complete",
      "Channel Secured - Ready"
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setConnectionStatus(statuses[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      icon: Mail,
      label: "Direct Email",
      value: "sharadpatel115222@gmail.com",
      href: "mailto:sharadpatel115222@gmail.com",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRandomHex = (length: number) => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const scrambleText = (text: string) => {
    const hexLength = Math.max(text.length, 32);
    return generateRandomHex(hexLength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.message) {
      toast({
        title: "TRANSMISSION ERROR",
        description: "Required fields missing for secure transmission",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsEncrypting(true);

    // Encryption phase
    setTimeout(() => {
      setEncryptedData({
        email: scrambleText(formData.email),
        subject: scrambleText(formData.subject),
        message: scrambleText(formData.message)
      });
      
      setIsEncrypting(false);
      setIsTransmitting(true);
    }, 2000);

    // Transmission phase
    setTimeout(async () => {
      try {
        const response = await fetch('https://n8n.thecyberadmin.com/webhook/b3fc4f9d-411d-453c-aaec-c37339d2e5f0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: 'portfolio_secure_transmission'
          }),
        });

        if (response.ok) {
          setIsTransmitting(false);
          setIsComplete(true);
          
          // Reset form after 5 seconds
          setTimeout(() => {
            setIsComplete(false);
            setIsLoading(false);
            setFormData({
              email: '',
              subject: '',
              message: ''
            });
            setEncryptedData({
              email: '',
              subject: '',
              message: ''
            });
          }, 5000);
        } else {
          throw new Error('Transmission failed');
        }
      } catch (error) {
        console.error("Transmission error:", error);
        toast({
          title: "TRANSMISSION FAILED",
          description: "Secure channel compromised. Please retry transmission.",
          variant: "destructive",
        });
        setIsTransmitting(false);
        setIsLoading(false);
      }
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cyber-darker via-black to-cyber-dark relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Secure <span className="cyber-text">Transmission</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Establish an encrypted channel for secure communication
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Secure Transmission Panel */}
          <div className="lg:col-span-2">
            <div className="relative transmission-panel rounded-lg p-8 shadow-lg">
              {/* Simplified background without glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-gray-900/40 to-black/80 rounded-lg"></div>
              
              <div className="relative z-10">
                {!isComplete ? (
                  <>
                    {/* Status Panel */}
                    <div className="bg-gradient-to-r from-black/80 via-gray-900/60 to-black/80 border border-cyber-green/30 rounded-lg p-4 mb-8 font-mono text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Radio className="w-4 h-4 text-cyber-green mr-2 animate-pulse status-indicator" />
                            <span className="text-gray-300">CONNECTION:</span>
                            <span className="text-cyber-green ml-2">{connectionStatus}</span>
                          </div>
                          <div className="flex items-center">
                            <Lock className="w-4 h-4 text-cyber-blue mr-2 status-indicator" />
                            <span className="text-gray-300">ENCRYPTION:</span>
                            <span className="text-cyber-blue ml-2">TLS 1.3 (AES-256)</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Shield className="w-4 h-4 text-cyber-purple mr-2 status-indicator" />
                            <span className="text-gray-300">TARGET_HOST:</span>
                            <span className="text-cyber-purple ml-2">Sharad Patel // New York, NY</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-cyber-green mr-2 status-indicator" />
                            <span className="text-gray-300">TIMESTAMP:</span>
                            <span className="text-cyber-green ml-2">{currentTime.toISOString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terminal Interface */}
                                          <div className="bg-gradient-to-br from-black/90 via-gray-900/70 to-black/90 border border-cyber-green/30 rounded-lg p-6 font-mono shadow-inner">
                      <div className="text-cyber-green mb-2">// SECURE MESSAGE TERMINAL</div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                          <div className="text-cyber-green">
                            <span className="text-gray-400">[user@localhost]$</span> Enter your email:
                          </div>
                          <Input
                            type="email"
                            name="email"
                            value={isEncrypting || isTransmitting ? encryptedData.email : formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            placeholder="your.email@domain.com"
                            className={`bg-transparent border-cyber-green/30 text-cyber-green font-mono focus:border-cyber-green focus:ring-cyber-green/20 placeholder:text-gray-500 ${isEncrypting ? 'animate-[encryptionScramble_0.5s_infinite]' : ''}`}
                          />
                        </div>

                        {/* Subject Input */}
                        <div className="space-y-2">
                          <div className="text-cyber-green">
                            <span className="text-gray-400">[user@localhost]$</span> Subject:
                          </div>
                          <Input
                            name="subject"
                            value={isEncrypting || isTransmitting ? encryptedData.subject : formData.subject}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            placeholder="Message subject"
                            className={`bg-transparent border-cyber-green/30 text-cyber-green font-mono focus:border-cyber-green focus:ring-cyber-green/20 placeholder:text-gray-500 ${isEncrypting ? 'animate-[encryptionScramble_0.5s_infinite]' : ''}`}
                          />
                        </div>

                        {/* Message Input */}
                        <div className="space-y-2">
                          <div className="text-cyber-green">
                            <span className="text-gray-400">[user@localhost]$</span> Message Body:
                          </div>
                          <div className="relative">
                            <Textarea
                              name="message"
                              value={isEncrypting || isTransmitting ? encryptedData.message : formData.message}
                              onChange={handleInputChange}
                              disabled={isLoading}
                              placeholder="Enter your secure message..."
                              rows={6}
                              className={`bg-transparent border-cyber-green/30 text-cyber-green font-mono focus:border-cyber-green focus:ring-cyber-green/20 placeholder:text-gray-500 resize-none ${isEncrypting ? 'animate-[encryptionScramble_0.5s_infinite]' : ''} ${isTransmitting ? 'animate-[transmissionUpward_2s_ease-out]' : ''}`}
                            />
                            {!isLoading && (
                              <div className="absolute bottom-3 right-3 w-2 h-5 bg-cyber-green terminal-cursor-enhanced"></div>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green text-cyber-green font-mono py-3 transition-all duration-300"
                        >
                          {isEncrypting 
                            ? '[ENCRYPTING...]' 
                            : isTransmitting 
                            ? '[TRANSMITTING...]' 
                            : '[ENCRYPT & TRANSMIT]'
                          }
                        </Button>
                      </form>
                    </div>
                  </>
                ) : (
                  /* Success Message */
                  <div className="bg-gradient-to-br from-black/90 via-gray-900/70 to-black/90 border border-cyber-green rounded-lg p-8 text-center font-mono shadow-inner">
                    <CheckCircle className="w-16 h-16 text-cyber-green mx-auto mb-4" />
                    <div className="text-cyber-green text-xl mb-4">// TRANSMISSION COMPLETE</div>
                    <div className="text-gray-300 space-y-2">
                      <div>ACK signal received.</div>
                      <div className="text-sm">Public key fingerprint: a4:8a:c1:0b:3e:d4:9f:7a</div>
                      <div className="mt-4 text-cyber-blue">Thank you for reaching out. I will respond shortly.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alternative Channels */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-black/60 via-gray-900/50 to-black/60 border border-cyber-blue/40 rounded-lg p-6 shadow-lg">
              <div className="text-cyber-blue text-lg font-mono mb-4">// Alternative Channels</div>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-black/60 to-gray-900/40 hover:from-cyber-darker/70 hover:to-black/60 transition-all duration-300 group border border-transparent hover:border-cyber-green/30"
                  >
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                    <div className="font-mono">
                      <div className="text-white text-sm">{link.label}</div>
                      <div className="text-gray-400 text-xs">{link.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-black/60 via-gray-900/50 to-black/60 border border-cyber-purple/40 rounded-lg p-6 shadow-lg">
              <div className="text-cyber-purple text-lg font-mono mb-4">// Security Status</div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-green rounded-full mr-3 animate-pulse status-indicator"></div>
                  <span className="text-gray-300">End-to-End Encryption: ACTIVE</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mr-3 animate-pulse status-indicator"></div>
                  <span className="text-gray-300">Zero-Log Policy: ENFORCED</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-purple rounded-full mr-3 animate-pulse status-indicator"></div>
                  <span className="text-gray-300">Message Integrity: VERIFIED</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-green rounded-full mr-3 animate-pulse status-indicator"></div>
                  <span className="text-gray-300">Response Time: &lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
