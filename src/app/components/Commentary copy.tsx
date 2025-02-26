'use client';

import { GameState } from './BookCricket';

interface CommentaryProps {
  gameState: GameState;
}

export function Commentary({ gameState }: CommentaryProps) {
  const currentInningsHistory = gameState.ballHistory[gameState.currentInnings];
  const battingTeam = gameState.currentInnings === 0 ? gameState.battingFirst : gameState.bowlingFirst;

  const getCommentary = (outcome: string) => {
    switch (outcome) {
      case 'W':
        return 'OUT! The batsman has to walk back to the pavilion!';
      case '6':
        return 'MASSIVE! That\'s gone all the way for a SIX!';
      case '4':
        return 'BEAUTIFUL SHOT! That races away to the boundary for FOUR!';
      case '3':
        return 'Good running between the wickets! That\'s THREE runs!';
      case '2':
        return 'Quick running! They take TWO runs!';
      case '1':
        return 'A single taken, rotating the strike.';
      default:
        return 'Dot ball, no run taken.';
    }
  };

  return (
    <div className="bg-emerald-800/50 p-4 rounded-lg h-[400px] overflow-y-auto">
      <h3 className="text-[#FFD700] font-bold mb-4">Commentary</h3>
      <div className="space-y-2">
        {currentInningsHistory.map((outcome, index) => (
          <div key={index} className="text-emerald-200 border-b border-emerald-700 pb-2">
            <p className="text-sm text-emerald-400">
              Over {Math.floor(index / 6)}.{index % 6}
            </p>
            <p>{getCommentary(outcome)}</p>
          </div>
        )).reverse()}
      </div>
    </div>
  );
} 