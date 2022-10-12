import { HTime } from '../Core/HTime';
import { getGlobalHours, GlobalHour } from '../Core/GlobalHour';

export function createLocalClock(hTime: HTime): GlobalHour[] {
  return getGlobalHours(hTime.timeZone.offset);
}
