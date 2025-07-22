
import React, { useState, useEffect } from 'react';

const About = () => {
  const [declassifiedVisible, setDeclassifiedVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeclassifiedVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const redactedItems = [
    {
      id: 'education',
      text: 'MS in Cybersecurity at NYU Tandon School of Engineering',
      placeholder: '[REDACTED - EDUCATIONAL BACKGROUND]'
    },
    {
      id: 'previous',
      text: 'Computer Science from Queens College',
      placeholder: '[REDACTED - PREVIOUS STUDIES]'
    },
    {
      id: 'certifications',
      text: 'CompTIA A+ and Security+ certifications',
      placeholder: '[REDACTED - CERTIFICATION PURSUITS]'
    },
    {
      id: 'specialization',
      text: 'vulnerability analysis and threat mitigation',
      placeholder: '[REDACTED - AREA OF FOCUS]'
    }
  ];

  const [revealedItems, setRevealedItems] = useState<Set<string>>(new Set());

  const handleRedactedHover = (id: string, revealed: boolean) => {
    setRevealedItems(prev => {
      const newSet = new Set(prev);
      if (revealed) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const RedactedText: React.FC<{
    item: typeof redactedItems[0];
    inline?: boolean;
  }> = ({ item, inline = false }) => {
    const isRevealed = revealedItems.has(item.id);
    
    return (
      <span
        className={`redacted-container ${inline ? 'inline-block' : 'block'} cursor-pointer relative`}
        onMouseEnter={() => handleRedactedHover(item.id, true)}
        onMouseLeave={() => handleRedactedHover(item.id, false)}
      >
        <span
          className={`redacted-overlay absolute inset-0 bg-black text-red-500 font-bold transition-transform duration-500 ease-in-out flex items-center justify-center text-xs ${
            isRevealed ? 'transform scale-x-0' : 'transform scale-x-100'
          }`}
          style={{ transformOrigin: 'center' }}
        >
          {item.placeholder}
        </span>
        <span className={`redacted-text ${isRevealed ? 'text-cyber-green' : 'text-transparent'}`}>
          {item.text}
        </span>
      </span>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cyber-dark to-cyber-darker min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="dossier-container relative">
          {/* Paper texture background */}
          <div 
            className="dossier-paper aged-paper scanned-document bg-amber-50 text-black p-8 relative shadow-2xl"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(120,119,108,0.3) 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, rgba(120,119,108,0.3) 1px, transparent 1px),
                radial-gradient(circle at 40% 40%, rgba(120,119,108,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px, 30px 30px, 15px 15px',
              fontFamily: "'Special Elite', 'Courier New', 'Monaco', 'Menlo', monospace"
            }}
          >
            {/* Coffee stain */}
            <div 
              className="absolute top-4 right-8 w-16 h-16 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, #8B4513 0%, #D2691E 40%, transparent 70%)',
                transform: 'rotate(45deg)'
              }}
            />
            
            {/* TOP SECRET stamp (crossed out) */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -rotate-12">
              <div className="relative">
                <div className="text-red-600 text-xl font-bold border-4 border-red-600 px-4 py-2 bg-red-100 opacity-60">
                  TOP SECRET
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-red-600 transform rotate-12"></div>
                  <div className="absolute w-full h-1 bg-red-600 transform -rotate-12"></div>
                </div>
              </div>
            </div>

            {/* DECLASSIFIED stamp */}
            <div className={`absolute top-20 left-1/2 transition-opacity duration-1000 ${
              declassifiedVisible ? 'opacity-100 declassified-stamp' : 'opacity-0'
            }`}
            style={{ transform: 'translate(-50%, 0) rotate(12deg)' }}>
              <div className="text-green-700 text-2xl font-bold border-4 border-green-700 px-6 py-3 bg-green-100 shadow-lg">
                DECLASSIFIED
              </div>
              <div className="text-center text-green-700 text-sm font-bold mt-1">
                FOR PUBLIC REVIEW
              </div>
            </div>

            {/* Document Header */}
            <div className="mt-32 mb-8 border-b-2 border-black pb-4">
              <div className="text-center text-2xl font-bold mb-4 typewriter">
                OPERATIVE DOSSIER
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>DOCUMENT_ID:</strong> A-7222025
                </div>
                <div>
                  <strong>DATE:</strong> {new Date().toLocaleDateString('en-US', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  }).toUpperCase()}
                </div>
                <div className="col-span-2">
                  <strong>SUBJECT_FILE:</strong> Sharad Patel - Cybersecurity Operative
                </div>
                <div className="col-span-2">
                  <strong>STATUS:</strong> DECLASSIFIED // FOR PUBLIC REVIEW
                </div>
              </div>
            </div>

            {/* ID Photo Section */}
            <div className="flex items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-40 bg-gray-300 border-2 border-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">PHOTO</span>
                    </div>
                    <div className="text-xs font-bold">OPERATIVE ID</div>
                    <div className="text-xs">CSO-2025</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold mb-4 underline">PRIMARY_DIRECTIVE:</h3>
                <p className="text-sm leading-relaxed mb-6">
                  To architect and defend resilient digital systems against emerging threats. 
                  Passionate about turning vulnerabilities into strengths and safeguarding 
                  the technologies that connect our world.
                </p>
              </div>
            </div>

            {/* Dossier Fields */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 underline">BACKGROUND_INTEL:</h3>
                <div className="text-sm leading-relaxed space-y-3">
                  <p>
                    Subject developed an early interest in network systems and digital security, 
                    leading to formal studies in <RedactedText item={redactedItems[1]} inline />. 
                    Currently pursuing advanced training in <RedactedText item={redactedItems[0]} inline />.
                  </p>
                  <p>
                    Operative has demonstrated proficiency in multiple programming languages including 
                    Linux, Python, Java, C++, and JavaScript. Shows particular aptitude for 
                    <RedactedText item={redactedItems[3]} inline /> and hands-on security research.
                  </p>
                  <p>
                    Currently working toward industry-standard credentials: <RedactedText item={redactedItems[2]} inline />. 
                    Fascinated by the puzzle of both breaking and building secure environments.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 underline">METHODOLOGY:</h3>
                <p className="text-sm leading-relaxed">
                  Employs a proactive, intelligence-driven approach combining offensive tactics 
                  with defensive foresight. Utilizes ethical hacking methodologies for vulnerability 
                  identification and comprehensive risk assessment. Currently experimenting with 
                  advanced penetration testing frameworks and security automation tools.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 underline">OPERATIONAL_CAPABILITIES:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>• PENETRATION_TESTING:</strong><br />
                    Ethical hacking methodologies
                  </div>
                  <div>
                    <strong>• SECURITY_ANALYSIS:</strong><br />
                    Risk assessment & auditing
                  </div>
                  <div>
                    <strong>• VULNERABILITY_RESEARCH:</strong><br />
                    System flaw documentation
                  </div>
                  <div>
                    <strong>• SECURITY_AWARENESS:</strong><br />
                    Team education & training
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 underline">KEY_TRAITS:</h3>
                <p className="text-sm font-bold">
                  ANALYTICAL | PERSISTENT | COLLABORATIVE | DETAIL-ORIENTED | INNOVATIVE
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 underline">MISSION_STATUS:</h3>
                <p className="text-sm leading-relaxed">
                  ACTIVE - Seeking opportunities to contribute to innovative cybersecurity solutions 
                  and collaborate with industry leaders in addressing the evolving landscape of 
                  digital threats. Ready for deployment in challenging security environments.
                </p>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t-2 border-black text-center">
              <div className="text-sm font-bold">
                END OF FILE
              </div>
              <div className="text-xs mt-2 opacity-60">
                CLASSIFICATION LEVEL: UNCLASSIFIED // APPROVED FOR PUBLIC RELEASE
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default About;
