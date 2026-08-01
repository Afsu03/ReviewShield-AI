import React from 'react';

export function ProgressRing({ percentage = 85, size = 120, strokeWidth = 10, label = "Trust Score", color = "cyan" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    cyan: '#00f0ff',
    purple: '#7000ff',
    rose: '#ff007f',
    emerald: '#00ff9d'
  };

  const strokeColor = colorMap[color] || colorMap.cyan;

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1a233a"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center inset-0">
        <span className="text-2xl font-black text-white tracking-tight">{percentage}%</span>
        {label && <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</span>}
      </div>
    </div>
  );
}
