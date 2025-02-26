'use client';

import { Team } from '@/lib/types/game';
import { useState } from 'react';

interface GameSetupProps {
  onStartGame: (team1: Team, team2: Team, overs: number) => void;
}

export function GameSetup({ onStartGame }: GameSetupProps) {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [overs, setOvers] = useState(1);

  const teams = [
    'India',
    'Australia',
    'England',
    'South Africa',
    'New Zealand',
    'Pakistan',
    'West Indies',
    'Sri Lanka',
  ];

  const oversOptions = [1, 5, 10, 20, 50];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const team1: Team = {
      id: 'team1',
      name: team1Name,
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: false,
      ballHistory: []
    };

    const team2: Team = {
      id: 'team2',
      name: team2Name,
      score: 0,
      wickets: 0,
      overs: 0,
      isBatting: false,
      ballHistory: []
    };

    onStartGame(team1, team2, overs);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-emerald-800/70 rounded-lg p-6 border border-emerald-700/50">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-yellow-400">🏏</span>
            <h2 className="text-xl font-bold text-[#FFD700]">Book Cricket</h2>
          </div>
          <p className="text-emerald-200 text-sm">
            Select teams and overs to start a new game
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-emerald-200 text-sm mb-1">Team 1</label>
            <select
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              required
              className="w-full bg-emerald-900/30 border border-emerald-700 text-white 
                       rounded-md px-3 py-2 focus:outline-none focus:ring-1 
                       focus:ring-emerald-500 text-sm"
            >
              <option value="">Select team 1</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-emerald-200 text-sm mb-1">Team 2</label>
            <select
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              required
              className="w-full bg-emerald-900/30 border border-emerald-700 text-white 
                       rounded-md px-3 py-2 focus:outline-none focus:ring-1 
                       focus:ring-emerald-500 text-sm"
            >
              <option value="">Select team 2</option>
              {teams.filter(team => team !== team1Name).map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-emerald-200 text-sm mb-1">Overs</label>
            <select
              value={overs}
              onChange={(e) => setOvers(parseInt(e.target.value))}
              required
              className="w-full bg-emerald-900/30 border border-emerald-700 text-white 
                       rounded-md px-3 py-2 focus:outline-none focus:ring-1 
                       focus:ring-emerald-500 text-sm"
            >
              <option value="">Select overs</option>
              {oversOptions.map(over => (
                <option key={over} value={over}>{over} overs</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-[#1B4D3E] py-2 rounded-md 
                     hover:bg-yellow-500 transition-colors font-semibold text-sm mt-4"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}