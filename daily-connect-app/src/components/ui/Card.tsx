import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function Card({ children, className = '', gradient = false }: CardProps) {
  const baseStyles = 'rounded-3xl p-8 shadow-lg transition-all duration-500';
  const bgStyles = gradient
    ? 'bg-gradient-to-br from-lavender/10 via-peach/10 to-mint/10'
    : 'bg-white';

  return (
    <div className={`${baseStyles} ${bgStyles} ${className}`}>
      {children}
    </div>
  );
}
