'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  rows?: number;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, placeholder, required = false, error, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {label} {required && '*'}
        </label>
        <textarea
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300 resize-none ${
            error ? 'border-red-500' : 'border-gray-600'
          }`}
          {...props}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1"
          >
            {error.message}
          </motion.p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
