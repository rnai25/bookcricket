'use client';

import { Team } from '@/types/game';
import { useState } from 'react';
import { Trophy, Coins } from 'lucide-react';

interface TossScreenProps {
  team1: Team;
  team2: Team;
  onTossComplete: (battingTeam: Team, bowlingTeam: Team) => void;
}

export function TossScreen({ team1, team2, onTossComplete }: TossScreenProps) {
  const [tossWinner, setTossWinner] = useState<Team | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showChoice, setShowChoice] = useState(false);

  const handleToss = () => {
    setIsFlipping(true);
    // Simulate coin flip animation
    setTimeout(() => {
      const winner = Math.random() < 0.5 ? team1 : team2;
      setTossWinner(winner);
      setIsFlipping(false);
      setShowChoice(true);
    }, 1000);
  };

  const handleChoice = (willBat: boolean) => {
    if (!tossWinner) return;
    
    const battingTeam = willBat ? tossWinner : (tossWinner === team1 ? team2 : team1);
    const bowlingTeam = willBat ? (tossWinner === team1 ? team2 : team1) : tossWinner;
    
    onTossComplete(battingTeam, bowlingTeam);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-yellow-400">Toss Time!</h2>
      </div>

      {!tossWinner ? (
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <Coins 
              className={`w-16 h-16 text-yellow-400 ${isFlipping ? 'animate-spin' : ''}`}
            />
          </div>
          <button
            onClick={handleToss}
            disabled={isFlipping}
            className="bg-yellow-500 hover:bg-yellow-400 text-emerald-900 font-bold py-2 px-6 rounded-lg disabled:opacity-50"
          >
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </button>
        </div>
      ) : showChoice ? (
        <div className="space-y-4 text-center">
          <p className="text-lg text-emerald-200">
            {tossWinner} won the toss!
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleChoice(true)}
              className="bg-yellow-500 hover:bg-yellow-400 text-emerald-900 font-bold py-2 px-6 rounded-lg"
            >
              Bat First
            </button>
            <button
              onClick={() => handleChoice(false)}
              className="bg-yellow-500 hover:bg-yellow-400 text-emerald-900 font-bold py-2 px-6 rounded-lg"
            >
              Bowl First
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
} 