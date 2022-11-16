import { HTime } from '../Core/HTime';
import { getGlobalHours, GlobalHour } from '../Core/GlobalHour';

export function createClock(hTime: HTime): GlobalHour[] {
  return getGlobalHours(hTime.timeZone.offset);
}
