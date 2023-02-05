import * as Constant from './Core/Constant';
import { HTime as HTimeType, createHTime } from './Core/HTime';
import { GlobalHour as GlobalHourType, isPreviousGlobalHour, isNextGlobalHour } from './Core/GlobalHour';
import {
  fromSecondsToMilliseconds,
  fromMinutesToMilliseconds,
  fromHoursToMilliseconds,
  fromDaysToMilliseconds,
  fromWeeksToMilliseconds,
  fromMillisecondsToMinutes,
  fromMinutesToHours
} from './Core/Conversion';
import { isUtcIsoDateString, isHTimeDateString, createDateString, breakdownDateString } from './Core/Parse';
import { createClock } from './Util/Clock';
import { Runner as RunnerType, createRunner } from './Util/Runner';
import {
  addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks,
  subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks
} from './Util/Operation';
import { isBefore, isPast, isAfter, isFuture, isSame } from './Util/Comparison';
import { format } from './Util/Format';

export type HTime = HTimeType;
export type GlobalHour = GlobalHourType;
export type Runner = RunnerType;

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
  isPreviousGlobalHour,
  isNextGlobalHour,
  isUtcIsoDateString,
  isHTimeDateString,
  createDateString,
  breakdownDateString,

  createClock,
  createRunner,
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
  format,
}
