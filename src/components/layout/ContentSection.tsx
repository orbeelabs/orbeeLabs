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
  // Se className contém pt- ou pb-, separar o padding vertical
  const hasCustomTopPadding = className.includes('pt-');
  const hasCustomBottomPadding = className.includes('pb-');
  
  let paddingClass = paddingClasses[padding];
  if (hasCustomTopPadding && !hasCustomBottomPadding) {
    // Se tem pt- customizado mas não pb-, usar apenas pb- do padding padrão
    paddingClass = paddingClass.replace('py-', 'pb-');
  } else if (hasCustomBottomPadding && !hasCustomTopPadding) {
    // Se tem pb- customizado mas não pt-, usar apenas pt- do padding padrão
    paddingClass = paddingClass.replace('py-', 'pt-');
  } else if (hasCustomTopPadding && hasCustomBottomPadding) {
    // Se tem ambos customizados, não aplicar padding padrão
    paddingClass = '';
  }
  
  return (
    <section className={`${backgroundClasses[background]} ${paddingClass} ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
