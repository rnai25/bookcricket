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

const ScoreCard = ({ team1, team2, target, totalOvers, ballHistory, currentInnings }: ScoreCardProps) => {
  const currentBattingTeam = team1.isBatting ? team1 : team2;

  const getBallStyle = (ball: string | null) => {
    if (!ball) {
      return 'bg-emerald-800/20 border-white/30';
    }
    switch (ball) {
      case 'W':
        return 'bg-red-500 text-white border-white';
      case '6':
        return 'bg-black text-white border-white';
      case '0':
        return 'bg-emerald-800 text-white border-white';
      default:
        return 'bg-emerald-800 text-white border-white';
    }
  };

  // Get only the current innings' balls
  const currentOver = ballHistory[currentInnings] || [];
  const currentOverStartIndex = Math.floor(currentBattingTeam.overs) * 6;
  const currentOverBalls = currentOver.slice(currentOverStartIndex, currentOverStartIndex + 6);
  
  // Create array of 6 balls with actual runs or null for upcoming balls
  const ballsDisplay = Array(6).fill(null).map((_, i) => currentOverBalls[i] || null);

  return (
    <div className="bg-emerald-800/30 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Team 1 */}
        <div className={`rounded-lg p-3 ${team1.isBatting ? 'bg-emerald-900/50' : ''}`}>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">{team1.name}</span>
            {team1.isBatting && (
              <span className="text-xs text-gray-300">batting</span>
            )}
          </div>
          <div className="mt-2">
            <span className="text-4xl font-bold text-yellow-400">
              {team1.score}/{team1.wickets}
            </span>
            <span className="text-sm text-gray-300 ml-2">
              {team1.overs.toFixed(1)} overs
            </span>
          </div>
        </div>

        {/* Team 2 */}
        <div className={`rounded-lg p-3 ${team2.isBatting ? 'bg-emerald-900/50' : ''}`}>
          <div className="flex items-center justify-end gap-2">
            <span className="text-white font-semibold">{team2.name}</span>
            {team2.isBatting && (
              <span className="text-xs text-gray-300">batting</span>
            )}
          </div>
          <div className="mt-2 text-right">
            <span className="text-4xl font-bold text-yellow-400">
              {team2.score}/{team2.wickets}
            </span>
            <span className="text-sm text-gray-300 ml-2">
              {team2.overs.toFixed(1)} overs
            </span>
          </div>
        </div>
      </div>

      {/* Match Progress */}
      <div className="mt-4">
        <div className="text-xs text-gray-300 mb-1">Match Progress</div>
        <div className="relative">
          {/* Progress Bar */}
          <div className="h-0.5 bg-emerald-950 rounded-full">
            <div 
              className="absolute h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentBattingTeam.overs / totalOvers) * 100}%` }}
            />
          </div>

          {/* Ball Results */}
          <div className="absolute -top-4 left-0 right-0 flex justify-center gap-1">
            {ballsDisplay.map((ball, i) => (
              <div 
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center
                  text-sm font-medium border transition-all duration-200
                  ${getBallStyle(ball)}`}
              >
                {ball === '0' ? '•' : ball || ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Info */}
      {target && (
        <div className="mt-8 text-sm text-gray-300">
          <span className="text-yellow-400">{currentBattingTeam.name}</span> needs{' '}
          {target - currentBattingTeam.score} runs from{' '}
          {((totalOvers * 6) - Math.floor(currentBattingTeam.overs * 6))} balls
        </div>
      )}
    </div>
  );
};

export default ScoreCard; 