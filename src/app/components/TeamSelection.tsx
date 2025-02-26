'use client';

import { useState } from 'react';

interface TeamSelectionProps {
  onStartGame: (team1Name: string, team2Name: string, totalOvers: number) => void;
}

const TeamSelection = ({ onStartGame }: TeamSelectionProps) => {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [overs, setOvers] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(team1Name, team2Name, Number(overs));
  };

  return (
    <div className="bg-emerald-800/50 rounded-lg p-6 w-full max-w-sm mx-auto">
      <p className="text-gray-300 text-sm mb-6">Select teams and overs to start a new game</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-200 mb-2">Team 1</label>
          <select
            required
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            className="w-full bg-emerald-900/50 text-gray-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select team 1</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="England">England</option>
            <option value="Pakistan">Pakistan</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-200 mb-2">Team 2</label>
          <select
            required
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            className="w-full bg-emerald-900/50 text-gray-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select team 2</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
            <option value="England">England</option>
            <option value="Pakistan">Pakistan</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-200 mb-2">Overs</label>
          <select
            value={overs}
            onChange={(e) => setOvers(e.target.value)}
            className="w-full bg-emerald-900/50 text-gray-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="1">1 Over</option>
            <option value="5">5 Overs</option>
            <option value="10">10 Overs</option>
            <option value="20">20 Overs</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default TeamSelection; 