'use client';

import { useState, useRef, useEffect } from 'react';
import { Team, GameState } from '@/lib/types/game';
import { Scoreboard } from './ScoreCard';
import GameControls from './GameControls';
import LiveCommentary from './LiveCommentary';
import TeamSelection from './TeamSelection';
import { MatchSummaryNew } from './MatchSummaryNew';
import GameHistory from './GameHistory';
import { useAuth } from '@/lib/hooks/useAuth';
import { saveGameResult } from '@/lib/firebase/firebaseUtils';

const GameContent = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'history'>('game');
  const { user } = useAuth();
  const [gameState, setGameState] = useState<GameState>({
    team1: {
      id: 'team1',
      name: '',
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: false
    },
    team2: {
      id: 'team2',
      name: '',
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: false
    },
    currentInnings: 0,
    score: [0, 0],
    wickets: [0, 0],
    overs: 1,
    currentOver: 0,
    currentBall: 0,
    ballHistory: [[], []],
    tossWinner: {
      id: '',
      name: '',
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: false
    },
    battingFirst: {
      id: '',
      name: '',
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: true
    },
    bowlingFirst: {
      id: '',
      name: '',
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: false
    },
    totalOvers: 1,
    gameCompleted: false,
    isGameOver: false,
    target: null,
    tossResult: null,
  });

  const handleGameStart = (team1Name: string, team2Name: string, overs: number) => {
    setGameState(prev => {
      const team1 = { ...prev.team1, name: team1Name };
      const team2 = { ...prev.team2, name: team2Name };
      // Randomly decide toss winner
      const tossWinner = Math.random() > 0.5 ? team1 : team2;
      // For simplicity, toss winner always chooses to bat
      const battingFirst = tossWinner;
      const bowlingFirst = tossWinner.id === team1.id ? team2 : team1;
      
      return {
        ...prev,
        team1,
        team2,
        totalOvers: overs,
        tossWinner,
        battingFirst,
        bowlingFirst,
        tossResult: {
          winner: tossWinner.name,
          decision: 'bat'
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-emerald-900">
      <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-4">
          Book Cricket
        </h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('game')}
            className={`px-4 py-2 rounded ${
              activeTab === 'game' ? 'bg-emerald-800' : 'bg-emerald-800/30'
            } text-white`}
          >
            Play Game
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded ${
              activeTab === 'history' ? 'bg-emerald-800' : 'bg-emerald-800/30'
            } text-white`}
          >
            My Games
          </button>
        </div>

        {activeTab === 'game' ? (
          <div className="space-y-4">
            {!gameState.tossWinner ? (
              <TeamSelection onStartGame={handleGameStart} />
            ) : (
              <div className="space-y-4">
                <Scoreboard 
                  gameState={gameState}
                />
              </div>
            )}
          </div>
        ) : (
          <GameHistory />
        )}
      </div>
    </div>
  );
};

export default GameContent; 