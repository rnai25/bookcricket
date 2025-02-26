'use client';

import { Team } from '@/lib/types/game';
import { Trophy } from 'lucide-react';

interface ScoreCardProps {
  team1: Team;
  team2: Team;
  target: number | null;
  totalOvers: number;
  ballHistory: string[][];
  currentInnings: number;
}

export function ScoreCard({ 
  team1,
  team2,
  target,
  totalOvers,
  ballHistory,
  currentInnings 
}: ScoreCardProps) {
  const currentBattingTeam = currentInnings === 0 ? team1 : team2;
  const currentBowlingTeam = currentInnings === 0 ? team2 : team1;

  return (
    <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Batting Team */}
        <div className="bg-emerald-900/70 rounded p-3">
          <div className="flex items-center gap-2 text-[#FFD700] font-semibold mb-2">
            <Trophy className="w-4 h-4 text-[#FFD700]" />
            <span>{currentBattingTeam.name}</span>
          </div>
          <div className="text-4xl font-bold text-white">
            {currentBattingTeam.score}/{currentBattingTeam.wickets}
          </div>
          <div className="text-emerald-200 text-sm">
            {currentBattingTeam.overs} overs
          </div>
          <div className="text-emerald-300/60 text-xs mt-2">
            Match Progress
          </div>
          <div className="w-full bg-emerald-900/50 h-1.5 rounded-full mt-1">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${(currentBattingTeam.overs / totalOvers) * 100}%` 
              }}
            />
          </div>
        </div>
        
        {/* Bowling Team */}
        <div className="text-right">
          <div className="text-emerald-200 mb-1">
            {currentBowlingTeam.name}
          </div>
          <div className="text-sm text-emerald-300/80">
            to bowl
          </div>
          
          {target && (
            <>
              <div className="text-right text-4xl font-bold text-[#FFD700] mt-2">
                Target: {target}
              </div>
              <div className="text-emerald-200 text-sm">
                Required Rate: {((target - currentBattingTeam.score) / (totalOvers - currentBattingTeam.overs)).toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}