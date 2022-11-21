import { HTime as HTimeType, createHTime } from './Core/HTime';
import { GlobalHour as GlobalHourType } from './Core/GlobalHour';
import { isUtcIsoDateString, isHTimeDateString, createDateString, breakdownDateString } from './Core/Parse';
import { createClock } from './Util/Clock';
import { isBefore, isPast, isAfter, isFuture, isSame } from './Util/Comparison';
import {
  addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks,
  subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks
} from './Util/Operation';

export type HTime = HTimeType;
export type GlobalHour = GlobalHourType;

export {
  // core
  createHTime,
  isUtcIsoDateString,
  isHTimeDateString,
  createDateString,
  breakdownDateString,

  // util: clock
  createClock,

  // util: operation
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  subMilliseconds,
  subSeconds,
  subMinutes,
  subHours,
  subDays,
  subWeeks,

  // util: comparison
  isBefore,
  isPast,
  isAfter,
  isFuture,
  isSame,
}
