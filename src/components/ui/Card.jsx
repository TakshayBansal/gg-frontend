export default function Card({ className = '', children, hover = false, glow = false, ...props }) {
  return (
    <div
      className={`
        bg-surface-700/50 border border-surface-600/40 rounded-2xl
        ${hover ? 'hover:bg-surface-700/70 hover:border-accent/15 transition-all duration-300 cursor-pointer' : ''}
        ${glow ? 'shadow-[0_0_30px_rgba(0,217,166,0.04)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = '', children }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
