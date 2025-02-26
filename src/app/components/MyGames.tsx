'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Trophy, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface GameRecord {
  id: string;
  date: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  winner: string;
  userId: string;
}

export function MyGames() {
  const { user } = useAuth();
  const [games, setGames] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      if (!user) return;
      
      try {
        console.log('Fetching games for user:', user.uid);
        const gamesRef = collection(db, 'games');
        const q = query(
          gamesRef,
          where('userId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        console.log('Found games:', querySnapshot.size);
        
        const gamesData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          } as GameRecord))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        console.log('Processed games:', gamesData);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#1B4D3E] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <a 
            href="/"
            className="text-emerald-200 hover:text-emerald-100 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </a>
          <h1 className="text-2xl font-bold text-yellow-400">My Games</h1>
        </div>

        {loading ? (
          <div className="text-center text-emerald-200">Loading...</div>
        ) : games.length === 0 ? (
          <div className="text-center text-emerald-200">No games played yet</div>
        ) : (
          <div className="grid gap-4">
            {games.map(game => (
              <div 
                key={game.id}
                className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-yellow-400 font-semibold">
                    {new Date(game.date).toLocaleDateString()}
                  </div>
                  {game.winner && (
                    <div className="flex items-center gap-2 text-emerald-200">
                      <Trophy className="w-4 h-4" />
                      {game.winner}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-emerald-200">
                  <div>
                    <div className="font-semibold">{game.team1}</div>
                    <div>{game.score1}</div>
                  </div>
                  <div>
                    <div className="font-semibold">{game.team2}</div>
                    <div>{game.score2}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 