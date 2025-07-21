import React from 'react';
import { useNavigate } from 'react-router-dom';
import RogueFileHunt from '@/components/RogueFileHunt';

const RogueFileHuntPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <div className="bg-cyber-darker border-b border-cyber-green/30 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-cyber-green hover:text-white transition-colors font-mono"
          >
            ← Back to Portfolio
          </button>
          <h1 className="text-2xl font-bold cyber-text font-mono">The Rogue File Hunt</h1>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Game Content - Remove the header section from RogueFileHunt since we have our own */}
      <div style={{ paddingTop: 0 }}>
        <RogueFileHunt showHeader={false} />
      </div>
    </div>
  );
};

export default RogueFileHuntPage;