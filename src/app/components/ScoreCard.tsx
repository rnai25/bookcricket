'use client';

import { GameState } from '@/lib/types/game';
import { Trophy } from 'lucide-react';

interface ScoreboardProps {
  gameState: GameState;
}

export function Scoreboard({ gameState }: ScoreboardProps) {
  const currentBattingTeam = gameState.currentInnings === 0 
    ? gameState.battingFirst 
    : gameState.bowlingFirst;

  const currentBowlingTeam = gameState.currentInnings === 0
    ? gameState.bowlingFirst
    : gameState.battingFirst;

  const formattedOvers = `${gameState.currentOver}.${gameState.currentBall}`;

  // Get all balls in the current over
  const currentInningsHistory = gameState.ballHistory[gameState.currentInnings];
  const startIndex = gameState.currentOver * 6;
  const currentOverBalls = currentInningsHistory.slice(startIndex, startIndex + 6);
  // Pad with empty slots if over is not complete
  const displayBalls = [...currentOverBalls, ...Array(6 - currentOverBalls.length).fill('')];

  return (
    <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Batting Team */}
        <div className="bg-emerald-900/70 rounded p-3">
          <div className="flex items-center gap-2 text-[#FFD700] font-semibold mb-2">
            <Trophy className="w-4 h-4 text-[#FFD700]" />
            <span>{currentBattingTeam.name} 🏏</span>
          </div>
          <div className="text-4xl font-bold text-white">
            {gameState.score[gameState.currentInnings]}/{gameState.wickets[gameState.currentInnings]}
          </div>
          <div className="text-emerald-200 text-sm">
            {formattedOvers} overs
          </div>
          <div className="text-emerald-300/60 text-xs mt-2">
            Match Progress
          </div>
          <div className="w-full bg-emerald-900/50 h-1.5 rounded-full mt-1 mb-2">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${((gameState.currentOver * 6 + gameState.currentBall) / (gameState.overs * 6)) * 100}%` 
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-emerald-200">
            {displayBalls.map((ball, index) => (
              <span 
                key={index} 
                className={`w-6 h-6 flex items-center justify-center ${
                  ball ? 'bg-emerald-900/50' : 'bg-emerald-900/20'
                } rounded-full`}
              >
                {ball === 'W' ? 'W' : ball}
              </span>
            ))}
          </div>
        </div>
        
        {/* Bowling Team */}
        <div className="text-right">
          <div className="text-emerald-200 mb-1">
            {currentBowlingTeam.name} 🎯
          </div>
          <div className="text-sm text-emerald-300/80">
            Bowling
          </div>
          
          {gameState.currentInnings === 1 && (
            <>
              <div className="text-right text-4xl font-bold text-[#FFD700] mt-2">
                {gameState.score[0]}/{gameState.wickets[0]}
              </div>
              <div className="text-emerald-200 text-sm">
                {gameState.overs}.0 overs
              </div>
            </>
          )}
          {gameState.currentInnings === 0 && (
            <>
              <div className="text-right text-4xl font-bold text-[#FFD700] mt-2">
                To Bat
              </div>
              <div className="text-emerald-200 text-sm">
                Target: TBD
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}