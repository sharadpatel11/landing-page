import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const MiniGames = () => {
  const navigate = useNavigate();

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
    }
  ];

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

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="bg-black border-cyber-green/30 shadow-lg glow-effect hover:border-cyber-green/50 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(game.path)}
            >
              <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{game.icon}</div>
                  <div>
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
                    {game.skills.map((skill, index) => (
                      <span 
                        key={index}
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