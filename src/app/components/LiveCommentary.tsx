'use client';

import { useRef, useEffect } from 'react';
import { Team } from '@/lib/types/game';

interface LiveCommentaryProps {
  commentary: string[];
  team1: Team;
  team2: Team;
}

const LiveCommentary = ({ commentary, team1, team2 }: LiveCommentaryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [commentary]);

  const getBattingTeam = () => team1.isBatting ? team1 : team2;
  const getBowlingTeam = () => team1.isBatting ? team2 : team1;

  const getCommentary = (ball: string, over: number, ballInOver: number): string => {
    const battingTeam = getBattingTeam();
    const bowlingTeam = getBowlingTeam();

    switch (ball) {
      case 'W':
        return `🎯 WICKET! ${battingTeam.name}'s batsman has to walk back!`;
      case '6':
        return `💥 MASSIVE SIX! ${battingTeam.name} clears the boundary!`;
      case '4':
        return `🏃 FOUR RUNS! Beautiful shot from ${battingTeam.name}!`;
      case '5':
        return `📢 EXTRAS! Wide ball/No ball + Four from ${battingTeam.name}!`;
      case '3':
        return `🏃 Quick running between the wickets! THREE runs for ${battingTeam.name}!`;
      case '2':
        return `👟 Good running between the wickets! TWO runs for ${battingTeam.name}!`;
      case '1':
        return `✨ Single taken by ${battingTeam.name}!`;
      case '•':
        return `🎯 Dot ball! Good delivery from ${bowlingTeam.name}!`;
      default:
        return `${ball} runs scored by ${battingTeam.name}!`;
    }
  };

  const reversedCommentary = [...commentary].reverse();

  return (
    <div className="bg-emerald-800/30 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-yellow-400 text-xl">Live Commentary</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏏</span>
          <span className="text-gray-200">{getBattingTeam().name}</span>
          <span className="text-gray-400 mx-2">vs</span>
          <span className="text-gray-200">{getBowlingTeam().name}</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="space-y-2 max-h-[200px] overflow-y-auto p-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {reversedCommentary.map((ball, reversedIndex) => {
          const originalIndex = commentary.length - 1 - reversedIndex;
          const over = Math.floor(originalIndex / 6);
          const ballInOver = originalIndex % 6 + 1;
          return (
            <div 
              key={originalIndex} 
              className={`flex items-center gap-2 text-gray-200 p-2 hover:bg-emerald-700/30 rounded ${
                reversedIndex === 0 ? 'animate-highlight' : ''
              }`}
            >
              <div className="bg-emerald-700/50 px-2 py-1 rounded text-sm">
                {over}.{ballInOver}
              </div>
              <div className={`w-8 h-8 flex items-center justify-center rounded ${
                ball === 'W' 
                  ? 'bg-red-400/20' 
                  : ball === '0' 
                    ? 'bg-emerald-700/50'
                    : 'bg-yellow-400/20'
              }`}>
                {ball}
              </div>
              <span>{getCommentary(ball, over, ballInOver)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveCommentary; 