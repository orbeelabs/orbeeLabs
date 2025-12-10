'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FormFieldProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FormField({ 
  children, 
  delay = 0, 
  className = "" 
}: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
