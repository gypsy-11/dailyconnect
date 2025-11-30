import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-charcoal mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-2xl border-2 border-lavender/20 focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/20 transition-all duration-300 ${className}`}
        {...props}
      />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-charcoal mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-2xl border-2 border-lavender/20 focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/20 transition-all duration-300 min-h-[120px] resize-y ${className}`}
        {...props}
      />
    </div>
  );
}
