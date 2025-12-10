'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FormSubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormSubmitButton({ 
  isLoading, 
  children, 
  className = "" 
}: FormSubmitButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
          isLoading
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-yellow-500 hover:shadow-lg hover:scale-105'
        } ${className}`}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="flex items-center justify-center"
          >
            <span className="mr-2">⏳</span>
            Enviando...
          </motion.div>
        ) : (
          children
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Seus dados estão seguros. Não enviamos spam.
      </p>
    </motion.div>
  );
}
