'use client';

import { motion } from 'framer-motion';
import { forwardRef, useId } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  required?: boolean;
  error?: FieldError;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

// Mapeamento de tipos para autocomplete
const getAutocomplete = (type: string, name?: string): string => {
  if (name) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('email')) return 'email';
    if (nameLower.includes('phone') || nameLower.includes('telefone') || nameLower.includes('whatsapp')) return 'tel';
    if (nameLower.includes('name') || nameLower.includes('nome')) return 'name';
    if (nameLower.includes('company') || nameLower.includes('empresa')) return 'organization';
    if (nameLower.includes('website') || nameLower.includes('site') || nameLower.includes('url')) return 'url';
  }
  
  switch (type) {
    case 'email': return 'email';
    case 'tel': return 'tel';
    case 'url': return 'url';
    default: return 'off';
  }
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, placeholder, type = 'text', required = false, error, className = '', onChange, name, ...props }, ref) => {
    const id = useId();
    const autocomplete = getAutocomplete(type, name);
    
    return (
      <div className={className}>
        <label htmlFor={id} className="block text-gray-300 text-sm font-medium mb-2">
          {label} {required && '*'}
        </label>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autocomplete}
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
