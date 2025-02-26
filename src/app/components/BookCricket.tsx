'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { GameSetup } from './GameSetup';
import { Scoreboard } from './Scoreboard';
import { Commentary } from './Commentary';
import { Controls } from './Controls';
import { GameStats } from './GameStats';
import { MatchSummary } from './MatchSummary';
import { Team } from '@/types/game';
import { LogOut, History } from 'lucide-react';
import { TossScreen } from './TossScreen';
import Link from 'next/link';
import { db } from '@/lib/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

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
  tossWinner: Team;
}

function BookCricket() {
  const { user, signOut } = useAuth();
  const [selectedTeams, setSelectedTeams] = useState<{ team1: Team; team2: Team; overs: number } | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [lastOutcome, setLastOutcome] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  
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
      tossWinner: battingTeam,
    });
    
    // Reset outcome and summary state
    setLastOutcome(null);
    setShowSummary(false);
  };

  const saveGameToFirebase = async (gameState: GameState) => {
    if (!user) return;

    try {
      const team1Index = gameState.team1 === gameState.battingFirst ? 0 : 1;
      const team2Index = gameState.team2 === gameState.battingFirst ? 0 : 1;

      const gameData = {
        userId: user.uid,
        date: new Date().toISOString(),
        team1: gameState.team1,
        team2: gameState.team2,
        score1: `${gameState.score[team1Index]}/${gameState.wickets[team1Index]}`,
        score2: `${gameState.score[team2Index]}/${gameState.wickets[team2Index]}`,
        winner: gameState.score[team1Index] > gameState.score[team2Index] ? gameState.team1 : gameState.team2,
        tossWinner: gameState.tossWinner,
        battingFirst: gameState.battingFirst
      };

      console.log('Saving game data:', gameData); // Debug log
      const docRef = await addDoc(collection(db, 'games'), gameData);
      console.log('Game saved with ID:', docRef.id); // Debug log
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const playBall = (outcome: string) => {
    if (!gameState || gameState.isGameOver) return;
    
    // Set the outcome that was calculated in the Controls component
    setLastOutcome(outcome);
    
    setGameState(prev => {
      if (!prev) return prev;

      const newBallHistory = [...prev.ballHistory];
      newBallHistory[prev.currentInnings] = [...newBallHistory[prev.currentInnings], outcome];

      const newScore = [...prev.score];
      const newWickets = [...prev.wickets];

      if (outcome === 'W') {
        newWickets[prev.currentInnings]++;
      } else {
        // Parse the outcome as an integer to add runs
        // This will correctly add 0 for dot balls and 1-6 for run outcomes
        newScore[prev.currentInnings] += parseInt(outcome || '0');
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
          // Show the match summary when the game is over
          setTimeout(() => setShowSummary(true), 1000);
        }
      }

      // Add this check right after updating the score
      if (newInnings === 1) {
        const battingTeamScore = newScore[1];
        const targetScore = newScore[0];
        
        // End game if chasing team surpasses the target
        if (battingTeamScore > targetScore) {
          isGameOver = true;
          // Calculate result
          const margin = newWickets[1] === 0 ? `${10 - newWickets[1]} wickets` : `${battingTeamScore - targetScore} runs`;
          setLastOutcome(`${newWickets[1]} wickets`);
          setTimeout(() => setShowSummary(true), 1000);
        }
      }

      // Add this check before returning the new state
      if (isGameOver) {
        // Save game data after a short delay to ensure state is updated
        setTimeout(() => {
          saveGameToFirebase({
            ...prev,
            isGameOver: true,
            score: newScore,
            wickets: newWickets,
            currentOver: newOver,
            currentBall: newBall,
            ballHistory: newBallHistory,
            currentInnings: newInnings
          });
        }, 0);
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

  const resetGame = () => {
    setSelectedTeams(null);
    setGameState(null);
    setLastOutcome(null);
    setShowSummary(false);
  };

  const handleRematch = () => {
    if (!gameState) return;
    
    // Swap batting and bowling teams for rematch
    handleTossComplete(gameState.bowlingFirst, gameState.battingFirst);
  };

  return (
    <div className="min-h-screen bg-[#1B4D3E] p-4">
      <div className="max-w-7xl mx-auto space-y-3">
        {user && (
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/my-games"
                className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
              >
                <History className="w-4 h-4" />
                <span className="text-sm">My Games</span>
              </Link>
              <span className="text-emerald-200 text-sm truncate">
                {user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="text-yellow-400 hover:text-yellow-300"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Game content */}
        {!selectedTeams ? (
          <>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-yellow-400 leading-tight">Book Cricket</h1>
              <p className="text-emerald-200 leading-tight">
                Experience the nostalgia of book cricket in a modern way!
              </p>
            </div>
            <GameSetup onStartGame={handleTeamSelection} />
          </>
        ) : !gameState ? (
          <>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-yellow-400 leading-tight">Book Cricket</h1>
              <p className="text-emerald-200 leading-tight">
                Experience the nostalgia of book cricket in a modern way!
              </p>
            </div>
            <TossScreen 
              team1={selectedTeams.team1}
              team2={selectedTeams.team2}
              onTossComplete={handleTossComplete}
            />
          </>
        ) : showSummary ? (
          // Show match summary when the game is over and summary is shown
          <MatchSummary 
            gameState={gameState}
            onRematch={handleRematch}
            onNewGame={resetGame}
          />
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Scorecard area */}
              <div className="lg:col-span-2">
                <Scoreboard gameState={gameState} />
              </div>
              
              {/* Control panel */}
              <div className="lg:col-span-1">
                <Controls 
                  onFlip={playBall}
                  onReset={resetGame}
                  isGameOver={gameState.isGameOver}
                  lastOutcome={lastOutcome}
                />
              </div>
            </div>
            
            {/* Live commentary */}
            <div>
              <Commentary gameState={gameState} />
            </div>
            
            {/* Game stats (only shown when game is in progress) */}
            {!showSummary && gameState.isGameOver && (
              <div className="text-center">
                <button
                  onClick={() => setShowSummary(true)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-emerald-900 font-bold py-2 px-6 rounded-lg mt-4"
                >
                  Show Match Summary
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCricket;