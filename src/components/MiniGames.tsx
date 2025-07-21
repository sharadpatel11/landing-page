import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MiniGames = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const games = [
    {
      id: 'rogue-file-hunt',
      title: 'The Rogue File Hunt',
      description: 'Test your cybersecurity skills! Find and remove the malicious file before time runs out.',
      icon: '🔍',
      path: '/rogue-file-hunt',
      difficulty: 'Intermediate',
      skills: ['Terminal Commands', 'File System Navigation', 'Threat Detection']
    },
    {
      id: 'spot-the-phish',
      title: 'Spot the Phish Challenge',
      description: 'Analyze suspicious emails and identify phishing attempts. Learn to spot social engineering tactics.',
      icon: '🎣',
      path: '/spot-the-phish',
      difficulty: 'Beginner',
      skills: ['Email Security', 'Social Engineering', 'Threat Recognition']
    },
    {
      id: 'firewall-rule-challenge',
      title: 'Firewall Rule Challenge',
      description: 'Act as a network security analyst and build correct firewall rules using drag-and-drop. Translate change requests into technical configurations.',
      icon: '🛡️',
      path: '/firewall-rule-challenge',
      difficulty: 'Advanced',
      skills: ['Network Security', 'Firewall Configuration', 'Policy Analysis']
    },
    {
      id: 'code-vulnerability-audit',
      title: 'Code Vulnerability Audit',
      description: 'Act as a security code reviewer and identify vulnerabilities in code snippets from multiple programming languages. Test your knowledge of common security flaws.',
      icon: '🕵️‍♀️',
      path: '/code-vulnerability-audit',
      difficulty: 'Expert',
      skills: ['Code Review', 'Vulnerability Assessment', 'Secure Coding']
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 32; // 8 * 4 (gap-8 in Tailwind)
      const scrollAmount = (cardWidth + gap) * 2; // Scroll by 2 cards
      
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 cyber-text">
            Cybersecurity Mini Games
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive challenges to test and improve your cybersecurity knowledge. 
            Each game simulates real-world security scenarios you might encounter.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-cyber-dark border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 hover:border-cyber-green/50 transition-all duration-300 p-3 rounded-full glow-effect"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-cyber-dark border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 hover:border-cyber-green/50 transition-all duration-300 p-3 rounded-full glow-effect"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {games.map((game, index) => (
              <Card 
                key={game.id}
                className="bg-black border-cyber-green/30 shadow-lg glow-effect hover:border-cyber-green/50 transition-all duration-300 cursor-pointer group flex-shrink-0 w-[calc(50%-1rem)]"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => navigate(game.path)}
              >
                <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{game.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-cyber-green font-mono text-xl group-hover:text-white transition-colors">
                        {game.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs rounded font-mono">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-cyber-green mb-2">Skills Practiced:</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-cyber-dark text-gray-300 text-xs rounded border border-cyber-green/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400 font-mono">
                      Click to play →
                    </div>
                    <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse group-hover:animate-none group-hover:bg-white transition-colors"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(games.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
                    const gap = 32;
                    const scrollAmount = (cardWidth + gap) * 2 * index;
                    scrollContainerRef.current.scrollTo({
                      left: scrollAmount,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="w-3 h-3 rounded-full bg-cyber-green/30 hover:bg-cyber-green/50 transition-all duration-300"
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            More games coming soon! Each challenge is designed to simulate real-world cybersecurity scenarios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;