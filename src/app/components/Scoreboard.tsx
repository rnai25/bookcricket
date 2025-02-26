'use client';

import { GameState, Team } from '@/lib/types/game';
import { Trophy } from 'lucide-react';

interface ScoreboardProps {
  gameState: GameState;
}

export function Scoreboard({ gameState }: ScoreboardProps) {
  const {
    team1,
    team2,
    currentInnings,
    score,
    wickets,
    overs,
    currentOver,
    currentBall,
    battingFirst,
    bowlingFirst,
  } = gameState;

  // Helper function to determine if a team has completed their innings
  const hasTeamBatted = (team: Team) => {
    if (team.id === battingFirst.id) {
      return currentInnings >= 1;  // First batting team has completed if we're in/past second innings
    } else {
      return currentInnings >= 2 || gameState.isGameOver;  // Second team has completed if game is over
    }
  };

  // Helper function to get the batting status text
  const getBattingStatusText = (team: Team) => {
    if (team.id === battingFirst.id && currentInnings === 0) return "batting";
    if (team.id === bowlingFirst.id && currentInnings === 1) return "batting";
    if (!hasTeamBatted(team)) return "to bat";
    return ""; // Return empty string if team has completed batting
  };

  const currentBattingTeam = currentInnings === 0 ? battingFirst : bowlingFirst;
  const currentBowlingTeam = currentInnings === 0 ? bowlingFirst : battingFirst;
    
  // Get current over balls (for the ball display)
  const getCurrentOverBalls = () => {
    const currentInnings = gameState.currentInnings;
    const history = gameState.ballHistory[currentInnings];
    
    if (history.length === 0) return [];
    
    // Get just the balls from the current over
    const currentOverStartIndex = Math.floor((history.length - 1) / 6) * 6;
    return history.slice(currentOverStartIndex);
  };
  
  const currentOverBalls = getCurrentOverBalls();
  
  // Calculate progress percentage
  const progressPercentage = ((currentOver * 6 + currentBall) / (overs * 6)) * 100;

  return (
    <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Team 1 Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-200">
              {team1.name}
              {team1.id === currentBattingTeam.id && (
                <span className="ml-2 text-xs bg-yellow-500 text-emerald-900 px-2 py-0.5 rounded-full">
                  Batting
                </span>
              )}
            </h3>
            <div className="text-white font-bold">
              {score[team1.id === battingFirst.id ? 0 : 1]}/
              {wickets[team1.id === battingFirst.id ? 0 : 1]}
            </div>
          </div>
        </div>

        {/* Team 2 Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-200">
              {team2.name}
              {team2.id === currentBattingTeam.id && (
                <span className="ml-2 text-xs bg-yellow-500 text-emerald-900 px-2 py-0.5 rounded-full">
                  Batting
                </span>
              )}
            </h3>
            <div className="text-white font-bold">
              {score[team2.id === battingFirst.id ? 0 : 1]}/
              {wickets[team2.id === battingFirst.id ? 0 : 1]}
            </div>
          </div>
        </div>
      </div>

      {/* Current Over Display */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-emerald-200 mb-2">
          <span>Current Over</span>
          <span>{`${currentOver}.${currentBall}`}</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {currentOverBalls.map((ball, index) => (
            <div
              key={index}
              className={`h-8 flex items-center justify-center rounded ${
                ball === 'W' ? 'bg-red-500' : 
                ball === '4' ? 'bg-green-500' :
                ball === '6' ? 'bg-blue-500' :
                'bg-emerald-700'
              } text-white font-bold`}
            >
              {ball}
            </div>
          ))}
          {/* Empty slots for remaining balls in over */}
          {Array.from({ length: 6 - currentOverBalls.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="h-8 bg-emerald-900/30 rounded border border-emerald-700"
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 bg-emerald-900/30 rounded overflow-hidden">
          <div
            className="h-full bg-yellow-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}