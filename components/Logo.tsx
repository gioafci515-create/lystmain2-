export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`} aria-label="Lyst">
      Lyst<span className="logo-dot">.</span>
    </span>
  );
}
