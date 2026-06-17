import { useState } from 'react';
import {
  computeChart,
  saveChart,
  loadStoredChart,
  clearStoredChart,
  type AstroChart,
  type BirthInput,
} from '../lib/astrology';

/** The stored birth chart plus actions to set, edit and clear it. */
export function useBirthChart() {
  const [chart, setChart] = useState<AstroChart | null>(() => loadStoredChart());

  function submit(input: BirthInput) {
    const computed = computeChart(input);
    saveChart(computed);
    setChart(computed);
  }

  function clear() {
    clearStoredChart();
    setChart(null);
  }

  return { chart, submit, clear };
}
