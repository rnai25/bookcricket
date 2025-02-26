import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'outline';
}

export function Badge({ 
  className, 
  variant = 'default',
  ...props 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#FFD700] text-[#1B4D3E]',
    destructive: 'bg-red-500 text-white',
    outline: 'border border-[#A3E4D7] text-[#A3E4D7]'
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
} 