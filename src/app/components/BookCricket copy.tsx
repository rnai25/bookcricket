'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { GameSetup } from './GameSetup';
import { Scoreboard } from './Scoreboard';
import { Commentary } from './Commentary';
import { GameStats } from './GameStats';
import { Team } from '@/types/game';
import { LogOut } from 'lucide-react';
import { TossScreen } from './TossScreen';

export interface GameState {
  team1: Team;
  team2: Team;
  currentInnings: number;
  score: number[];
  wickets: number[];
  overs: number;
  currentOver: number;
  currentBall: number;
  ballHistory: string[][];
  isGameOver: boolean;
  battingFirst: Team;
  bowlingFirst: Team;
}

function BookCricket() {
  const { user, signOut } = useAuth();
  const [selectedTeams, setSelectedTeams] = useState<{ team1: Team; team2: Team; overs: number } | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleTeamSelection = (team1: Team, team2: Team, overs: number) => {
    setSelectedTeams({ team1, team2, overs });
  };

  const handleTossComplete = (battingTeam: Team, bowlingTeam: Team) => {
    if (!selectedTeams) return;

    setGameState({
      team1: selectedTeams.team1,
      team2: selectedTeams.team2,
      currentInnings: 0,
      score: [0, 0],
      wickets: [0, 0],
      overs: selectedTeams.overs,
      currentOver: 0,
      currentBall: 0,
      ballHistory: [[], []],
      isGameOver: false,
      battingFirst: battingTeam,
      bowlingFirst: bowlingTeam,
    });
  };

  const playBall = () => {
    if (!gameState || gameState.isGameOver) return;

    // Generate random number and get last digit
    const randomNumber = Math.floor(Math.random() * 1000);
    const lastDigit = randomNumber % 10;
    
    // Determine outcome based on last digit
    let outcome;
    if (lastDigit === 0) {
      outcome = 'W'; // Out
    } else if (lastDigit >= 7) {
      outcome = '0'; // Dot ball for 7,8,9
    } else {
      outcome = lastDigit.toString(); // 1,2,3,4,5,6 runs
    }
    
    setGameState(prev => {
      if (!prev) return prev;

      const newBallHistory = [...prev.ballHistory];
      newBallHistory[prev.currentInnings] = [...newBallHistory[prev.currentInnings], outcome];

      const newScore = [...prev.score];
      const newWickets = [...prev.wickets];

      if (outcome === 'W') {
        newWickets[prev.currentInnings]++;
      } else {
        newScore[prev.currentInnings] += parseInt(outcome);
      }

      const newBall = (prev.currentBall + 1) % 6;
      const newOver = newBall === 0 ? prev.currentOver + 1 : prev.currentOver;

      // Check for innings completion
      let newInnings = prev.currentInnings;
      let isGameOver = false;

      if (newWickets[prev.currentInnings] >= 10 || 
          (newOver >= prev.overs && newBall === 0)) {
        if (prev.currentInnings === 0) {
          newInnings = 1;
          // Reset ball and over for second innings
          return {
            ...prev,
            score: newScore,
            wickets: newWickets,
            currentOver: 0,
            currentBall: 0,
            ballHistory: newBallHistory,
            currentInnings: newInnings,
            isGameOver: false
          };
        } else {
          isGameOver = true;
        }
      }

      return {
        ...prev,
        score: newScore,
        wickets: newWickets,
        currentOver: newOver,
        currentBall: newBall,
        ballHistory: newBallHistory,
        currentInnings: newInnings,
        isGameOver
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#1B4D3E] p-4">
      <div className="max-w-7xl mx-auto space-y-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="w-32"> {/* Empty div for spacing */}</div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#FFD700] leading-tight">Book Cricket</h1>
            <p className="text-emerald-200 leading-tight">
              Experience the nostalgia of book cricket in a modern way!
            </p>
          </div>
          
          {user && (
            <div className="flex items-center gap-4 w-32">
              <span className="text-[#A3E4D7] text-sm truncate">
                {user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="text-[#FFD700] hover:text-yellow-300"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Game content */}
        {!selectedTeams ? (
          <GameSetup onStartGame={handleTeamSelection} />
        ) : !gameState ? (
          <TossScreen 
            team1={selectedTeams.team1}
            team2={selectedTeams.team2}
            onTossComplete={handleTossComplete}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Scoreboard gameState={gameState} />
              <div className="text-center">
                <button
                  onClick={playBall}
                  disabled={gameState.isGameOver}
                  className="bg-[#FFD700] text-[#1B4D3E] px-8 py-4 rounded-lg text-xl font-bold 
                           hover:bg-[#F4C430] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Play Ball
                </button>
              </div>
              <GameStats gameState={gameState} />
            </div>
            <div className="md:col-span-1">
              <Commentary gameState={gameState} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCricket; 