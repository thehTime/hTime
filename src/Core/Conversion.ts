const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;

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
