import { HTime as HTimeType, createHTime } from './Core/HTime';
import { GlobalHour as GlobalHourType } from './Core/GlobalHour';
import { isIsoUTCDateString, isHTimeDateString, parseToUTCDate } from './Core/Parser';
import { createLocalClock } from './Util/Clock';

// types
export type HTime = HTimeType;
export type GlobalHour = GlobalHourType;

// api
export {
  // core
  createHTime,
  isIsoUTCDateString,
  isHTimeDateString,
  parseToUTCDate,

  // util
  createLocalClock,
}
