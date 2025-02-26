'use client';

import { Team } from '@/lib/types/game';
import { Trophy, RefreshCw, Share2, Users } from 'lucide-react';

interface MatchSummaryProps {
  team1: Team;
  team2: Team;
  onRematch: () => void;
  onNewGame: () => void;
}

const MatchSummary = ({ team1, team2, onRematch, onNewGame }: MatchSummaryProps) => {
  const getRunRate = (score: number, overs: number) => {
    return overs > 0 ? (score / overs).toFixed(2) : "0.00";
  };

  const getBoundaries = (team: Team) => {
    // Count boundaries from ball history
    return {
      fours: team.ballHistory?.filter(ball => ball === '4').length || 0,
      sixes: team.ballHistory?.filter(ball => ball === '6').length || 0
    };
  };

  const getKeyMoments = () => {
    const moments = [];
    const team1Boundaries = getBoundaries(team1);
    const team2Boundaries = getBoundaries(team2);

    if (team1Boundaries.sixes > 0) {
      moments.push(`${team1.name} hit ${team1Boundaries.sixes} sixes in their innings`);
    }
    if (team2Boundaries.sixes > 0) {
      moments.push(`${team2.name} hit ${team2Boundaries.sixes} sixes in their innings`);
    }
    
    const team1RR = Number(getRunRate(team1.score, team1.overs));
    const team2RR = Number(getRunRate(team2.score, team2.overs));
    
    if (Math.max(team1RR, team2RR) > 10) {
      moments.push("Explosive batting display with run rate exceeding 10 runs per over");
    }
    if (Math.abs(team1.score - team2.score) < 10) {
      moments.push("Thrilling finish with a close margin!");
    }

    return moments;
  };

  return (
    <div className="space-y-4">
      <div className="bg-emerald-800/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <h2 className="text-yellow-400 font-semibold">Match Summary</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-yellow-400 text-sm mb-2">{team1.name}&apos;s Innings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Score</span>
                <span className="text-white">{team1.score}/{team1.wickets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Overs</span>
                <span className="text-white">{team1.overs.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Run Rate</span>
                <span className="text-white">{getRunRate(team1.score, team1.overs)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Boundaries</span>
                <span className="text-white">
                  4s: {getBoundaries(team1).fours} | 6s: {getBoundaries(team1).sixes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Dot Balls</span>
                <span className="text-white">{team1.ballHistory?.filter(ball => ball === '•').length || 0}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-400 text-sm mb-2">{team2.name}&apos;s Innings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Score</span>
                <span className="text-white">{team2.score}/{team2.wickets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Overs</span>
                <span className="text-white">{team2.overs.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Run Rate</span>
                <span className="text-white">{getRunRate(team2.score, team2.overs)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Boundaries</span>
                <span className="text-white">
                  4s: {getBoundaries(team2).fours} | 6s: {getBoundaries(team2).sixes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Dot Balls</span>
                <span className="text-white">{team2.ballHistory?.filter(ball => ball === '•').length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-emerald-700 pt-4">
          <h3 className="text-yellow-400 text-sm mb-2">Key Moments</h3>
          <ul className="space-y-1">
            {getKeyMoments().map((moment, index) => (
              <li key={index} className="text-xs text-gray-300">• {moment}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-emerald-800/30 rounded-lg p-4 text-center">
        <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
        <h2 className="text-xl text-yellow-400 font-bold mb-1">Game Over!</h2>
        <p className="text-white">
          {team2.score > team1.score 
            ? `${team2.name} won by ${10 - team2.wickets} wickets`
            : `${team1.name} won by ${team1.score - team2.score} runs`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onRematch}
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Rematch</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg transition-colors"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Result</span>
        </button>
      </div>

      <button
        onClick={onNewGame}
        className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg transition-colors"
      >
        <Users className="h-4 w-4" />
        <span>New Game with Different Teams</span>
      </button>
    </div>
  );
};

export default MatchSummary; 