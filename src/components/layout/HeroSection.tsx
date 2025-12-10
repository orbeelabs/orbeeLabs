'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'gradient' | 'solid' | 'card';
  padding?: 'sm' | 'md' | 'lg';
}

const backgroundClasses = {
  gradient: 'bg-gradient-to-br from-background via-card to-background',
  solid: 'bg-background',
  card: 'bg-card'
};

const paddingClasses = {
  sm: 'py-12',
  md: 'py-20',
  lg: 'py-32'
};

export default function HeroSection({ 
  children, 
  className = "",
  background = 'gradient',
  padding = 'md'
}: HeroSectionProps) {
  return (
    <section className={`relative ${paddingClasses[padding]} overflow-hidden ${backgroundClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
