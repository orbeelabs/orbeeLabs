'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BreadcrumbWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function BreadcrumbWrapper({ 
  children, 
  className = ""
}: BreadcrumbWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-20 z-40 bg-card/50 backdrop-blur-sm border-b border-border/50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </div>
    </motion.div>
  );
}
