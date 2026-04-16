const variants = {
  brand: 'bg-primary-50 text-primary-400 border-primary-200',
  green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  yellow: 'bg-amber-50 text-amber-600 border-amber-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  neutral: 'bg-gray-100 text-surface-600 border-gray-200',
};

export default function Badge({ variant = 'brand', className = '', children }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        text-xs font-semibold border tracking-wide
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
