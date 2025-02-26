'use client';
import { useState, useEffect } from 'react';

interface ControlsProps {
  onFlip: (outcome: string) => void;
  onReset: () => void;
  isGameOver: boolean;
  lastOutcome?: string | null;
}

export function Controls({ onFlip, onReset, isGameOver, lastOutcome }: ControlsProps) {
  const [pageNumber, setPageNumber] = useState<number | null>(null);
  const [showOutcome, setShowOutcome] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showPageDisplay, setShowPageDisplay] = useState(false);

  const getOutcomeFromPageNumber = (page: number): string => {
    // Get the last digit of the page number
    const lastDigit = page % 10;
    
    if (lastDigit === 0) {
      return 'W'; // Out
    } else if (lastDigit >= 7) {
      return '0'; // Dot ball for 7,8,9
    } else {
      return lastDigit.toString(); // 1,2,3,4,5,6 runs
    }
  };

  // Update display when a new outcome occurs
  useEffect(() => {
    if (lastOutcome) {
      // Show animation and page display
      setIsFlipping(true);
      setShowPageDisplay(true);
      
      // Format the outcome text
      if (lastOutcome === 'W') {
        setShowOutcome('OUT!');
      } else if (lastOutcome === '0') {
        setShowOutcome('0 Runs');
      } else {
        setShowOutcome(`${lastOutcome} Runs!`);
      }
      
      // Hide animation after a delay
      setTimeout(() => {
        setIsFlipping(false);
      }, 1000);
    }
  }, [lastOutcome]);

  const handleFlip = () => {
    if (isGameOver) return;
    
    // Reset state if needed
    if (!showPageDisplay) {
      setShowPageDisplay(true);
    }
    
    setIsFlipping(true);
    
    // Generate a random page number
    const newPageNumber = Math.floor(Math.random() * 100) + 1;
    setPageNumber(newPageNumber);
    
    // Calculate the outcome based on the page number's last digit
    const outcome = getOutcomeFromPageNumber(newPageNumber);
    
    // Call onFlip with this outcome
    onFlip(outcome);
  };

  return (
    <div className="bg-emerald-800/70 rounded-lg border border-emerald-700/50 p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">Book Cricket</h2>
      </div>
      
      {/* Page display */}
      <div className="flex justify-center mb-4">
        {showPageDisplay && (
          <div className={`bg-white rounded-lg w-full py-4 flex flex-col items-center justify-center transition-all duration-300 ${isFlipping ? 'scale-95' : 'scale-100'}`}>
            {pageNumber && (
              <>
                <div className="text-4xl font-bold text-emerald-800 mb-2">
                  {pageNumber}
                </div>
                {showOutcome && (
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${showOutcome === 'OUT!' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {showOutcome}
                  </div>
                )}
              </>
            )}
            {!pageNumber && (
              <div className="py-4">
                <span className="text-lg text-emerald-800">Ready to play!</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleFlip}
          disabled={isGameOver}
          className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded flex items-center justify-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm">📖</span>
          <span>Flip</span>
        </button>
        
        <button
          onClick={onReset}
          className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded flex items-center justify-center"
        >
          <span>⟳</span>
        </button>
      </div>
    </div>
  );
}