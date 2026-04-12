export default function GradientText({ className = '', children }) {
  return (
    <span
      className={`bg-gradient-to-r from-accent via-emerald-400 to-teal-300 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
