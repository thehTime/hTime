import { HTime as HTimeType, createHTime } from '@/Core/HTime';
import { GlobalHour as GlobalHourType } from '@/Core/GlobalHour';
import { isIsoUTCDateString, isHTimeDateString, parseToUTCDate } from '@/Core/Parse';
import { createLocalClock } from '@/Util/Clock';
import { isBefore, isPast, isAfter, isFuture, isSame } from '@/Util/Comparison';
import { addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks } from '@/Util/Operation';

export type HTime = HTimeType;
export type GlobalHour = GlobalHourType;

export {
  // core
  createHTime,
  isIsoUTCDateString,
  isHTimeDateString,
  parseToUTCDate,

  // util: clock
  createLocalClock,

  // util: operation
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,

  // util: comparison
  isBefore,
  isPast,
  isAfter,
  isFuture,
  isSame,
}
