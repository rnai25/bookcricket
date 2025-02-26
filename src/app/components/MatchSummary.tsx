'use client';

import { GameState } from './BookCricket';
import { Trophy } from 'lucide-react';

interface MatchSummaryProps {
  gameState: GameState;
  onRematch: () => void;
  onNewGame: () => void;
}

export function MatchSummary({ gameState, onRematch, onNewGame }: MatchSummaryProps) {
  // Helper function to get team's innings index
  const getTeamInningsIndex = (team: string) => {
    return team === gameState.battingFirst ? 0 : 1;
  };

  // Calculate winner and margin
  const getMatchResult = () => {
    const team1Index = getTeamInningsIndex(gameState.team1);
    const team2Index = getTeamInningsIndex(gameState.team2);
    const team1Score = gameState.score[team1Index];
    const team2Score = gameState.score[team2Index];
    const team1Wickets = gameState.wickets[team1Index];
    const team2Wickets = gameState.wickets[team2Index];

    if (team1Score > team2Score) {
      const margin = team1Wickets < 10 ? `${10 - team1Wickets} wickets` : `${team1Score - team2Score} runs`;
      return `${gameState.team1} won by ${margin}`;
    } else if (team2Score > team1Score) {
      const margin = team2Wickets < 10 ? `${10 - team2Wickets} wickets` : `${team2Score - team1Score} runs`;
      return `${gameState.team2} won by ${margin}`;
    }
    return 'Match Tied!';
  };

  // Get key moments
  const getKeyMoments = () => {
    const moments = [];
    
    // Add toss result
    moments.push(`${gameState.tossWinner} won the toss and elected to ${gameState.tossWinner === gameState.battingFirst ? 'bat' : 'bowl'} first`);

    // Check for sixes
    const firstInningsSixes = gameState.ballHistory[0].filter(ball => ball === '6').length;
    const secondInningsSixes = gameState.ballHistory[1].filter(ball => ball === '6').length;
    if (firstInningsSixes > 0) {
      moments.push(`${gameState.battingFirst} hit ${firstInningsSixes} sixes in their innings`);
    }
    if (secondInningsSixes > 0) {
      moments.push(`${gameState.bowlingFirst} hit ${secondInningsSixes} sixes in their innings`);
    }

    // Check for high run rate
    const firstInningsRunRate = gameState.score[0] / gameState.overs;
    if (firstInningsRunRate > 10) {
      moments.push(`Explosive batting display with run rate exceeding 10 runs per over`);
    }

    // Check for close finish
    const scoreDiff = Math.abs(gameState.score[0] - gameState.score[1]);
    if (scoreDiff < 10) {
      moments.push(`Thrilling finish with a close margin!`);
    }

    return moments;
  };

  return (
    <div className="space-y-8">
      <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-6">
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-yellow-400">Match Summary</h2>
        </div>

        {/* Innings Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">{gameState.battingFirst}&apos;s Innings</h3>
            <div className="space-y-2 text-emerald-200">
              <p>Score: {gameState.score[0]}/{gameState.wickets[0]}</p>
              <p>Overs: {gameState.overs}.0</p>
              <p>Run Rate: {(gameState.score[0] / gameState.overs).toFixed(2)}</p>
              <p>Boundaries: {`4s: ${gameState.ballHistory[0].filter(ball => ball === '4').length} | 6s: ${gameState.ballHistory[0].filter(ball => ball === '6').length}`}</p>
              <p>Dot Balls: {gameState.ballHistory[0].filter(ball => ball === '0').length}</p>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">{gameState.bowlingFirst}&apos;s Innings</h3>
            <div className="space-y-2 text-emerald-200">
              <p>Score: {gameState.score[1]}/{gameState.wickets[1]}</p>
              <p>Overs: {gameState.overs}.0</p>
              <p>Run Rate: {(gameState.score[1] / gameState.overs).toFixed(2)}</p>
              <p>Boundaries: {`4s: ${gameState.ballHistory[1].filter(ball => ball === '4').length} | 6s: ${gameState.ballHistory[1].filter(ball => ball === '6').length}`}</p>
              <p>Dot Balls: {gameState.ballHistory[1].filter(ball => ball === '0').length}</p>
            </div>
          </div>
        </div>

        {/* Key Moments */}
        <div className="mb-8">
          <h3 className="text-yellow-400 font-semibold mb-4">Key Moments</h3>
          <ul className="space-y-2 text-emerald-200">
            {getKeyMoments().map((moment, index) => (
              <li key={index}>• {moment}</li>
            ))}
          </ul>
        </div>

        {/* Match Result */}
        <div className="text-center border-t border-emerald-700/50 pt-6">
          <div className="text-2xl font-bold text-yellow-400 mb-2">
            Game Over!
          </div>
          <div className="text-emerald-200 text-lg">
            {getMatchResult()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onRematch}
          className="bg-emerald-700 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <span>↺</span> Rematch
        </button>
        <button
          onClick={onNewGame}
          className="bg-emerald-700 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg"
        >
          Share Result
        </button>
      </div>
      
      <button
        onClick={onNewGame}
        className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
      >
        <span>👥</span> New Game with Different Teams
      </button>
    </div>
  );
}

export default MatchSummary;