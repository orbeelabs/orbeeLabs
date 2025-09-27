'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInLeftProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeInLeft({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = '' 
}: FadeInLeftProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

