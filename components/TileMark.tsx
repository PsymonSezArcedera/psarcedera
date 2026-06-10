export function TileMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="3" cy="3" r="1.2" fill="currentColor" />
      <circle cx="8" cy="3" r="1.2" fill="currentColor" />
      <circle cx="13" cy="3" r="1.2" fill="currentColor" />
      <circle cx="3" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="13" cy="8" r="1.2" fill="currentColor" />
      <circle cx="3" cy="13" r="1.2" fill="currentColor" />
      <circle cx="8" cy="13" r="1.2" fill="currentColor" />
      <circle cx="13" cy="13" r="1.2" fill="currentColor" />
    </svg>
  );
}
