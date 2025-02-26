'use client';

import { GameState } from './BookCricket';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Zap } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  return (
    <div className="bg-emerald-800 p-6 rounded-lg">
      <h2 className="text-2xl text-[#FFD700] mb-4">Game Stats</h2>
      <div className="text-emerald-200">
        <p>{`${gameState.team1.name}: ${gameState.score[0]}/${gameState.wickets[0]}`}</p>
        <p>{`${gameState.team2.name}: ${gameState.score[1]}/${gameState.wickets[1]}`}</p>
      </div>
    </div>
  );
} 