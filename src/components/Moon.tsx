import { useId } from 'react';
import { moonIllumination, moonLitPath, moonPhaseName } from '../lib/moon';

interface MoonProps {
  phase: number;
  size: number;
  className?: string;
}

/** The actual current moon, with a correct terminator. */
export function Moon({ phase, size, className }: MoonProps) {
  const clipId = useId();
  const litPath = moonLitPath(phase, 50, 50, 46);
  const name = moonPhaseName(phase);
  const illum = Math.round(moonIllumination(phase) * 100);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Moon: ${name.en}, ${illum}% illuminated`}
    >
      {/* dark side — a shade deeper than the sheet, so the disc reads at night */}
      <circle cx="50" cy="50" r="46" fill="#2e0b0b" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#c99b3f" strokeOpacity="0.75" />
      {/* lit side — printed gold */}
      <path d={litPath} fill="#e9d6a4" />
      {/* maria/craters, only where lit */}
      <clipPath id={clipId}>
        <path d={litPath} />
      </clipPath>
      <g clipPath={`url(#${clipId})`} fill="#cfb077" opacity="0.85">
        <circle cx="36" cy="34" r="7.5" />
        <circle cx="58" cy="26" r="4.5" />
        <circle cx="66" cy="56" r="9" />
        <circle cx="42" cy="66" r="5.5" />
        <circle cx="55" cy="79" r="3.5" />
        <circle cx="27" cy="52" r="3" />
      </g>
    </svg>
  );
}
