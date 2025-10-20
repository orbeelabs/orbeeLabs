'use client';

import { motion } from 'framer-motion';

interface FormBenefitsProps {
  title: string;
  benefits: string[];
  className?: string;
}

export default function FormBenefits({ 
  title, 
  benefits, 
  className = "" 
}: FormBenefitsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`bg-primary/10 border border-primary/30 rounded-lg p-4 ${className}`}
    >
      <h4 className="text-primary font-semibold mb-2">{title}</h4>
      <ul className="text-sm text-gray-300 space-y-1">
        {benefits.map((benefit, index) => (
          <li key={index}>✓ {benefit}</li>
        ))}
      </ul>
    </motion.div>
  );
}
