'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  required?: boolean;
  error?: FieldError;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, placeholder, type = 'text', required = false, error, className = '', onChange, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {label} {required && '*'}
        </label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
            error ? 'border-red-500' : 'border-white/20'
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

FormInput.displayName = 'FormInput';

export default FormInput;
