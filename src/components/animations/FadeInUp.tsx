'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = '' 
}: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

