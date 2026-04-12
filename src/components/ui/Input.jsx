import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-surface-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-xl text-sm text-white placeholder-surface-400
          bg-surface-700/50 border border-surface-600/50
          focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10
          transition-all duration-200
          ${error ? 'border-red-500/40 focus:border-red-500/40 focus:ring-red-500/10' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
