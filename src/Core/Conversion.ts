import { DAYS_IN_WEEK, HOURS_IN_DAY, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND, MINUTES_IN_HOUR, SECONDS_IN_MINUTE } from './Constant';
import { divideAndFloor, divideRemainder } from './Math';

export function fromSecondsToMilliseconds(seconds: number): number {
  return seconds * MILLISECONDS_IN_SECOND;
}

export function fromMinutesToMilliseconds(minutes: number): number {
  return fromSecondsToMilliseconds(minutes * SECONDS_IN_MINUTE);
}

export function fromHoursToMilliseconds(hours: number): number {
  return fromMinutesToMilliseconds(hours * MINUTES_IN_HOUR);
}

export function fromDaysToMilliseconds(days: number): number {
  return fromHoursToMilliseconds(days * HOURS_IN_DAY);
}

export function fromWeeksToMilliseconds(weeks: number): number {
  return fromDaysToMilliseconds(weeks * DAYS_IN_WEEK);
}

export function fromMillisecondsToMinutes(milliseconds: number): [number, number] {
  return [
    divideAndFloor(milliseconds, MILLISECONDS_IN_MINUTE),
    divideRemainder(milliseconds, MILLISECONDS_IN_MINUTE)
  ]
}

export function fromMinutesToHours(minutes: number): [number, number] {
  return [
    divideAndFloor(minutes, MINUTES_IN_HOUR),
    divideRemainder(minutes, MINUTES_IN_HOUR)
  ]
}
