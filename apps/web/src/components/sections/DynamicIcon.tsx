'use client';

import * as icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className, size = 24 }: DynamicIconProps) {
  const Icon = (icons as any)[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}
