'use client';

import { GameState } from '@/lib/types/game';
import { useEffect, useRef } from 'react';

interface CommentaryProps {
  gameState: GameState;
}

export function Commentary({ gameState }: CommentaryProps) {
  const commentaryRef = useRef<HTMLDivElement>(null);
  
  const currentBattingTeam = gameState.currentInnings === 0 
    ? gameState.battingFirst 
    : gameState.bowlingFirst;

  const currentBowlingTeam = gameState.currentInnings === 0
    ? gameState.bowlingFirst
    : gameState.battingFirst;

  // Auto scroll to top when new commentary is added
  useEffect(() => {
    if (commentaryRef.current) {
      commentaryRef.current.scrollTop = 0;
    }
  }, [gameState.ballHistory]);

  const getBallCommentary = (ball: string, index: number) => {
    // Calculate over and ball number
    const over = Math.floor(index / 6);
    const ballInOver = (index % 6) + 1;
    const ballNumber = `${over}.${ballInOver}`;

    if (ball === 'W') {
      return `${ballNumber} - WICKET! ${currentBattingTeam} loses a wicket!`;
    } else if (ball === '6') {
      return `${ballNumber} - SIX! That's gone into the stands!`;
    } else if (ball === '4') {
      return `${ballNumber} - FOUR! Beautiful shot to the boundary!`;
    } else if (ball === '0') {
      return `${ballNumber} - Dot ball. Good bowling from ${currentBowlingTeam}`;
    } else {
      return `${ballNumber} - ${ball} runs taken by ${currentBattingTeam}`;
    }
  };

  return (
    <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4">
      {/* Toss Result - Fixed at top */}
      <div className="text-yellow-400 font-semibold mb-4 pb-3 border-b border-emerald-700/50">
        {gameState.battingFirst.name} won the toss and elected to bat first
      </div>

      {/* Live Commentary Header */}
      <h2 className="text-yellow-400 font-semibold mb-2">Live Commentary</h2>
      
      {/* Scrollable Commentary Section */}
      <div 
        ref={commentaryRef}
        className="text-emerald-200 h-32 overflow-y-auto pr-2 space-y-2 custom-scrollbar"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#065f46 #064e3b'
        }}
      >
        {[...gameState.ballHistory[gameState.currentInnings]]
          .reverse()
          .map((ball, index, array) => (
            <div 
              key={array.length - 1 - index}
              className="py-1 border-b border-emerald-700/30 last:border-0"
            >
              {getBallCommentary(ball, array.length - 1 - index)}
            </div>
          ))}
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #064e3b;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #065f46;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #047857;
        }
      `}</style>
    </div>
  );
}