'use client';

import { GameState, Team } from '@/lib/types/game';
import { Trophy } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  const {
    team1,
    team2,
    score,
    wickets,
    overs,
    currentOver,
    currentBall,
    battingFirst,
    bowlingFirst,
    isGameOver,
  } = gameState;

  // Helper function to get team's innings index
  const getTeamInningsIndex = (team: Team) => {
    return team.id === battingFirst.id ? 0 : 1;
  };

  // Calculate run rates
  const getRunRate = (teamScore: number, teamOvers: number) => {
    if (teamOvers === 0) return 0;
    return Number((teamScore / teamOvers).toFixed(2));
  };

  // Get boundaries count
  const getBoundaries = (team: Team) => {
    const inningsIndex = getTeamInningsIndex(team);
    const inningsHistory = gameState.ballHistory[inningsIndex];
    const fours = inningsHistory.filter(ball => ball === '4').length;
    const sixes = inningsHistory.filter(ball => ball === '6').length;
    return `4s: ${fours} | 6s: ${sixes}`;
  };

  // Get dot balls
  const getDotBalls = (team: Team) => {
    const inningsIndex = getTeamInningsIndex(team);
    const inningsHistory = gameState.ballHistory[inningsIndex];
    return inningsHistory.filter(ball => ball === '0').length;
  };

  // Calculate winner and margin
  const getMatchResult = () => {
    if (!isGameOver) return '';

    const team1Index = getTeamInningsIndex(team1);
    const team2Index = getTeamInningsIndex(team2);
    const team1Score = score[team1Index];
    const team2Score = score[team2Index];
    const team1Wickets = wickets[team1Index];
    const team2Wickets = wickets[team2Index];

    if (team1Score > team2Score) {
      const margin = team1Wickets < 10 ? `${10 - team1Wickets} wickets` : `${team1Score - team2Score} runs`;
      return `${team1.name} won by ${margin}`;
    } else if (team2Score > team1Score) {
      const margin = team2Wickets < 10 ? `${10 - team2Wickets} wickets` : `${team2Score - team1Score} runs`;
      return `${team2.name} won by ${margin}`;
    }
    return 'Match Tied!';
  };

  return (
    <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4">
      <div className="text-center mb-6">
        <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-yellow-400">Match Summary</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* First Innings */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">{battingFirst.name}&apos;s Innings</h3>
          <div className="space-y-2 text-emerald-200">
            <p>Score: {score[0]}/{wickets[0]}</p>
            <p>Overs: {overs}.0</p>
            <p>Run Rate: {getRunRate(score[0], overs)}</p>
            <p>Boundaries: {getBoundaries(battingFirst)}</p>
            <p>Dot Balls: {getDotBalls(battingFirst)}</p>
          </div>
        </div>

        {/* Second Innings */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">{bowlingFirst.name}&apos;s Innings</h3>
          <div className="space-y-2 text-emerald-200">
            <p>Score: {score[1]}/{wickets[1]}</p>
            <p>Overs: {gameState.currentInnings === 1 ? `${currentOver}.${currentBall}` : '0.0'}</p>
            <p>Run Rate: {getRunRate(score[1], currentOver)}</p>
            <p>Boundaries: {getBoundaries(bowlingFirst)}</p>
            <p>Dot Balls: {getDotBalls(bowlingFirst)}</p>
          </div>
        </div>
      </div>

      {isGameOver && (
        <div className="mt-6 text-center">
          <div className="text-xl font-bold text-yellow-400">
            Game Over!
          </div>
          <div className="text-emerald-200 mt-2">
            {getMatchResult()}
          </div>
        </div>
      )}
    </div>
  );
}