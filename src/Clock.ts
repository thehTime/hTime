import { HTime } from './HTime';
import { getGlobalHours, GlobalHour } from './GlobalHour';

export function createLocalClock(hTime: HTime): GlobalHour[] {
  return getGlobalHours(hTime.timeZone.offset);
}
