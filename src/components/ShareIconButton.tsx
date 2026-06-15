import { useState } from 'react';

interface ShareIconButtonProps {
  label: string;
  onShare: () => Promise<void>;
}

/** Small share affordance for section headers. */
export function ShareIconButton({ label, onShare }: ShareIconButtonProps) {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');

  async function handle() {
    if (state === 'busy') return;
    setState('busy');
    try {
      await onShare();
      setState('done');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('idle');
    }
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={label}
      title={label}
      className={`shrink-0 self-center p-1 text-paper/60 transition duration-150 ease-out hover:text-paper active:scale-90 ${
        state === 'busy' ? 'litha-live-dot' : ''
      }`}
    >
      {state === 'done' ? (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 15V4" />
          <path d="M8 7.5L12 3.5l4 4" />
          <path d="M5 12v7.5h14V12" />
        </svg>
      )}
    </button>
  );
}
