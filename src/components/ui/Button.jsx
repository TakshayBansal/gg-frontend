import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-accent text-surface-950 font-bold shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:brightness-110',
  secondary:
    'bg-transparent text-accent border border-accent/30 hover:bg-accent/5 hover:border-accent/50',
  ghost:
    'text-surface-300 hover:text-white hover:bg-white/5',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-2.5 text-sm rounded-lg gap-2',
  lg: 'px-8 py-3.5 text-base rounded-lg gap-2.5',
};

const Button = forwardRef(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-semibold
          transition-all duration-200 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
