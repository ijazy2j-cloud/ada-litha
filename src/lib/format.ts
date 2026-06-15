/** "6:01 AM" from minutes since midnight. */
export function formatTime(minutesOfDay: number): string {
  const total = Math.round(minutesOfDay);
  const h24 = Math.floor(total / 60) % 24;
  const m = total % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const ampm = h24 < 12 ? 'AM' : 'PM';
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** "12h 23m" from a duration in minutes. */
export function formatDuration(minutes: number): string {
  const total = Math.round(minutes);
  return `${Math.floor(total / 60)}h ${String(total % 60).padStart(2, '0')}m`;
}

/** "1:44 – 3:17 PM" — drops the first meridiem when both sides share it. */
export function formatTimeRange(startMinutes: number, endMinutes: number): string {
  const start = formatTime(startMinutes);
  const end = formatTime(endMinutes);
  const startSuffix = start.slice(-3);
  return startSuffix === end.slice(-3)
    ? `${start.slice(0, -3)} – ${end}`
    : `${start} – ${end}`;
}

/** "just now" / "35m ago" / "2h ago" / "3d ago" from an ISO timestamp. */
export function formatRelative(iso: string, now: Date = new Date()): string {
  const mins = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60_000));
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (mins < 48 * 60) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / (24 * 60))}d ago`;
}

/** "1h 12m" / "32m" for countdowns. */
export function formatCountdown(minutes: number): string {
  const total = Math.ceil(minutes);
  if (total < 60) return `${total}m`;
  return `${Math.floor(total / 60)}h ${String(total % 60).padStart(2, '0')}m`;
}
