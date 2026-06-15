export interface City {
  id: string;
  en: string;
  si: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: 'colombo', en: 'Colombo', si: 'කොළඹ', lat: 6.9271, lon: 79.8612 },
  { id: 'kandy', en: 'Kandy', si: 'මහනුවර', lat: 7.2906, lon: 80.6337 },
  { id: 'galle', en: 'Galle', si: 'ගාල්ල', lat: 6.0535, lon: 80.221 },
  { id: 'jaffna', en: 'Jaffna', si: 'යාපනය', lat: 9.6615, lon: 80.0255 },
  { id: 'batticaloa', en: 'Batticaloa', si: 'මඩකලපුව', lat: 7.731, lon: 81.6747 },
];

export const DEFAULT_CITY = CITIES[0];
