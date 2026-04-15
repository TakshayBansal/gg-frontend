export default function GradientText({ className = '', children }) {
  return (
    <span
      className={`bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
