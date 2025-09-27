'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
}

export default function AnimatedCard({ 
  children, 
  delay = 0, 
  className = '', 
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

