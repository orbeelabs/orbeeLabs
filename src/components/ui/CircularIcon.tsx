'use client';
import { ReactNode } from 'react';

interface CircularIconProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'neutral';
  className?: string;
}

export default function CircularIcon({ 
  children, 
  size = 'md', 
  variant = 'primary',
  className = ""
}: CircularIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground',
    secondary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    error: 'bg-red-500/20 text-red-500',
    neutral: 'bg-white/10 text-white'
  };

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full flex items-center justify-center font-bold ${className}`}>
      {children}
    </div>
  );
}
