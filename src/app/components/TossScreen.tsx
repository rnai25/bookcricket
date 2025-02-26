'use client';

import { Team } from '@/lib/types/game';
import { useState } from 'react';
import { Trophy, Coins } from 'lucide-react';

interface TossScreenProps {
  team1: Team;
  team2: Team;
  onTossComplete: (battingTeam: Team, bowlingTeam: Team) => void;
}

export function TossScreen({ team1, team2, onTossComplete }: TossScreenProps) {
  const [tossWinner, setTossWinner] = useState<Team | null>(null);
  const [decision, setDecision] = useState<'bat' | 'bowl' | null>(null);

  const handleToss = () => {
    // Simulate coin toss
    const winner = Math.random() < 0.5 ? team1 : team2;
    setTossWinner(winner);
  };

  const handleDecision = (choice: 'bat' | 'bowl') => {
    setDecision(choice);
    if (!tossWinner) return;

    const battingTeam = choice === 'bat' ? tossWinner : (tossWinner === team1 ? team2 : team1);
    const bowlingTeam = choice === 'bowl' ? tossWinner : (tossWinner === team1 ? team2 : team1);
    
    onTossComplete(battingTeam, bowlingTeam);
  };

  return (
    <div className="max-w-md mx-auto bg-emerald-900/30 p-6 rounded-lg border border-emerald-700">
      <h2 className="text-2xl text-yellow-400 font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Toss Time
      </h2>

      {!tossWinner ? (
        <div className="text-center">
          <p className="text-emerald-200 mb-4">
            Time for the toss! Click the coin to determine who goes first.
          </p>
          <button
            onClick={handleToss}
            className="bg-yellow-500 hover:bg-yellow-400 text-emerald-900 font-bold py-3 px-6 rounded-lg flex items-center gap-2 mx-auto"
          >
            <Coins className="w-5 h-5" />
            Flip Coin
          </button>
        </div>
      ) : !decision ? (
        <div className="text-center">
          <p className="text-emerald-200 mb-4">
            {tossWinner.name} won the toss!
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleDecision('bat')}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Bat First
            </button>
            <button
              onClick={() => handleDecision('bowl')}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Bowl First
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-emerald-200">
          <p className="mb-2">
            {tossWinner.name} won the toss and chose to {decision} first
          </p>
          <p>Starting the game...</p>
        </div>
      )}
    </div>
  );
} 