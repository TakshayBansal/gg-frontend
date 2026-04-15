import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-[#5B6EFF] text-white hover:bg-[#3F51D1] hover:shadow-lg hover:shadow-[#5B6EFF]/15',
  secondary:
    'text-[#475569] hover:text-[#0F172A] border border-gray-200 hover:border-gray-300 bg-transparent',
  ghost:
    'text-[#475569] hover:text-[#0F172A] hover:bg-gray-50',
  danger:
    'bg-red-50 text-red-600 hover:bg-red-100',
  white:
    'bg-white text-[#0F172A] hover:bg-gray-50 border border-gray-200',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-[13px] rounded-[4px] gap-1.5',
  md: 'px-5 py-2 text-sm rounded-[5px] gap-2',
  lg: 'px-6 py-2.5 text-[15px] rounded-[5px] gap-2',
};

const Button = forwardRef(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-semibold
          transition-all duration-150 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
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
