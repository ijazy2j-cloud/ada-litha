import { useState } from 'react';
import { CITIES, DEFAULT_CITY, type City } from '../data/cities';

const STORAGE_KEY = 'ada-litha-city';

/** Selected city for Rahu Kalaya and sun times, persisted in localStorage. */
export function useCity(): [City, (id: string) => void] {
  const [city, setCityState] = useState<City>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return CITIES.find((c) => c.id === saved) ?? DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  function setCity(id: string) {
    const next = CITIES.find((c) => c.id === id) ?? DEFAULT_CITY;
    setCityState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next.id);
    } catch {
      // private mode — selection just won't persist
    }
  }

  return [city, setCity];
}
