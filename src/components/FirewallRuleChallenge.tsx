import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: number;
  ticket: {
    id: string;
    requester: string;
    description: string;
  };
  assets: string[];
  solution: {
    source: string;
    destination: string;
    service: string;
    action: string;
  };
}

interface GameState {
  currentChallengeIndex: number;
  score: number;
  totalChallenges: number;
  gameComplete: boolean;
  showFeedback: boolean;
  userRule: {
    source: string;
    destination: string;
    service: string;
    action: string;
  };
  isCorrect: boolean;
}

interface DragItem {
  id: string;
  label: string;
  category: 'source' | 'destination' | 'service' | 'action';
}

const FirewallRuleChallenge = () => {
  const navigate = useNavigate();

  const challenges: Challenge[] = [
    {
      id: 1,
      ticket: {
        id: 'CHG-001',
        requester: 'Web Team',
        description: 'We have launched the new company website. Please create a firewall rule to allow all external users to access it over a secure connection.'
      },
      assets: ['Public Internet', 'Web Server (10.0.1.50)', 'Database (10.0.2.10)'],
      solution: {
        source: 'Public Internet',
        destination: 'Web Server (10.0.1.50)',
        service: 'HTTPS (443)',
        action: 'Allow'
      }
    },
    {
      id: 2,
      ticket: {
        id: 'CHG-002',
        requester: 'IT Security',
        description: 'Security audit found that the development team can access the production database directly. This is a policy violation. Please block their access immediately.'
      },
      assets: ['Developer VLAN (10.1.1.0/24)', 'Production DB (172.16.0.100)', 'Staging DB (172.17.0.100)'],
      solution: {
        source: 'Developer VLAN (10.1.1.0/24)',
        destination: 'Production DB (172.16.0.100)',
        service: 'Any',
        action: 'Deny'
      }
    },
    {
      id: 3,
      ticket: {
        id: 'CHG-003',
        requester: 'Database Admin',
        description: 'The web application needs to connect to the database server to serve dynamic content. Please allow secure database connections from the web server.'
      },
      assets: ['Web Server (10.0.1.50)', 'Database (10.0.2.10)', 'Public Internet'],
      solution: {
        source: 'Web Server (10.0.1.50)',
        destination: 'Database (10.0.2.10)',
        service: 'MySQL (3306)',
        action: 'Allow'
      }
    },
    {
      id: 4,
      ticket: {
        id: 'CHG-004',
        requester: 'Security Team',
        description: 'We detected suspicious SSH brute force attempts from external sources. Please block all external SSH access to our internal servers immediately.'
      },
      assets: ['Public Internet', 'Internal Servers (192.168.1.0/24)', 'Management Network (10.10.10.0/24)'],
      solution: {
        source: 'Public Internet',
        destination: 'Internal Servers (192.168.1.0/24)',
        service: 'SSH (22)',
        action: 'Deny'
      }
    },
    {
      id: 5,
      ticket: {
        id: 'CHG-005',
        requester: 'IT Operations',
        description: 'System administrators need secure remote access to manage servers. Please allow SSH connections from the management network to internal servers.'
      },
      assets: ['Management Network (10.10.10.0/24)', 'Internal Servers (192.168.1.0/24)', 'Public Internet'],
      solution: {
        source: 'Management Network (10.10.10.0/24)',
        destination: 'Internal Servers (192.168.1.0/24)',
        service: 'SSH (22)',
        action: 'Allow'
      }
    }
  ];

  const [gameState, setGameState] = useState<GameState>({
    currentChallengeIndex: 0,
    score: 0,
    totalChallenges: challenges.length,
    gameComplete: false,
    showFeedback: false,
    userRule: {
      source: '',
      destination: '',
      service: '',
      action: ''
    },
    isCorrect: false
  });

  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const currentChallenge = challenges[gameState.currentChallengeIndex];

  // Generate drag items based on current challenge
  const generateDragItems = (): DragItem[] => {
    const items: DragItem[] = [];
    
    // Source items
    currentChallenge.assets.forEach((asset, index) => {
      items.push({
        id: `source-${index}`,
        label: asset,
        category: 'source'
      });
    });

    // Add "Any" source option
    items.push({
      id: 'source-any',
      label: 'Any',
      category: 'source'
    });

    // Destination items (same as sources typically)
    currentChallenge.assets.forEach((asset, index) => {
      items.push({
        id: `dest-${index}`,
        label: asset,
        category: 'destination'
      });
    });

    // Add "Any" destination option
    items.push({
      id: 'dest-any',
      label: 'Any',
      category: 'destination'
    });

    // Service items
    const services = ['HTTPS (443)', 'HTTP (80)', 'SSH (22)', 'MySQL (3306)', 'FTP (21)', 'DNS (53)', 'Any'];
    services.forEach((service, index) => {
      items.push({
        id: `service-${index}`,
        label: service,
        category: 'service'
      });
    });

    // Action items
    const actions = ['Allow', 'Deny'];
    actions.forEach((action, index) => {
      items.push({
        id: `action-${index}`,
        label: action,
        category: 'action'
      });
    });

    return items;
  };

  const dragItems = generateDragItems();

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropZone: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.category === dropZone || 
        (dropZone === 'source' && draggedItem.category === 'source') ||
        (dropZone === 'destination' && draggedItem.category === 'destination') ||
        (dropZone === 'service' && draggedItem.category === 'service') ||
        (dropZone === 'action' && draggedItem.category === 'action')) {
      
      setGameState(prev => ({
        ...prev,
        userRule: {
          ...prev.userRule,
          [dropZone]: draggedItem.label
        }
      }));
    }
    
    setDraggedItem(null);
  };

  const clearDropZone = (zone: string) => {
    setGameState(prev => ({
      ...prev,
      userRule: {
        ...prev.userRule,
        [zone]: ''
      }
    }));
  };

  const applyRule = () => {
    const { userRule } = gameState;
    const { solution } = currentChallenge;
    
    const isCorrect = 
      userRule.source === solution.source &&
      userRule.destination === solution.destination &&
      userRule.service === solution.service &&
      userRule.action === solution.action;

    setGameState(prev => ({
      ...prev,
      showFeedback: true,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextChallenge = () => {
    if (gameState.currentChallengeIndex < challenges.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentChallengeIndex: prev.currentChallengeIndex + 1,
        showFeedback: false,
        userRule: {
          source: '',
          destination: '',
          service: '',
          action: ''
        }
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        gameComplete: true
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      currentChallengeIndex: 0,
      score: 0,
      totalChallenges: challenges.length,
      gameComplete: false,
      showFeedback: false,
      userRule: {
        source: '',
        destination: '',
        service: '',
        action: ''
      },
      isCorrect: false
    });
  };

  const isRuleComplete = () => {
    const { userRule } = gameState;
    return userRule.source && userRule.destination && userRule.service && userRule.action;
  };

  const getDropZoneClass = (zone: string, hasContent: boolean) => {
    const baseClass = "min-h-[50px] border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ";
    if (hasContent) {
      return baseClass + "border-cyber-green/50 bg-cyber-green/10 text-cyber-green";
    }
    return baseClass + "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyber-green/30 hover:bg-cyber-green/5";
  };

  if (gameState.gameComplete) {
    return (
      <div className="min-h-screen bg-cyber-darker py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-black border-cyber-green/30 shadow-lg glow-effect">
            <CardHeader className="bg-cyber-dark border-b border-cyber-green/30 text-center">
              <CardTitle className="text-cyber-green font-mono text-2xl">
                🛡️ Configuration Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-cyber-green mb-2">
                  {gameState.score} / {gameState.totalChallenges}
                </div>
                <p className="text-xl text-gray-300">
                  You resolved {gameState.score} out of {gameState.totalChallenges} tickets successfully.
                </p>
              </div>

              <div className="mb-8">
                {gameState.score === gameState.totalChallenges ? (
                  <div className="text-cyber-green">
                    <div className="text-lg mb-2">🎉 Perfect Score!</div>
                    <p>Excellent work! You have a strong understanding of firewall rule configuration.</p>
                  </div>
                ) : gameState.score >= gameState.totalChallenges * 0.7 ? (
                  <div className="text-blue-400">
                    <div className="text-lg mb-2">👍 Well Done!</div>
                    <p>Good job! You have a solid grasp of network security principles.</p>
                  </div>
                ) : (
                  <div className="text-yellow-400">
                    <div className="text-lg mb-2">📚 Keep Learning!</div>
                    <p>Practice makes perfect! Review firewall concepts and try again.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-cyber-green text-black font-semibold rounded-lg hover:bg-cyber-green/80 transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-cyber-dark border border-cyber-green/30 text-cyber-green font-semibold rounded-lg hover:bg-cyber-green/10 transition-colors"
                >
                  See More Projects
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-darker py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cyber-text mb-4">
            🛡️ Firewall Rule Challenge
          </h1>
          <div className="flex justify-center items-center space-x-6 text-sm font-mono">
            <span className="text-cyber-green">
              Challenge {gameState.currentChallengeIndex + 1} of {gameState.totalChallenges}
            </span>
            <span className="text-gray-400">Score: {gameState.score}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Ticket */}
          <Card className="bg-black border-cyber-green/30 shadow-lg">
            <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
              <CardTitle className="text-cyber-green font-mono flex items-center">
                🎫 Change Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 font-mono">Ticket ID:</div>
                  <div className="text-cyber-green font-mono text-lg">{currentChallenge.ticket.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-mono">Requester:</div>
                  <div className="text-white">{currentChallenge.ticket.requester}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-mono">Description:</div>
                  <div className="text-gray-300 leading-relaxed bg-gray-900 p-3 rounded border border-gray-700">
                    {currentChallenge.ticket.description}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Middle Panel - Firewall Rule Table */}
          <Card className="bg-black border-cyber-green/30 shadow-lg">
            <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
              <CardTitle className="text-cyber-green font-mono flex items-center">
                ⚙️ Firewall Rule Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-xs font-mono text-gray-400 mb-2">
                  <div>Source</div>
                  <div>Destination</div>
                  <div>Service/Port</div>
                  <div>Action</div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {/* Source Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'source')}
                    className={getDropZoneClass('source', !!gameState.userRule.source)}
                  >
                    {gameState.userRule.source ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono">{gameState.userRule.source}</span>
                        <button
                          onClick={() => clearDropZone('source')}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs">Drop source here</div>
                    )}
                  </div>

                  {/* Destination Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'destination')}
                    className={getDropZoneClass('destination', !!gameState.userRule.destination)}
                  >
                    {gameState.userRule.destination ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono">{gameState.userRule.destination}</span>
                        <button
                          onClick={() => clearDropZone('destination')}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs">Drop destination here</div>
                    )}
                  </div>

                  {/* Service Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'service')}
                    className={getDropZoneClass('service', !!gameState.userRule.service)}
                  >
                    {gameState.userRule.service ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono">{gameState.userRule.service}</span>
                        <button
                          onClick={() => clearDropZone('service')}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs">Drop service here</div>
                    )}
                  </div>

                  {/* Action Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'action')}
                    className={getDropZoneClass('action', !!gameState.userRule.action)}
                  >
                    {gameState.userRule.action ? (
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono ${gameState.userRule.action === 'Allow' ? 'text-green-400' : 'text-red-400'}`}>
                          {gameState.userRule.action}
                        </span>
                        <button
                          onClick={() => clearDropZone('action')}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs">Drop action here</div>
                    )}
                  </div>
                </div>

                {/* Apply Rule Button */}
                <div className="mt-6">
                  <button
                    onClick={applyRule}
                    disabled={!isRuleComplete() || gameState.showFeedback}
                    className="w-full px-4 py-3 bg-cyber-green text-black font-semibold rounded-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-cyber-green/80 transition-colors"
                  >
                    ✔️ Apply Rule
                  </button>
                </div>

                {/* Feedback */}
                {gameState.showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg border ${gameState.isCorrect ? 'bg-green-900/30 border-green-500/50 text-green-300' : 'bg-red-900/30 border-red-500/50 text-red-300'}`}>
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{gameState.isCorrect ? '✅' : '❌'}</span>
                      <span className="font-semibold">
                        {gameState.isCorrect ? 'Rule Accepted!' : 'Rule Rejected!'}
                      </span>
                    </div>
                    <p className="text-sm mb-3">
                      {gameState.isCorrect 
                        ? 'Perfect! Your firewall rule correctly implements the security policy.' 
                        : 'This configuration is incorrect. Review the ticket requirements and network assets.'}
                    </p>
                    {!gameState.isCorrect && (
                      <div className="text-xs bg-black/50 p-3 rounded border border-gray-600">
                        <div className="font-semibold mb-1">Expected Solution:</div>
                        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                          <div>Source: <span className="text-cyber-green">{currentChallenge.solution.source}</span></div>
                          <div>Dest: <span className="text-cyber-green">{currentChallenge.solution.destination}</span></div>
                          <div>Service: <span className="text-cyber-green">{currentChallenge.solution.service}</span></div>
                          <div>Action: <span className={currentChallenge.solution.action === 'Allow' ? 'text-green-400' : 'text-red-400'}>{currentChallenge.solution.action}</span></div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={nextChallenge}
                      className="mt-3 px-4 py-2 bg-cyber-green text-black font-semibold rounded hover:bg-cyber-green/80 transition-colors"
                    >
                      {gameState.currentChallengeIndex < challenges.length - 1 ? 'Next Ticket' : 'Complete Challenge'}
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Toolbox & Network Map */}
          <Card className="bg-black border-cyber-green/30 shadow-lg">
            <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
              <CardTitle className="text-cyber-green font-mono flex items-center">
                🔧 Toolbox & Network Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Network Map */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-cyber-green mb-2">Network Assets:</h4>
                <div className="space-y-1">
                  {currentChallenge.assets.map((asset, index) => (
                    <div key={index} className="text-xs font-mono text-gray-300 bg-gray-900 p-2 rounded border border-gray-700">
                      {asset}
                    </div>
                  ))}
                </div>
              </div>

              {/* Toolbox */}
              <div>
                <h4 className="text-sm font-semibold text-cyber-green mb-3">Drag & Drop Components:</h4>
                <div className="space-y-3">
                  {/* Sources */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Sources:</div>
                    <div className="flex flex-wrap gap-1">
                      {dragItems.filter(item => item.category === 'source').map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-500/30 cursor-grab hover:bg-blue-900/50 transition-colors font-mono"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destinations */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Destinations:</div>
                    <div className="flex flex-wrap gap-1">
                      {dragItems.filter(item => item.category === 'destination').map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded border border-purple-500/30 cursor-grab hover:bg-purple-900/50 transition-colors font-mono"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Services:</div>
                    <div className="flex flex-wrap gap-1">
                      {dragItems.filter(item => item.category === 'service').map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          className="px-2 py-1 bg-yellow-900/30 text-yellow-300 text-xs rounded border border-yellow-500/30 cursor-grab hover:bg-yellow-900/50 transition-colors font-mono"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Actions:</div>
                    <div className="flex flex-wrap gap-1">
                      {dragItems.filter(item => item.category === 'action').map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          className={`px-2 py-1 text-xs rounded border cursor-grab transition-colors font-mono ${
                            item.label === 'Allow' 
                              ? 'bg-green-900/30 text-green-300 border-green-500/30 hover:bg-green-900/50'
                              : 'bg-red-900/30 text-red-300 border-red-500/30 hover:bg-red-900/50'
                          }`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-cyber-dark border border-cyber-green/30 text-cyber-green font-semibold rounded-lg hover:bg-cyber-green/10 transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirewallRuleChallenge;