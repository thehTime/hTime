import * as Constant from './Core/Constant';
import { HTime as HTimeType, createHTime } from './Core/HTime';
import { GlobalHour as GlobalHourType } from './Core/GlobalHour';
import { fromSecondsToMilliseconds, fromHoursToMilliseconds, fromDaysToMilliseconds, fromMillisecondsToMinutes, fromMinutesToHours, fromMinutesToMilliseconds, fromWeeksToMilliseconds } from './Core/Conversion';
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
  Constant,

  fromSecondsToMilliseconds,
  fromMinutesToMilliseconds,
  fromHoursToMilliseconds,
  fromDaysToMilliseconds,
  fromWeeksToMilliseconds,
  fromMillisecondsToMinutes,
  fromMinutesToHours,

  createHTime,
  isUtcIsoDateString,
  isHTimeDateString,
  createDateString,
  breakdownDateString,

  createClock,
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
  isBefore,
  isPast,
  isAfter,
  isFuture,
  isSame,
}
