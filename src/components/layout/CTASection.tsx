'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CTASectionProps {
  children: ReactNode;
  className?: string;
  background?: 'gradient' | 'primary' | 'card';
  padding?: 'sm' | 'md' | 'lg';
}

const backgroundClasses = {
  gradient: 'bg-gradient-to-r from-primary/20 to-yellow-500/20',
  primary: 'bg-primary',
  card: 'bg-card'
};

const paddingClasses = {
  sm: 'py-12',
  md: 'py-20',
  lg: 'py-32'
};

export default function CTASection({ 
  children, 
  className = "",
  background = 'gradient',
  padding = 'md'
}: CTASectionProps) {
  return (
    <section className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
