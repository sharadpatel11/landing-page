import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FileSystemNode {
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemNode };
  isMalicious?: boolean;
}

interface GameState {
  currentDirectory: string;
  gameWon: boolean;
  gameLost: boolean;
  timeLeft: number;
  gameStarted: boolean;
  terminalHistory: string[];
}

interface RogueFileHuntProps {
  showHeader?: boolean;
}

const RogueFileHunt = ({ showHeader = true }: RogueFileHuntProps) => {
  const [gameState, setGameState] = useState<GameState>({
    currentDirectory: '~',
    gameWon: false,
    gameLost: false,
    timeLeft: 60,
    gameStarted: false,
    terminalHistory: [
      'System Alert! A suspicious process was detected on this server.',
      'We believe a rogue script was uploaded. You have 60 seconds to find and remove it.',
      'Type "help" to see available commands. Use Tab for autocomplete.',
      ''
    ]
  });
  
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileSystem: { [key: string]: FileSystemNode } = {
    '~': {
      type: 'directory',
      children: {
        'documents': { type: 'directory', children: {} },
        'logs': { type: 'directory', children: {} },
        'readme.txt': { 
          type: 'file', 
          content: 'Welcome, admin. Your mission is to find the malicious file. Start by checking the system logs for unusual activity.' 
        }
      }
    },
    '~/logs': {
      type: 'directory',
      children: {
        'auth.log': { 
          type: 'file', 
          content: '...SUCCESS: User admin login from 192.168.1.5...\n...FAILED: User root login attempt from 10.20.30.40...\n...SUCCESS: User admin file upload temp_data.zip...' 
        },
        'system.log': { 
          type: 'file', 
          content: 'System startup successful. All services running.' 
        }
      }
    },
    '~/documents': {
      type: 'directory',
      children: {
        'project_notes.txt': { 
          type: 'file', 
          content: 'Project Phoenix is on schedule.' 
        },
        'temp_data.zip': {
          type: 'directory',
          children: {
            'note.txt': { 
              type: 'file', 
              content: 'Almost done. Just need to rename and execute the script.' 
            },
            'run_me.sh': { 
              type: 'file', 
              content: '#!/bin/bash\n# This is a suspicious script!\n# It seems to be connecting to an external server.\n# To win, type: rm run_me.sh',
              isMalicious: true 
            }
          }
        }
      }
    },
    '~/documents/temp_data.zip': {
      type: 'directory',
      children: {
        'note.txt': { 
          type: 'file', 
          content: 'Almost done. Just need to rename and execute the script.' 
        },
        'run_me.sh': { 
          type: 'file', 
          content: '#!/bin/bash\n# This is a suspicious script!\n# It seems to be connecting to an external server.\n# To win, type: rm run_me.sh',
          isMalicious: true 
        }
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameWon && !gameState.gameLost && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0 && !gameState.gameWon) {
      setGameState(prev => ({ 
        ...prev, 
        gameLost: true,
        terminalHistory: [...prev.terminalHistory, '', 'SYSTEM ALERT: Time\'s up! The script has executed. System compromised!']
      }));
    }
  }, [gameState.timeLeft, gameState.gameStarted, gameState.gameWon, gameState.gameLost]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [gameState.terminalHistory]);

  // Focus input when game starts or resets
  useEffect(() => {
    if (inputRef.current && !gameState.gameWon && !gameState.gameLost) {
      inputRef.current.focus();
    }
  }, [gameState.gameWon, gameState.gameLost]);

  // Reset game on page reload/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store a flag to indicate the page was refreshed
      sessionStorage.setItem('gameRefreshed', 'true');
    };

    const handleLoad = () => {
      // Check if page was refreshed and reset game if needed
      if (sessionStorage.getItem('gameRefreshed') === 'true') {
        sessionStorage.removeItem('gameRefreshed');
        resetGame();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    // Check on component mount if this is a refresh
    if (performance.navigation.type === 1) { // TYPE_RELOAD
      resetGame();
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const getCurrentDirectoryContents = () => {
    const node = fileSystem[gameState.currentDirectory];
    return node?.children || {};
  };

  const addToHistory = (text: string) => {
    setGameState(prev => ({
      ...prev,
      terminalHistory: [...prev.terminalHistory, text]
    }));
  };

  const getAutocompleteSuggestions = (command: string): string[] => {
  const parts = command.trim().split(' ');
  const cmd = parts[0].toLowerCase();
  
  // Only provide autocomplete for commands that work with files/directories
  if (!['ls', 'cd', 'cat', 'rm'].includes(cmd)) {
    return [];
  }
  
  const currentArg = parts[parts.length - 1] || '';
  const contents = getCurrentDirectoryContents();
  const items = Object.keys(contents);
  
  // Filter items that start with the current argument
  return items.filter(item => 
      item.toLowerCase().startsWith(currentArg.toLowerCase())
    );
  };

  const handleTabCompletion = () => {
    const suggestions = getAutocompleteSuggestions(currentCommand);
    
    if (suggestions.length === 1) {
      // Single match - complete it
      const parts = currentCommand.trim().split(' ');
      if (parts.length === 1) {
        // Just the command, add a space
        setCurrentCommand(currentCommand);
      } else {
        // Replace the last argument
        parts[parts.length - 1] = suggestions[0];
        setCurrentCommand(parts.join(' '));
      }
    } else if (suggestions.length > 1) {
      // Multiple matches - show them
      addToHistory(`admin@server:${gameState.currentDirectory}$ ${currentCommand}`);
      addToHistory(suggestions.join('  '));
      addToHistory('');
      
      // Find common prefix
      const commonPrefix = suggestions.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && 
              prefix[i].toLowerCase() === current[i].toLowerCase()) {
          i++;
        }
        return prefix.substring(0, i);
      });
      
      // Update command with common prefix if it's longer than current
      const parts = currentCommand.trim().split(' ');
      const currentArg = parts[parts.length - 1] || '';
      if (commonPrefix.length > currentArg.length) {
        parts[parts.length - 1] = commonPrefix;
        setCurrentCommand(parts.join(' '));
      }
    } else if (currentCommand.trim().split(' ').length === 1) {
      // No matches, but maybe they're trying to autocomplete a command
      const cmd = currentCommand.toLowerCase();
      const commands = ['help', 'ls', 'cd', 'cat', 'rm'];
      const commandSuggestions = commands.filter(c => c.startsWith(cmd));
      
      if (commandSuggestions.length === 1) {
        setCurrentCommand(commandSuggestions[0] + ' ');
      } else if (commandSuggestions.length > 1) {
        addToHistory(`admin@server:${gameState.currentDirectory}$ ${currentCommand}`);
        addToHistory(commandSuggestions.join('  '));
        addToHistory('');
      }
    }
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    const parts = trimmedCommand.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    addToHistory(`admin@server:${gameState.currentDirectory}$ ${command}`);

    if (!gameState.gameStarted) {
      setGameState(prev => ({ ...prev, gameStarted: true }));
    }

    switch (cmd) {
      case 'help':
        addToHistory('Available commands:');
        addToHistory('  ls          - List files and directories');
        addToHistory('  cd [dir]    - Change directory');
        addToHistory('  cat [file]  - Display file contents');
        addToHistory('  rm [file]   - Remove file');
        addToHistory('  help        - Show this help message');
        addToHistory('');
        addToHistory('Tip: Use Tab for autocomplete!');
        break;

      case 'ls':
        const contents = getCurrentDirectoryContents();
        const items = Object.keys(contents);
        if (items.length === 0) {
          addToHistory('Directory is empty');
        } else {
          items.forEach(item => {
            const node = contents[item];
            const prefix = node.type === 'directory' ? 'd' : '-';
            const color = node.type === 'directory' ? 'text-cyber-blue' : 'text-gray-300';
            addToHistory(`${prefix}rwxr-xr-x 1 admin admin 4096 Dec 20 10:30 ${item}`);
          });
        }
        break;

      case 'cd':
        if (args.length === 0) {
          addToHistory('cd: missing argument');
          break;
        }
        
        let newDir = args[0];
        if (newDir === '..') {
          const pathParts = gameState.currentDirectory.split('/');
          if (pathParts.length > 1) {
            pathParts.pop();
            newDir = pathParts.join('/') || '~';
          } else {
            newDir = '~';
          }
        } else if (newDir === '~') {
          newDir = '~';
        } else if (!newDir.startsWith('~/')) {
          newDir = gameState.currentDirectory === '~' ? `~/${newDir}` : `${gameState.currentDirectory}/${newDir}`;
        }

        if (fileSystem[newDir]) {
          setGameState(prev => ({ ...prev, currentDirectory: newDir }));
        } else {
          addToHistory(`cd: ${args[0]}: No such file or directory`);
        }
        break;

      case 'cat':
        if (args.length === 0) {
          addToHistory('cat: missing argument');
          break;
        }
        
        const contents2 = getCurrentDirectoryContents();
        const file = contents2[args[0]];
        if (file && file.type === 'file') {
          addToHistory(file.content || '');
        } else {
          addToHistory(`cat: ${args[0]}: No such file or directory`);
        }
        break;

      case 'rm':
        if (args.length === 0) {
          addToHistory('rm: missing argument');
          break;
        }
        
        const contents3 = getCurrentDirectoryContents();
        const fileToRemove = contents3[args[0]];
        if (fileToRemove && fileToRemove.type === 'file') {
          if (fileToRemove.isMalicious) {
            setGameState(prev => ({
              ...prev,
              gameWon: true,
              terminalHistory: [...prev.terminalHistory, '', `SYSTEM: Malicious file ${args[0]} removed. System secure. Well done!`, '🎉 Congratulations! You successfully identified and removed the threat!']
            }));
          } else {
            addToHistory(`File ${args[0]} removed`);
          }
        } else {
          addToHistory(`rm: ${args[0]}: No such file or directory`);
        }
        break;

      default:
        addToHistory(`${cmd}: command not found`);
    }
    
    addToHistory('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && currentCommand.trim()) {
    executeCommand(currentCommand);
    setCurrentCommand('');
  } else if (e.key === 'Tab') {
    e.preventDefault(); // Prevent default tab behavior
    handleTabCompletion();
  }
};

  const resetGame = () => {
    setGameState({
      currentDirectory: '~',
      gameWon: false,
      gameLost: false,
      timeLeft: 60,
      gameStarted: false,
      terminalHistory: [
        'System Alert! A suspicious process was detected on this server.',
        'We believe a rogue script was uploaded. You have 60 seconds to find and remove it.',
        'Type "help" to see available commands.',
        ''
      ]
    });
    setCurrentCommand('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 cyber-text">
              The Rogue File Hunt
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Test your cybersecurity skills! Find and remove the malicious file before time runs out.
            </p>
          </div>
        )}

        <Card className="max-w-4xl mx-auto bg-black border-cyber-green/30 shadow-lg glow-effect">
          <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
            <div className="flex justify-between items-center">
              <CardTitle className="text-cyber-green font-mono text-lg">
                Terminal Simulator - Security Challenge
              </CardTitle>
              <div className="flex items-center space-x-4">
                {gameState.gameStarted && !gameState.gameWon && !gameState.gameLost && (
                  <div className="text-cyber-green font-mono">
                    Time: {formatTime(gameState.timeLeft)}
                  </div>
                )}
                {(gameState.gameWon || gameState.gameLost) && (
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-cyber-green text-black font-mono rounded hover:bg-cyber-green/80 transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div 
              ref={terminalRef}
              className="bg-black text-cyber-green font-mono text-sm h-96 overflow-y-auto p-4 terminal-scrollbar cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {gameState.terminalHistory.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
              
              {!gameState.gameWon && !gameState.gameLost && (
                <div className="flex items-center">
                  <span className="text-cyber-green">admin@server:{gameState.currentDirectory}$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleKeyPress}  // Changed from onKeyPress
                    className="flex-1 bg-transparent border-none outline-none text-cyber-green font-mono ml-1"
                    autoFocus
                    disabled={gameState.gameWon || gameState.gameLost}
                  />
                  <span className="text-cyber-green animate-pulse">█</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {gameState.gameWon && (
          <div className="text-center mt-8">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-black border-cyber-green/30 glow-effect">
                <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                  <CardTitle className="text-cyber-green font-mono text-2xl">Mission Accomplished!</CardTitle>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="text-6xl mb-6">🛡️</div>
                  <h2 className="text-3xl font-bold cyber-text mb-4">
                    System Secured!
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    You've demonstrated excellent cybersecurity skills by identifying and removing the malicious file before it could execute.
                  </p>

                  <div className="bg-cyber-dark p-6 rounded-lg border border-cyber-green/30 mb-6">
                    <h3 className="text-cyber-green font-semibold mb-4">🎯 Skills Demonstrated:</h3>
                    <ul className="text-left space-y-2 text-gray-300">
                      <li>• File system navigation and exploration</li>
                      <li>• Log analysis and threat detection</li>
                      <li>• Command line proficiency</li>
                      <li>• Security incident response</li>
                      <li>• Critical thinking under pressure</li>
                    </ul>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-cyber-green text-black font-semibold rounded-lg hover:bg-cyber-green/80 transition-colors"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Back to Portfolio
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            <strong>Tip:</strong> Use Tab for autocomplete! Start by typing "help" or check the logs first.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RogueFileHunt;