'use client';

import { type ReactNode, type MouseEvent, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlowColor = 'blue' | 'teal' | 'violet';

interface GlowEffectProps {
  children: ReactNode;
  color?: GlowColor;
  className?: string;
}

const glowColors: Record<GlowColor, string> = {
  blue: 'rgba(59, 130, 246, 0.15)',
  teal: 'rgba(20, 184, 166, 0.15)',
  violet: 'rgba(139, 92, 246, 0.15)',
};

export function GlowEffect({ children, color = 'blue', className }: GlowEffectProps) {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <div
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          animate={{
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${glowColors[color]}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
