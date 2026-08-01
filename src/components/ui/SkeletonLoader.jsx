import React from 'react';

export function SkeletonLoader({ className = 'h-12 w-full', count = 1 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`bg-dark-700/60 rounded-xl shimmer relative overflow-hidden ${className}`}
        />
      ))}
    </div>
  );
}
