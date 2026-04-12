const variants = {
  brand: 'bg-accent/10 text-accent border-accent/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  neutral: 'bg-surface-600/40 text-surface-300 border-surface-500/30',
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
