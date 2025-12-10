'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormSelectProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, required = false, error, className = '', options, placeholder = 'Selecione uma opção', ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {label} {required && '*'}
        </label>
        <select
          ref={ref}
          className={`w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors duration-300 ${
            error ? 'border-red-500' : 'border-gray-600'
          }`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

FormSelect.displayName = 'FormSelect';

export default FormSelect;
