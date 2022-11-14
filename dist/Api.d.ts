import { HTime as HTimeType, createHTime } from '@/Core/HTime';
import { GlobalHour as GlobalHourType } from '@/Core/GlobalHour';
import { isIsoUTCDateString, isHTimeDateString, parseToUTCDate } from '@/Core/Parse';
import { createLocalClock } from '@/Util/Clock';
import { isBefore, isPast, isAfter, isFuture, isSame } from '@/Util/Comparison';
import { addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks } from '@/Util/Operation';
export declare type HTime = HTimeType;
export declare type GlobalHour = GlobalHourType;
export { createHTime, isIsoUTCDateString, isHTimeDateString, parseToUTCDate, createLocalClock, addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks, isBefore, isPast, isAfter, isFuture, isSame, };
