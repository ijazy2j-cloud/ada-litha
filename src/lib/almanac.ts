import type { SLTime } from './slTime';
import type { SunTimes } from './solar';
import type { RahuWindow } from './rahu';
import type { PoyaInfo } from './poya';
import type { Proverb } from '../data/proverbs';
import type { Gatha } from '../data/gatha';
import type { City } from '../data/cities';

/** Everything the sheet (and the share image) needs for one day. */
export interface AlmanacData {
  sl: SLTime;
  sun: SunTimes;
  rahu: RahuWindow;
  phase: number;
  poya: PoyaInfo;
  beYear: number;
  proverb: Proverb;
  gatha: Gatha;
  city: City;
}
