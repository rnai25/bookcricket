'use client';

import * as React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-[#1B4D3E] ${className}`}>
      <div
        className="h-full bg-[#FFD700] transition-all duration-200"
        style={{ width: `${value}%` }}
      />
    </div>
  );
} 