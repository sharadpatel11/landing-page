import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useUiMode } from "@/theme/ui-mode";
import { cn } from "@/lib/utils";

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

type FirewallRuleChallengeProps = {
  embedded?: boolean;
};

const FirewallRuleChallenge = ({ embedded = false }: FirewallRuleChallengeProps) => {
  const navigate = useNavigate();
  const { mode } = useUiMode();
  const isModern = mode === "modern";

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

  const getDropZoneClass = (_zone: string, hasContent: boolean) => {
    const baseClass =
      "min-h-[72px] border-2 border-dashed rounded-xl p-3 text-center transition-all duration-200 flex items-center justify-center ";
    if (hasContent) {
      return cn(
        baseClass,
        isModern ? "border-emerald-400/40 bg-emerald-400/10 text-foreground" : "border-cyber-green/50 bg-cyber-green/10 text-cyber-green"
      );
    }
    return cn(
      baseClass,
      isModern
        ? "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.05]"
        : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyber-green/30 hover:bg-cyber-green/5"
    );
  };

  if (gameState.gameComplete) {
    return (
      <div className={cn(!embedded && "min-h-screen", !embedded && !isModern && "bg-cyber-darker", "py-4 sm:py-8")}>
        <div className={cn(isModern ? "mx-auto max-w-4xl px-2 sm:px-4" : "container mx-auto px-2 sm:px-4 max-w-4xl")}>
          <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg" : "bg-black border-cyber-green/30 shadow-lg glow-effect")}>
            <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30", "text-center p-4 sm:p-6")}>
              <CardTitle className={cn("font-mono text-lg sm:text-2xl", isModern ? "text-foreground" : "text-cyber-green")}>
                🛡️ Configuration Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-8 text-center">
              <div className="mb-6">
                <div className="text-2xl sm:text-4xl font-bold text-cyber-green mb-2">
                  {gameState.score} / {gameState.totalChallenges}
                </div>
                <p className="text-sm sm:text-xl text-gray-300 break-words">
                  You resolved {gameState.score} out of {gameState.totalChallenges} tickets successfully.
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                {gameState.score === gameState.totalChallenges ? (
                  <div className="text-cyber-green">
                    <div className="text-base sm:text-lg mb-2">🎉 Perfect Score!</div>
                    <p className="text-sm sm:text-base break-words">Excellent work! You have a strong understanding of firewall rule configuration.</p>
                  </div>
                ) : gameState.score >= gameState.totalChallenges * 0.7 ? (
                  <div className="text-blue-400">
                    <div className="text-base sm:text-lg mb-2">👍 Well Done!</div>
                    <p className="text-sm sm:text-base break-words">Good job! You have a solid grasp of network security principles.</p>
                  </div>
                ) : (
                  <div className="text-yellow-400">
                    <div className="text-base sm:text-lg mb-2">📚 Keep Learning!</div>
                    <p className="text-sm sm:text-base break-words">Practice makes perfect! Review firewall concepts and try again.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className={cn(
                    "px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl transition-colors text-sm sm:text-base",
                    isModern ? "bg-white text-black hover:bg-white/90" : "bg-cyber-green text-black hover:bg-cyber-green/80"
                  )}
                >
                  Play Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className={cn(
                    "px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl transition-colors text-sm sm:text-base",
                    isModern
                      ? "border border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06]"
                      : "bg-cyber-dark border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                  )}
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
    <div className={cn(!embedded && "min-h-screen", !embedded && !isModern && "bg-cyber-darker", "py-4 sm:py-8")}>
      <div className={cn(isModern ? "mx-auto max-w-7xl px-2 sm:px-4" : "container mx-auto px-2 sm:px-4 max-w-7xl")}>
        {/* Header */}
        {!embedded && (
          <div className="text-center mb-6 sm:mb-8">
            <h1 className={cn("text-2xl sm:text-4xl font-semibold mb-4", isModern ? "text-foreground" : "font-bold cyber-text")}>
              🛡️ Firewall Rule Challenge
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm font-mono">
              <span className={cn(isModern ? "text-muted-foreground" : "text-cyber-green")}>
                Challenge {gameState.currentChallengeIndex + 1} of {gameState.totalChallenges}
              </span>
              <span className={cn(isModern ? "text-muted-foreground" : "text-gray-400")}>Score: {gameState.score}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Panel - Ticket */}
          <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg order-1" : "bg-black border-cyber-green/30 shadow-lg order-1")}>
            <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30", "p-4")}>
              <CardTitle className={cn("font-mono flex items-center text-sm sm:text-base", isModern ? "text-foreground" : "text-cyber-green")}>
                🎫 Change Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xs sm:text-sm text-gray-400 font-mono">Ticket ID:</div>
                  <div className={cn("font-mono text-sm sm:text-lg break-all", isModern ? "text-foreground" : "text-cyber-green")}>
                    {currentChallenge.ticket.id}
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-400 font-mono">Requester:</div>
                  <div className={cn("text-sm sm:text-base break-words", isModern ? "text-foreground" : "text-white")}>
                    {currentChallenge.ticket.requester}
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-400 font-mono">Description:</div>
                  <div
                    className={cn(
                      "leading-relaxed p-3 rounded-xl border text-xs sm:text-sm break-words",
                      isModern ? "border-white/10 bg-white/[0.03] text-muted-foreground" : "text-gray-300 bg-gray-900 border-gray-700"
                    )}
                  >
                    {currentChallenge.ticket.description}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Middle Panel - Firewall Rule Table */}
          <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg order-3 lg:order-2" : "bg-black border-cyber-green/30 shadow-lg order-3 lg:order-2")}>
            <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30", "p-4")}>
              <CardTitle className={cn("font-mono flex items-center text-sm sm:text-base", isModern ? "text-foreground" : "text-cyber-green")}>
                ⚙️ Firewall Rule Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {/* Responsive table headers */}
                <div className="hidden sm:grid grid-cols-4 gap-2 text-xs font-mono text-gray-400 mb-2">
                  <div>Source</div>
                  <div>Destination</div>
                  <div>Service/Port</div>
                  <div>Action</div>
                </div>
                
                {/* Mobile-friendly stacked layout for small screens */}
                <div className="sm:hidden space-y-3">
                  {/* Source Drop Zone - Mobile */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Source:</div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'source')}
                      className={`min-h-[60px] border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ${
                        gameState.userRule.source 
                          ? "border-cyber-green/50 bg-cyber-green/10 text-cyber-green" 
                          : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyber-green/30 hover:bg-cyber-green/5"
                      }`}
                    >
                      {gameState.userRule.source ? (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono break-all flex-1 mr-2">{gameState.userRule.source}</span>
                          <button
                            onClick={() => clearDropZone('source')}
                            className="text-red-400 hover:text-red-300 text-xs flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs">Drop source here</div>
                      )}
                    </div>
                  </div>

                  {/* Destination Drop Zone - Mobile */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Destination:</div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'destination')}
                      className={`min-h-[60px] border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ${
                        gameState.userRule.destination 
                          ? "border-cyber-green/50 bg-cyber-green/10 text-cyber-green" 
                          : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyber-green/30 hover:bg-cyber-green/5"
                      }`}
                    >
                      {gameState.userRule.destination ? (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono break-all flex-1 mr-2">{gameState.userRule.destination}</span>
                          <button
                            onClick={() => clearDropZone('destination')}
                            className="text-red-400 hover:text-red-300 text-xs flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs">Drop destination here</div>
                      )}
                    </div>
                  </div>

                  {/* Service Drop Zone - Mobile */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Service/Port:</div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'service')}
                      className={`min-h-[60px] border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ${
                        gameState.userRule.service 
                          ? "border-cyber-green/50 bg-cyber-green/10 text-cyber-green" 
                          : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyber-green/30 hover:bg-cyber-green/5"
                      }`}
                    >
                      {gameState.userRule.service ? (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono break-all flex-1 mr-2">{gameState.userRule.service}</span>
                          <button
                            onClick={() => clearDropZone('service')}
                            className="text-red-400 hover:text-red-300 text-xs flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs">Drop service here</div>
                      )}
                    </div>
                  </div>

                  {/* Action Drop Zone - Mobile */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Action:</div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'action')}
                      className={`min-h-[60px] border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ${
                        gameState.userRule.action 
                          ? "border-cyber-green/50 bg-cyber-green/10 text-cyber-green" 
                          : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyber-green/30 hover:bg-cyber-green/5"
                      }`}
                    >
                      {gameState.userRule.action ? (
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono flex-1 mr-2 ${gameState.userRule.action === 'Allow' ? 'text-green-400' : 'text-red-400'}`}>
                            {gameState.userRule.action}
                          </span>
                          <button
                            onClick={() => clearDropZone('action')}
                            className="text-red-400 hover:text-red-300 text-xs flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs">Drop action here</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop grid layout */}
                <div className="hidden sm:grid grid-cols-4 gap-2">
                  {/* Source Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'source')}
                    className={getDropZoneClass('source', !!gameState.userRule.source)}
                  >
                    {gameState.userRule.source ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-xs font-mono text-center break-all leading-tight">{gameState.userRule.source}</span>
                        <button
                          onClick={() => clearDropZone('source')}
                          className="text-red-400 hover:text-red-300 text-xs mt-1"
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
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-xs font-mono text-center break-all leading-tight">{gameState.userRule.destination}</span>
                        <button
                          onClick={() => clearDropZone('destination')}
                          className="text-red-400 hover:text-red-300 text-xs mt-1"
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
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-xs font-mono text-center break-all leading-tight">{gameState.userRule.service}</span>
                        <button
                          onClick={() => clearDropZone('service')}
                          className="text-red-400 hover:text-red-300 text-xs mt-1"
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
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className={`text-xs font-mono text-center ${gameState.userRule.action === 'Allow' ? 'text-green-400' : 'text-red-400'}`}>
                          {gameState.userRule.action}
                        </span>
                        <button
                          onClick={() => clearDropZone('action')}
                          className="text-red-400 hover:text-red-300 text-xs mt-1"
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
                    className={cn(
                      "w-full px-4 py-3 font-semibold rounded-xl disabled:cursor-not-allowed transition-colors text-sm sm:text-base",
                      isModern
                        ? "bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-muted-foreground"
                        : "bg-cyber-green text-black hover:bg-cyber-green/80 disabled:bg-gray-600 disabled:text-gray-400"
                    )}
                  >
                    ✔️ Apply Rule
                  </button>
                </div>

                {/* Feedback */}
                {gameState.showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg border ${gameState.isCorrect ? 'bg-green-900/30 border-green-500/50 text-green-300' : 'bg-red-900/30 border-red-500/50 text-red-300'}`}>
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{gameState.isCorrect ? '✅' : '❌'}</span>
                      <span className="font-semibold text-sm sm:text-base">
                        {gameState.isCorrect ? 'Rule Accepted!' : 'Rule Rejected!'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm mb-3 break-words">
                      {gameState.isCorrect 
                        ? 'Perfect! Your firewall rule correctly implements the security policy.' 
                        : 'This configuration is incorrect. Review the ticket requirements and network assets.'}
                    </p>
                    {!gameState.isCorrect && (
                      <div className="text-xs bg-black/50 p-3 rounded border border-gray-600">
                        <div className="font-semibold mb-2">Expected Solution:</div>
                        <div className="space-y-1 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
                          <div className="break-all">Source: <span className="text-cyber-green">{currentChallenge.solution.source}</span></div>
                          <div className="break-all">Dest: <span className="text-cyber-green">{currentChallenge.solution.destination}</span></div>
                          <div className="break-all">Service: <span className="text-cyber-green">{currentChallenge.solution.service}</span></div>
                          <div>Action: <span className={currentChallenge.solution.action === 'Allow' ? 'text-green-400' : 'text-red-400'}>{currentChallenge.solution.action}</span></div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={nextChallenge}
                      className={cn(
                        "mt-3 px-4 py-2 font-semibold rounded-xl transition-colors text-sm sm:text-base",
                        isModern ? "bg-white text-black hover:bg-white/90" : "bg-cyber-green text-black hover:bg-cyber-green/80"
                      )}
                    >
                      {gameState.currentChallengeIndex < challenges.length - 1 ? 'Next Ticket' : 'Complete Challenge'}
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Toolbox & Network Map */}
          <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg order-2 lg:order-3" : "bg-black border-cyber-green/30 shadow-lg order-2 lg:order-3")}>
            <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30", "p-4")}>
              <CardTitle className={cn("font-mono flex items-center text-sm sm:text-base", isModern ? "text-foreground" : "text-cyber-green")}>
                🔧 Toolbox & Network Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {/* Network Map */}
              <div className="mb-6">
                <h4 className={cn("text-xs sm:text-sm font-semibold mb-2", isModern ? "text-foreground" : "text-cyber-green")}>Network Assets:</h4>
                <div className="space-y-1">
                  {currentChallenge.assets.map((asset, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-xs font-mono p-2 rounded-xl border break-all",
                        isModern ? "border-white/10 bg-white/[0.03] text-muted-foreground" : "text-gray-300 bg-gray-900 border-gray-700"
                      )}
                    >
                      {asset}
                    </div>
                  ))}
                </div>
              </div>

              {/* Toolbox */}
              <div>
                <h4 className={cn("text-xs sm:text-sm font-semibold mb-3", isModern ? "text-foreground" : "text-cyber-green")}>Drag & Drop Components:</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto terminal-scrollbar">
                  {/* Sources */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Sources:</div>
                    <div className="flex flex-wrap gap-1">
                      {dragItems.filter(item => item.category === 'source').map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          className={cn(
                            "px-2 py-1 text-xs rounded-xl border cursor-grab transition-colors font-mono break-all max-w-full",
                            isModern
                              ? "bg-indigo-500/10 text-indigo-200 border-indigo-500/20 hover:bg-indigo-500/15"
                              : "bg-blue-900/30 text-blue-300 border-blue-500/30 hover:bg-blue-900/50"
                          )}
                          style={{ wordBreak: 'break-word' }}
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
                          className={cn(
                            "px-2 py-1 text-xs rounded-xl border cursor-grab transition-colors font-mono break-all max-w-full",
                            isModern
                              ? "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-500/20 hover:bg-fuchsia-500/15"
                              : "bg-purple-900/30 text-purple-300 border-purple-500/30 hover:bg-purple-900/50"
                          )}
                          style={{ wordBreak: 'break-word' }}
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
                          className={cn(
                            "px-2 py-1 text-xs rounded-xl border cursor-grab transition-colors font-mono break-all max-w-full",
                            isModern
                              ? "bg-amber-500/10 text-amber-200 border-amber-500/20 hover:bg-amber-500/15"
                              : "bg-yellow-900/30 text-yellow-300 border-yellow-500/30 hover:bg-yellow-900/50"
                          )}
                          style={{ wordBreak: 'break-word' }}
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
                          className={cn(
                            "px-2 py-1 text-xs rounded-xl border cursor-grab transition-colors font-mono",
                            item.label === "Allow"
                              ? (isModern ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20 hover:bg-emerald-500/15" : "bg-green-900/30 text-green-300 border-green-500/30 hover:bg-green-900/50")
                              : (isModern ? "bg-red-500/10 text-red-200 border-red-500/20 hover:bg-red-500/15" : "bg-red-900/30 text-red-300 border-red-500/30 hover:bg-red-900/50")
                          )}
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
        {!embedded && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => navigate('/')}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl transition-colors text-sm sm:text-base",
                isModern
                  ? "border border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06]"
                  : "bg-cyber-dark border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
              )}
            >
              ← Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirewallRuleChallenge;