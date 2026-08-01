import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className = '', hoverGlow = false, glowColor = 'blue', ...props }) {
  return (
    <motion.div
      whileHover={hoverGlow ? { y: -2, transition: { duration: 0.15 } } : {}}
      className={twMerge(
        clsx(
          'saas-card p-6 bg-white border border-slate-200/80 rounded-xl shadow-subtle relative overflow-hidden',
          hoverGlow && 'saas-card-hover hover:border-slate-300',
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
