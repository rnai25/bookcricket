'use client';

import { GameState } from './BookCricket';
import { Trophy } from 'lucide-react';
import { Team } from '@/types/game';

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
    if (team === battingFirst) {
      return currentInnings >= 1;  // First batting team has completed if we're in/past second innings
    } else {
      return currentInnings >= 2 || gameState.isGameOver;  // Second team has completed if game is over
    }
  };

  // Helper function to get the batting status text
  const getBattingStatusText = (team: Team) => {
    if (team === battingFirst && currentInnings === 0) return "batting";
    if (team === bowlingFirst && currentInnings === 1) return "batting";
    if (!hasTeamBatted(team)) return "to bat";
    return ""; // Return empty string if team has completed batting
  };

  const currentBattingTeam = gameState.currentInnings === 0 
    ? gameState.battingFirst 
    : gameState.bowlingFirst;

  const currentBowlingTeam = gameState.currentInnings === 0
    ? gameState.bowlingFirst
    : gameState.battingFirst;
    
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
  const progressPercentage = ((gameState.currentOver * 6 + gameState.currentBall) / (gameState.overs * 6)) * 100;

  return (
    <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Batting Team */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">{team1}</span>
          </div>
          
          <div className="text-4xl font-bold text-yellow-400 mb-1">
            {score[team1 === battingFirst ? 0 : 1]}/{wickets[team1 === battingFirst ? 0 : 1]}
          </div>
          
          <div className="text-emerald-200 text-sm mb-4">
            {gameState.currentOver}.{gameState.currentBall} overs
          </div>
          
          <div className="text-emerald-300/60 text-xs">
            {getBattingStatusText(team1)}
          </div>
          
          <div className="w-full bg-emerald-900/80 h-0.5 mt-1 mb-3">
            <div 
              className="bg-emerald-500 h-0.5 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Ball display */}
          {currentOverBalls.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {currentOverBalls.map((ball, index) => {
                // Determine ball display style based on outcome
                let bgColor = "bg-emerald-700";
                let textColor = "text-white";
                
                if (ball === "W") {
                  bgColor = "bg-red-500";
                } else if (ball === "4") {
                  bgColor = "bg-blue-500";
                } else if (ball === "6") {
                  bgColor = "bg-purple-500";
                }
                
                return (
                  <div 
                    key={index} 
                    className={`${bgColor} ${textColor} w-6 h-6 rounded-full flex items-center justify-center text-xs`}
                  >
                    {ball}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Right side - Bowling Team/2nd Innings */}
        <div className="text-right">
          <div className="text-emerald-200 mb-1">
            {team2}
          </div>
          <div className="text-sm text-emerald-300/80 mb-2">
            {getBattingStatusText(team2)}
          </div>
          
          <div className="text-right text-4xl font-bold text-yellow-400">
            {score[team2 === battingFirst ? 0 : 1]}/{wickets[team2 === battingFirst ? 0 : 1]}
          </div>
          
          <div className="text-emerald-200 text-sm">
            {gameState.currentInnings === 1 ? (
              <span>{gameState.overs}.0 overs</span>
            ) : (
              <span>0.0 overs</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}