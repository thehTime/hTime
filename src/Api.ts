import { HTime as HTimeType, createHTime } from './HTime';
import { GlobalHour as GlobalHourType } from './GlobalHour';
import { isIsoUTCDateString, isHTimeDateString, parseToUTCDate } from './Parser';
import { createLocalClock } from './Clock';

export type HTime = HTimeType;
export type GlobalHour = GlobalHourType;

export {
  createHTime,
  isIsoUTCDateString,
  isHTimeDateString,
  parseToUTCDate,
  createLocalClock,
}
