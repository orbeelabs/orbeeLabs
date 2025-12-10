'use client';
import { ReactNode } from 'react';

interface GradientSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'hero' | 'content' | 'cta';
}

export default function GradientSection({ 
  children, 
  className = "", 
  variant = "content" 
}: GradientSectionProps) {
  const baseClasses = "relative bg-gradient-to-br from-background via-card to-background";
  
  const variantClasses = {
    hero: "pt-32 pb-20 overflow-hidden",
    content: "py-20",
    cta: "py-16"
  };

  return (
    <section className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
