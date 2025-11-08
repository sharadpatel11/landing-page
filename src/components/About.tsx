
import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';

const About = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const terminalRef1 = useRef(null);
  const terminalRef2 = useRef(null);
  const terminalRef3 = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Live clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Typing animations
  useEffect(() => {
    if (!isVisible) return;

    const options1 = {
      strings: [
        'I am a cybersecurity professional dedicated to anticipating and neutralizing threats before they disrupt the organizations I serve. My mission is to translate complex risk into clear, actionable defenses that protect digital assets and earn the trust of stakeholders.'
      ],
      typeSpeed: 30,
      startDelay: 1000,
      showCursor: false,
      onComplete: () => {
        // Start second animation
        if (terminalRef2.current) {
          const typed2 = new Typed(terminalRef2.current, {
            strings: [
              'I am currently pursuing my Master of Science in Cybersecurity at NYU Tandon School of Engineering, where advanced coursework and research labs sharpen my expertise in threat intelligence, secure infrastructure, and incident response. This program accelerates my ability to apply cutting-edge security strategies in real-world contexts.'
            ],
            typeSpeed: 25,
            startDelay: 500,
            showCursor: false,
            onComplete: () => {
              // Start third animation
              if (terminalRef3.current) {
                const typed3 = new Typed(terminalRef3.current, {
                  strings: [
                    'I thrive at the intersection of academic rigor and hands-on execution, leading blue-team assessments, guiding cross-functional teams, and never losing sight of the people behind the systems. I am energized by complex challenges and focused on building resilient, forward-looking security programs.'
                  ],
                  typeSpeed: 25,
                  startDelay: 500,
                  showCursor: true,
                  cursorChar: '_',
                  loop: false
                });
              }
            }
          });
        }
      }
    };

    if (terminalRef1.current) {
      const typed1 = new Typed(terminalRef1.current, options1);
    }

    return () => {
      // Cleanup will be handled by Typed.js internally
    };
  }, [isVisible]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimezone = (date: Date) => {
    const timezone = date.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop();
    return timezone;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cyber-dark to-cyber-darker min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-30"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-green rounded-full animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Glassmorphism Panel */}
        <div className="profile-card relative bg-black/80 backdrop-blur-xl border border-cyber-green/20 rounded-lg shadow-2xl overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-green/20 via-transparent to-cyber-blue/20 rounded-lg blur-sm"></div>
          <div className="absolute inset-[1px] bg-black/90 rounded-lg"></div>
          
          {/* Window Bar */}
          <div className="relative z-10 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-cyber-green/30">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-cyber-green rounded-full shadow-lg shadow-cyber-green/50 animate-pulse"></div>
              <span className="text-cyber-green font-mono text-sm font-bold tracking-wider">
                ONLINE - SHARAD_PATEL
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500/80 rounded-sm hover:bg-yellow-400 transition-all duration-200 cursor-pointer window-control hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/50"></div>
              <div className="w-4 h-4 bg-green-500/80 rounded-sm hover:bg-green-400 transition-all duration-200 cursor-pointer window-control hover:scale-110 hover:shadow-lg hover:shadow-green-400/50"></div>
              <div className="w-4 h-4 bg-red-500/80 rounded-sm hover:bg-red-400 transition-all duration-200 cursor-pointer window-control hover:scale-110 hover:shadow-lg hover:shadow-red-400/50"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Column - Stats Panel */}
            <div className="lg:w-1/3 p-6 border-r border-cyber-green/20 bg-gradient-to-b from-gray-900/50 to-black/50">
              {/* Profile Photo */}
              <div className="mb-6">
                <div className="w-32 h-40 mx-auto bg-gradient-to-br from-cyber-green/20 to-cyber-blue/20 border border-cyber-green/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-green/10 to-transparent animate-scan"></div>
                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyber-green/30 to-cyber-blue/30 rounded-full mx-auto mb-2 flex items-center justify-center border border-cyber-green/50">
                      <span className="text-cyber-green text-xs font-mono">PHOTO</span>
                    </div>
                    <div className="text-xs font-mono text-cyber-green/80">OPERATIVE ID</div>
                    <div className="text-xs font-mono text-cyber-green">CSO-2025</div>
                  </div>
                </div>
              </div>

              {/* Live Stats */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center py-2 border-b border-cyber-green/20">
                  <span className="text-gray-400">STATUS:</span>
                  <span className="text-cyber-green font-bold flex items-center">
                    <div className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse"></div>
                    OPERATIONAL
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-cyber-green/20">
                  <span className="text-gray-400">FOCUS:</span>
                  <span className="text-cyber-blue font-bold">THREAT INTEL</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-cyber-green/20">
                  <span className="text-gray-400">LOCATION:</span>
                  <span className="text-white">NEW YORK, NY</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-cyber-green/20">
                  <span className="text-gray-400">LOCAL TIME:</span>
                  <span className="text-cyber-green font-bold">
                    {formatTime(currentTime)} {formatTimezone(currentTime)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-cyber-green/20">
                  <span className="text-gray-400">CLEARANCE:</span>
                  <span className="text-yellow-400 font-bold">PUBLIC</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">UPTIME:</span>
                  <span className="text-cyber-green">99.9% RELIABLE</span>
                </div>
              </div>

              {/* System Resources */}
              <div className="mt-8 p-4 bg-black/50 border border-cyber-green/20 rounded">
                <div className="text-xs font-mono text-cyber-green mb-2">SYSTEM RESOURCES</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">MOTIVATION:</span>
                    <span className="text-cyber-green">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-cyber-green h-1 rounded-full w-full progress-bar-glow"></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">CURIOSITY:</span>
                    <span className="text-cyber-blue">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-cyber-blue h-1 rounded-full w-[95%] progress-bar-glow"></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">COFFEE:</span>
                    <span className="text-yellow-400">78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-yellow-400 h-1 rounded-full w-[78%] progress-bar-glow"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Terminal Output */}
            <div className="lg:w-2/3 p-6 bg-black/30 font-mono">
              <div className="space-y-6">
                {/* Command 1 */}
                <div>
                  <div className="text-cyber-green mb-2 terminal-prompt-enhanced">
                    <span className="text-cyber-blue">$</span> ./get_mission.sh
                  </div>
                  <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-cyber-green/30">
                    <span ref={terminalRef1}></span>
                  </div>
                </div>

                {/* Command 2 */}
                <div className="mt-8">
                  <div className="text-cyber-green mb-2 terminal-prompt-enhanced">
                    <span className="text-cyber-blue">$</span> ./get_history.sh --verbose
                  </div>
                  <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-cyber-blue/30">
                    <span ref={terminalRef2}></span>
                  </div>
                </div>

                {/* Command 3 */}
                <div className="mt-8">
                  <div className="text-cyber-green mb-2 terminal-prompt-enhanced">
                    <span className="text-cyber-blue">$</span> ./get_interests.sh
                  </div>
                  <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-purple-400/30">
                    <span ref={terminalRef3}></span>
                  </div>
                </div>

                {/* Skills Matrix */}
                <div className="mt-12 p-4 bg-black/50 border border-cyber-green/20 rounded">
                  <div className="text-cyber-green mb-4 font-bold terminal-prompt-enhanced">
                    <span className="text-cyber-blue">$</span> ./get_skills.sh --matrix
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="text-cyber-green">PENETRATION_TESTING</div>
                      <div className="text-gray-400">├── Kali Linux</div>
                      <div className="text-gray-400">├── Metasploit</div>
                      <div className="text-gray-400">└── Burp Suite</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-cyber-blue">PROGRAMMING</div>
                      <div className="text-gray-400">├── Python</div>
                      <div className="text-gray-400">├── JavaScript</div>
                      <div className="text-gray-400">└── C++</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-purple-400">SECURITY_ANALYSIS</div>
                      <div className="text-gray-400">├── Wireshark</div>
                      <div className="text-gray-400">├── Nmap</div>
                      <div className="text-gray-400">└── OWASP</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-yellow-400">CERTIFICATIONS</div>
                      <div className="text-gray-400">├── CompTIA A+</div>
                      <div className="text-gray-400">├── Security+</div>
                      <div className="text-gray-400">└── [IN_PROGRESS]</div>
                    </div>
                  </div>
                </div>

                {/* Command prompt */}
                <div className="mt-8 flex items-center">
                  <span className="text-cyber-blue">$</span>
                  <span className="text-cyber-green ml-2 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
