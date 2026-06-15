import { useEffect, useState } from 'react';
import { getSLTime, type SLTime } from '../lib/slTime';

/** Live Sri Lanka clock, ticking every 30 seconds. */
export function useSLClock(): SLTime {
  const [sl, setSL] = useState<SLTime>(() => getSLTime());

  useEffect(() => {
    const id = setInterval(() => setSL(getSLTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return sl;
}
