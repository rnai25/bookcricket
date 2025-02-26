'use client';

import { useState } from 'react';

interface GameControlsProps {
  tossCompleted: boolean;
  onToss: () => void;
  onFlip?: (pageNumber: number) => void;
}

const GameControls = ({ tossCompleted, onToss, onFlip }: GameControlsProps) => {
  const [pageNumber, setPageNumber] = useState<number | null>(null);

  const handleFlip = () => {
    // Generate a random page number between 1-300 (typical book pages)
    const newPage = Math.floor(Math.random() * 300) + 1;
    setPageNumber(newPage);
    onFlip?.(newPage);
  };

  const getResult = (number: number) => {
    const lastDigit = number % 10;
    if (lastDigit === 0) return 'Out!';
    if ([2, 4, 6].includes(lastDigit)) return `${lastDigit} Runs!`;
    return 'Dot Ball';
  };

  return (
    <div className="flex flex-col gap-4">
      {!tossCompleted ? (
        <button
          onClick={onToss}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Perform Toss
        </button>
      ) : (
        <div className="grid grid-cols-[1fr,auto] gap-4">
          <div className="bg-emerald-700/50 rounded-lg p-4 flex items-center justify-center">
            <button
              onClick={handleFlip}
              className="flex items-center gap-2 text-white"
            >
              <span className="text-2xl">📖</span>
              <span>Flip</span>
            </button>
          </div>
          
          {pageNumber && (
            <div className="bg-white rounded-lg p-6 text-center w-[150px]">
              <div className="text-6xl font-bold text-emerald-800">
                {pageNumber}
              </div>
              <div className="text-emerald-600 font-medium mt-2">
                {getResult(pageNumber)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameControls; 