import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Code, Lock, User, Mail, FileText, Shield } from "lucide-react";

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  text: string;
  timestamp?: string;
}

const TerminalInterface = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: {
      description: 'Show available commands',
      output: [
        'Available commands:',
        '  help      - Show this help message',
        '  about     - Learn more about Sharad Patel',
        '  skills    - Display technical skills',
        '  projects  - View recent projects',
        '  contact   - Get contact information',
        '  resume    - Download resume',
        '  clear     - Clear terminal',
  
        '  whoami    - Display current user info',
        '  ls        - List available sections',
      ]
    },
    about: {
      description: 'About Sharad Patel',
      output: [
        'CLASSIFIED PERSONNEL FILE',
        '========================',
        'Name: Sharad Patel',
        'Clearance Level: [REDACTED]',
        'Specialization: Cybersecurity & Ethical Hacking',
        'Status: Active',
        'Mission: Protecting digital assets through code & analysis',
        '',
        'Background: Cybersecurity student passionate about',
        'penetration testing and building secure systems.',
        'Turning vulnerabilities into solutions since 2023.',
      ]
    },
    skills: {
      description: 'Technical skills',
      output: [
        'TECHNICAL CAPABILITIES:',
        '======================',
        '• Network Security & Penetration Testing',
        '• Vulnerability Assessment & Management',
        '• Web Application Security',
        '• Python, JavaScript, SQL',
        '• Linux System Administration',
        '• Incident Response & Forensics',
        '• Security Tools: Wireshark, Nmap, Burp Suite',
        '• Compliance Frameworks: NIST, ISO 27001',
      ]
    },
    projects: {
      description: 'Recent projects',
      output: [
        'RECENT SECURITY PROJECTS:',
        '========================',
        '1. Interactive Security Games Suite',
        '   - Phishing Detection Simulator',
        '   - Vulnerability Assessment Tool',
        '   - Firewall Rule Challenge',
        '',
        '2. Penetration Testing Lab',
        '   - Custom vulnerable web applications',
        '   - Automated scanning tools',
        '',
        '3. Security Awareness Training Platform',
        '   - Gamified learning modules',
        '   - Progress tracking system',
      ]
    },
    contact: {
      description: 'Contact information',
      output: [
        'SECURE COMMUNICATION CHANNELS:',
        '==============================',
        'Email: [ENCRYPTED] - Use contact form',
        'LinkedIn: Available on request',
        'GitHub: Check projects section',
        '',
        'For secure communications, please use the',
        'encrypted contact form on this website.',
      ]
    },
    whoami: {
      description: 'Current user information',
      output: [
        'guest@sharad-portfolio:~$ whoami',
        'guest',
        '',
        'You are currently browsing as a guest user.',
        'Access Level: Public',
        'Permissions: Read-only',
      ]
    },
    ls: {
      description: 'List sections',
      output: [
        'drwxr-xr-x  2 sharad sharad 4096 Jan 15 2025 about/',
        'drwxr-xr-x  2 sharad sharad 4096 Jan 15 2025 skills/',
        'drwxr-xr-x  2 sharad sharad 4096 Jan 15 2025 projects/',
        'drwxr-xr-x  2 sharad sharad 4096 Jan 15 2025 games/',
        'drwxr-xr-x  2 sharad sharad 4096 Jan 15 2025 contact/',
        '-rw-r--r--  1 sharad sharad 2048 Jan 15 2025 resume.pdf',

      ]
    },

    resume: {
      description: 'Download resume',
      output: [
        'Initiating secure file transfer...',
        'Downloading: Sharad_Patel_Resume.pdf',
        'Transfer complete.',
      ]
    },
    clear: {
      description: 'Clear terminal',
      output: []
    }
  };

  const typeText = async (text: string, delay = 50) => {
    setIsTyping(true);
    const chars = text.split('');
    let currentText = '';
    
    for (const char of chars) {
      currentText += char;
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0 && newLines[newLines.length - 1].type === 'output') {
          newLines[newLines.length - 1].text = currentText;
        }
        return newLines;
      });
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    setIsTyping(false);
  };

  const executeCommand = async (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    
    // Add command to history
    setLines(prev => [...prev, {
      type: 'command',
      text: `guest@sharad-portfolio:~$ ${cmd}`,
      timestamp
    }]);

    const command = cmd.toLowerCase().trim();
    
    if (command === 'clear') {
      setTimeout(() => setLines([]), 500);
      return;
    }

    if (command === 'resume') {
      setLines(prev => [...prev, { type: 'output', text: 'Initiating secure file transfer...' }]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLines(prev => [...prev, { type: 'output', text: 'Downloading: Sharad_Patel_Resume.pdf' }]);
      await new Promise(resolve => setTimeout(resolve, 500));
      window.open('Sharad_Patel_Resume.pdf', '_blank');
      setLines(prev => [...prev, { type: 'output', text: 'Transfer complete.' }]);
      return;
    }

    if (commands[command as keyof typeof commands]) {
      const cmdOutput = commands[command as keyof typeof commands].output;
      
      for (const line of cmdOutput) {
        setLines(prev => [...prev, { type: 'output', text: '' }]);
        await typeText(line, 20);
      }
    } else {
      setLines(prev => [...prev, {
        type: 'error',
        text: `Command not found: ${cmd}. Type 'help' for available commands.`
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isTyping) {
      executeCommand(currentInput.trim());
      setCurrentInput('');
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Initial welcome message
    const initTerminal = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLines([{ type: 'output', text: '' }]);
      await typeText('Welcome to Sharad Patel\'s Security Terminal v2.1.0', 30);
      
      setLines(prev => [...prev, { type: 'output', text: '' }]);
      await typeText('Initializing security protocols...', 20);
      
      setLines(prev => [...prev, { type: 'output', text: '' }]);
      await typeText('[OK] Firewall active', 20);
      
      setLines(prev => [...prev, { type: 'output', text: '' }]);
      await typeText('[OK] Encryption enabled', 20);
      
      setLines(prev => [...prev, { type: 'output', text: '' }]);
      await typeText('[OK] System secure', 20);
      
      setLines(prev => [...prev, { type: 'output', text: '' }]);
      await typeText('', 20);
      
      setLines(prev => [...prev, { type: 'output', text: '' }]);
      await typeText('Type "help" to see available commands or try navigating:', 20);
    };

    initTerminal();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentInput]);

  return (
    <section className="min-h-screen flex items-center justify-center relative matrix-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="terminal mb-8">
            <div className="terminal-header">
              <span>sharad@portfolio: ~/security-terminal</span>
            </div>
            <div 
              ref={terminalRef}
              className="terminal-body terminal-scrollbar max-h-96 overflow-y-auto"
            >
              {lines.map((line, index) => (
                <div key={index} className="mb-1">
                  {line.type === 'command' && (
                    <div className="text-cyber-green">
                      {line.text}
                    </div>
                  )}
                  {line.type === 'output' && (
                    <div className="text-gray-300 pl-4">
                      {line.text}
                    </div>
                  )}
                  {line.type === 'error' && (
                    <div className="text-red-400 pl-4">
                      {line.text}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Command Input */}
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="terminal-prompt">guest@sharad-portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-cyber-green font-mono flex-1 ml-2"
                  disabled={isTyping}
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="terminal-cursor"></span>
              </form>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => scrollToSection('#about')}
              variant="outline"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 scan-line"
            >
              <User className="w-4 h-4 mr-2" />
              About
            </Button>
            <Button
              onClick={() => scrollToSection('#skills')}
              variant="outline"
              className="border-cyber-green text-cyber-green hover:bg-cyber-green/10 scan-line"
            >
              <Shield className="w-4 h-4 mr-2" />
              Skills
            </Button>
            <Button
              onClick={() => scrollToSection('#projects')}
              variant="outline"
              className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10 scan-line"
            >
              <Code className="w-4 h-4 mr-2" />
              Projects
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 scan-line"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>


        </div>
      </div>
    </section>
  );
};

export default TerminalInterface;