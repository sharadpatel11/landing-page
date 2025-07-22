
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentScanText, setCurrentScanText] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasStartedScan, setHasStartedScan] = useState(false);

  const scanStages = [
    { progress: 15, text: 'Scanning network defenses...' },
    { progress: 32, text: 'Auditing scripting engines...' },
    { progress: 58, text: 'Enumerating offensive tooling...' },
    { progress: 73, text: 'Analyzing cloud security protocols...' },
    { progress: 89, text: 'Evaluating forensics capabilities...' },
    { progress: 100, text: 'Audit complete. Generating report...' }
  ];

  const skillCategories = [
    {
      id: 'network-security',
      title: 'NETWORK SECURITY & PROTOCOLS',
      count: 5,
      skills: [
        { name: 'TCP/IP Suite', status: 'HARDENED', description: 'In-depth packet analysis and subnetting.' },
        { name: 'Nmap', status: 'PROFICIENT', description: 'Port scanning, service enumeration, NSE scripting.' },
        { name: 'Wireshark', status: 'PROFICIENT', description: 'Traffic analysis, protocol dissection, forensics.' },
        { name: 'DNS, DHCP, HTTP/S', status: 'HARDENED', description: 'Configuration, security, and troubleshooting.' },
        { name: 'Firewall (iptables)', status: 'OPERATIONAL', description: 'Rule configuration and policy enforcement.' }
      ]
    },
    {
      id: 'scripting-automation',
      title: 'SCRIPTING & AUTOMATION',
      count: 4,
      skills: [
        { name: 'Python', status: 'PROFICIENT', description: 'Automation scripts, data parsing, API interaction.' },
        { name: 'Bash', status: 'PROFICIENT', description: 'System administration, log analysis, tool chaining.' },
        { name: 'PowerShell', status: 'FAMILIAR', description: 'Active Directory enumeration and Windows automation.' },
        { name: 'JavaScript', status: 'OPERATIONAL', description: 'Web security testing and automation frameworks.' }
      ]
    },
    {
      id: 'offensive-tooling',
      title: 'OFFENSIVE TOOLING',
      count: 4,
      skills: [
        { name: 'Metasploit', status: 'PROFICIENT', description: 'Exploit modules, payload generation, post-exploitation.' },
        { name: 'Burp Suite', status: 'PROFICIENT', description: 'Web app vulnerability scanning, proxy interception.' },
        { name: 'John the Ripper', status: 'OPERATIONAL', description: 'Password cracking and hash identification.' },
        { name: 'Gobuster', status: 'OPERATIONAL', description: 'Directory and subdomain brute-forcing.' }
      ]
    },
    {
      id: 'cloud-security',
      title: 'CLOUD SECURITY',
      count: 3,
      skills: [
        { name: 'AWS Security', status: 'OPERATIONAL', description: 'IAM policies, CloudTrail analysis, S3 bucket security.' },
        { name: 'Azure Security', status: 'FAMILIAR', description: 'Azure AD, security center, compliance frameworks.' },
        { name: 'Docker/Kubernetes', status: 'OPERATIONAL', description: 'Container security, image scanning, runtime protection.' }
      ]
    },
    {
      id: 'forensics-analysis',
      title: 'FORENSICS & ANALYSIS',
      count: 3,
      skills: [
        { name: 'Volatility', status: 'OPERATIONAL', description: 'Memory forensics and malware analysis.' },
        { name: 'Autopsy', status: 'OPERATIONAL', description: 'Digital forensics and incident response.' },
        { name: 'YARA Rules', status: 'FAMILIAR', description: 'Malware detection and signature creation.' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HARDENED': return 'text-cyber-green';
      case 'PROFICIENT': return 'text-cyber-blue';
      case 'OPERATIONAL': return 'text-yellow-400';
      case 'FAMILIAR': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
    return now.toLocaleDateString('en-US', options).toUpperCase();
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedScan) {
          setHasStartedScan(true);
          startScan();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStartedScan]);

  const startScan = async () => {
    for (let i = 0; i < scanStages.length; i++) {
      const stage = scanStages[i];
      setCurrentScanText(stage.text);
      
      // Animate progress gradually
      const startProgress = i === 0 ? 0 : scanStages[i - 1].progress;
      const endProgress = stage.progress;
      const steps = 20;
      const increment = (endProgress - startProgress) / steps;
      
      for (let step = 0; step <= steps; step++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setScanProgress(startProgress + (increment * step));
      }
      
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    setScanComplete(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setShowReport(true);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* System Audit Header */}
          <div className="mb-8">
            <div className="bg-black border-2 border-cyber-green rounded-lg p-6 font-mono">
              <div className="border-b border-cyber-green/30 pb-4 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-cyber-green mb-2">
                  SYSTEM CAPABILITY AUDIT // REPORT
                </h2>
                <div className="text-sm text-gray-300">
                  <div>RUN DATE: {getCurrentDate()}</div>
                  <div className="mt-1">
                    STATUS: <span className={scanComplete ? 'text-cyber-green' : 'text-yellow-400'}>
                      {scanComplete ? 'COMPLETE' : 'RUNNING'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scanning Animation */}
              {!showReport && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-cyber-blue">
                      [{Math.round(scanProgress).toString().padStart(3, ' ')}%]
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyber-green to-cyber-blue h-2 rounded-full transition-all duration-100 ease-out"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-gray-300 min-h-[1.5rem]">
                    {currentScanText}
                    {!scanComplete && (
                      <span className="inline-block w-2 h-5 bg-cyber-green ml-1 animate-pulse"></span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Report */}
          {showReport && (
            <Card className="bg-black border-2 border-cyber-green font-mono animate-fade-in-up">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {skillCategories.map((category) => (
                    <div key={category.id} className="border-b border-gray-800 last:border-b-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full text-left group hover:bg-gray-900/30 p-2 rounded transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-cyber-green">
                              {expandedCategories.includes(category.id) ? '[-]' : '[+]'}
                            </span>
                            <span className="text-cyber-blue font-bold">
                              {category.title}
                            </span>
                            <span className="text-gray-400">
                              [{category.count}]
                            </span>
                          </div>
                        </div>
                      </button>

                      {expandedCategories.includes(category.id) && (
                        <div className="mt-3 pl-8 space-y-2 animate-fade-in-up">
                          {category.skills.map((skill, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-[2fr,1fr,3fr] gap-2 py-1 text-sm">
                              <div className="text-white">
                                - {skill.name} {'·'.repeat(Math.max(1, 20 - skill.name.length))}
                              </div>
                              <div className={`${getStatusColor(skill.status)} font-bold`}>
                                [STATUS: {skill.status}]
                              </div>
                              <div className="text-gray-400">
                                // {skill.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 text-center text-gray-500 border-t border-gray-800">
                    // --- END OF REPORT ---
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Expand All Button */}
          {showReport && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  if (expandedCategories.length === skillCategories.length) {
                    setExpandedCategories([]);
                  } else {
                    setExpandedCategories(skillCategories.map(cat => cat.id));
                  }
                }}
                className="bg-cyber-green/10 border border-cyber-green text-cyber-green px-6 py-2 rounded hover:bg-cyber-green/20 transition-colors font-mono text-sm"
              >
                {expandedCategories.length === skillCategories.length ? 'COLLAPSE ALL' : 'EXPAND ALL'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
