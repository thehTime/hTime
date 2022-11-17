import { getTimezoneOffset } from 'date-fns-tz';
import { fromMinutesToHours, fromMillisecondsToMinutes } from './Conversion';

export function getOffsetInMinutes(timeZoneName: string, utcDate: Date): number {
  return fromMillisecondsToMinutes(getTimezoneOffset(timeZoneName, utcDate))[0];
}

export function getOffsetInMinutesFromSystemDate(date: Date): number {
  return 0 - date.getTimezoneOffset();
}

export function formatOffsetAsIsoString(offsetInMinutes: number): string {
  const [hoursOffset, minutesOffset] = fromMinutesToHours(offsetInMinutes).map(Math.abs);

  return [
    offsetInMinutes >= 0 ? '+' : '-',
    hoursOffset < 10 ? '0' : '',
    hoursOffset,
    minutesOffset < 10 ? '0' : '',
    minutesOffset,
  ].join('');
}
