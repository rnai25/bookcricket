'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getUserGames } from '@/lib/firebase/firebaseUtils';
import { GameResult } from '@/lib/types/gameHistory';
import { Trophy } from 'lucide-react';

const GameHistory = () => {
  const [games, setGames] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGames = async () => {
      if (!user) return;
      try {
        const userGames = await getUserGames(user.uid);
        setGames(userGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading games...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">Please sign in to view your game history</div>;
  }

  if (games.length === 0) {
    return <div className="text-center py-8">No games played yet</div>;
  }

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <div key={game.id} className="bg-emerald-800/30 rounded-lg p-4">
          <div className="text-sm text-gray-300 mb-2">
            {new Date(game.date).toLocaleDateString()}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Trophy className={`h-5 w-5 ${game.winner === game.team1.name ? 'text-yellow-400' : 'text-gray-400'}`} />
                <span className={game.winner === game.team1.name ? 'text-yellow-400' : 'text-white'}>
                  {game.team1.name}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-yellow-400">
                  {game.team1.score}/{game.team1.wickets}
                </span>
                <span className="text-sm text-gray-300 ml-2">
                  {game.team1.overs.toFixed(1)} overs
                </span>
              </div>
            </div>

            <div className="rounded-lg p-3">
              <div className="flex items-center justify-end gap-2">
                <span className={game.winner === game.team2.name ? 'text-yellow-400' : 'text-white'}>
                  {game.team2.name}
                </span>
                <Trophy className={`h-5 w-5 ${game.winner === game.team2.name ? 'text-yellow-400' : 'text-gray-400'}`} />
              </div>
              <div className="mt-2 text-right">
                <span className="text-2xl font-bold text-yellow-400">
                  {game.team2.score}/{game.team2.wickets}
                </span>
                <span className="text-sm text-gray-300 ml-2">
                  {game.team2.overs.toFixed(1)} overs
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameHistory; 