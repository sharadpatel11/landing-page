import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MiniGames = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      id: 'crypto-tool',
      title: 'Crypto Tool Playground',
      description: 'Interactive encryption and decryption tool. Learn about Caesar cipher, ROT13, Base64, and more cryptographic techniques.',
      icon: '🔐',
      path: '/crypto-tool',
      difficulty: 'Beginner',
      skills: ['Cryptography', 'Encryption', 'Decryption', 'Text Manipulation']
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

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < games.length) {
      const cardWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = cardWidth * index;
      
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      updateScrollButtons();
      
      // Update current index based on scroll position
      if (scrollContainerRef.current) {
        const cardWidth = scrollContainerRef.current.clientWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };

    const handleResize = () => {
      updateScrollButtons();
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      
      // Initial setup
      updateScrollButtons();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

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

        <div className="relative">
          {/* Container with proper spacing for arrows */}
          <div className="mx-8 sm:mx-12 lg:mx-16">
            {/* Navigation Buttons - Positioned outside the card area */}
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-8 z-10 p-2 sm:p-3 rounded-full glow-effect transition-all duration-300 ${
                canScrollLeft 
                  ? 'bg-cyber-dark border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 hover:border-cyber-green/50 cursor-pointer' 
                  : 'bg-gray-800 border border-gray-600 text-gray-500 cursor-not-allowed opacity-50'
              }`}
              aria-label="Previous game"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-8 z-10 p-2 sm:p-3 rounded-full glow-effect transition-all duration-300 ${
                canScrollRight 
                  ? 'bg-cyber-dark border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 hover:border-cyber-green/50 cursor-pointer' 
                  : 'bg-gray-800 border border-gray-600 text-gray-500 cursor-not-allowed opacity-50'
              }`}
              aria-label="Next game"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Scrollable Cards Container - One card at a time */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {games.map((game, index) => (
                <div 
                  key={game.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <Card 
                    className="bg-black border-cyber-green/30 shadow-lg glow-effect hover:border-cyber-green/50 transition-all duration-300 cursor-pointer group mx-auto max-w-2xl"
                    onClick={() => {
                      if (game.id === 'crypto-tool') {
                        window.open(game.path, '_blank');
                      } else {
                        navigate(game.path);
                      }
                    }}
                  >
                    <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl sm:text-4xl flex-shrink-0">{game.icon}</div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-cyber-green font-mono text-lg sm:text-xl group-hover:text-white transition-colors">
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
                    
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
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
                          {game.id === 'crypto-tool' ? 'Click to open in new tab →' : 'Click to play →'}
                        </div>
                        <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse group-hover:animate-none group-hover:bg-white transition-colors"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {games.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-cyber-green scale-110' 
                    : 'bg-cyber-green/30 hover:bg-cyber-green/50'
                }`}
                aria-label={`Go to game ${index + 1}`}
              />
            ))}
          </div>

          {/* Card counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400 font-mono">
              {currentIndex + 1} / {games.length}
            </span>
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