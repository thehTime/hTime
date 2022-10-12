import { GlobalHour as GlobalHourType } from './Core/GlobalHour';
import { isIsoUTCDateString, isHTimeDateString, parseToUTCDate } from './Core/Parser';
import { HTime as HTimeType, createHTime } from './Core/HTime';

/**
 * Types
 */
export type HTime = HTimeType;
export type GlobalHour = GlobalHourType;

/**
 * Api
 */
export {
  createHTime,
  isIsoUTCDateString,
  isHTimeDateString,
  parseToUTCDate,
}
