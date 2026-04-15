export default function Card({ className = '', children, hover = false, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-lg
        ${hover ? 'hover:bg-surface-100/50 transition-colors cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return <div className={`p-5 pb-0 ${className}`}>{children}</div>;
}

export function CardContent({ className = '', children }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
