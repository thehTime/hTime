import { HTime as HTimeType, createHTime } from './Core/HTime';
import { GlobalHour as GlobalHourType } from './Core/GlobalHour';
import { isUtcIsoDateString, isHTimeDateString } from './Core/Parse';
import { createClock } from './Util/Clock';
import { isBefore, isPast, isAfter, isFuture, isSame } from './Util/Comparison';
import { addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks, subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks } from './Util/Operation';
export declare type HTime = HTimeType;
export declare type GlobalHour = GlobalHourType;
export { createHTime, isUtcIsoDateString, isHTimeDateString, createClock, addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks, subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks, isBefore, isPast, isAfter, isFuture, isSame, };
