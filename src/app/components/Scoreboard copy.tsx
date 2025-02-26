'use client';

import { GameState } from './BookCricket';
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

  return (
    <div className="bg-[#1B4D3E] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#FFD700]" />
          <span className="text-white text-sm font-semibold">{currentBattingTeam.name}</span>
        </div>
        <div className="text-emerald-200 text-xs">
          {currentBowlingTeam.name} to bowl
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-[#FFD700]">
          {gameState.score[gameState.currentInnings]}/{gameState.wickets[gameState.currentInnings]}
        </div>
        <div className="text-emerald-200 text-sm">
          {gameState.currentOver}.{gameState.currentBall} overs
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs text-emerald-200 mb-1">Match Progress</div>
        <div className="w-full bg-emerald-900/50 h-1.5 rounded-full">
          <div 
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ 
              width: `${((gameState.currentOver * 6 + gameState.currentBall) / (gameState.overs * 6)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
} 