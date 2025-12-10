'use client';

import { ReactNode } from 'react';

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'gradient' | 'solid' | 'card';
  padding?: 'sm' | 'md' | 'lg';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const backgroundClasses = {
  gradient: 'bg-gradient-to-br from-card to-background',
  solid: 'bg-background',
  card: 'bg-card'
};

const paddingClasses = {
  sm: 'py-12',
  md: 'py-20',
  lg: 'py-32'
};

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
};

export default function ContentSection({ 
  children, 
  className = "",
  background = 'gradient',
  padding = 'md',
  maxWidth = 'xl'
}: ContentSectionProps) {
  return (
    <section className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
