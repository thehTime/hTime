import { getTimezoneOffset } from 'date-fns-tz';

export function getOffsetInMinutes(timeZoneName: string, UTCDate: Date): number {
  const offsetInMilliseconds = getTimezoneOffset(timeZoneName, UTCDate);

  return offsetInMilliseconds / (60 * 1000);
}

export function getOffsetInMinutesFromSystemDate(date: Date): number {
  return 0 - date.getTimezoneOffset();
}

export function getJustHoursOffset(offsetInMinutes: number): number {
  const hoursOffset = offsetInMinutes / 60;
  return offsetInMinutes < 0 ? Math.ceil(hoursOffset) : Math.floor(hoursOffset);
}

export function getJustMinutesOffset(offsetInMinutes: number): number {
  return offsetInMinutes % 60;
}

export function formatOffsetAsIsoString(offsetInMinutes: number): string {
  const hoursOffset = Math.abs(getJustHoursOffset(offsetInMinutes));
  const minutesOffset = Math.abs(getJustMinutesOffset(offsetInMinutes));

  return [
    offsetInMinutes >= 0 ? '+' : '-',
    hoursOffset < 10 ? '0' : '',
    hoursOffset,
    minutesOffset < 10 ? '0' : '',
    minutesOffset,
  ].join('');
}
