/** Ruled gold divider with the small diamond motif. */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gold/40" />
      <span className="block h-1 w-1 rotate-45 bg-gold/70" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="block h-1 w-1 rotate-45 bg-gold/70" />
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}
