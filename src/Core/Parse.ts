import { getGlobalHourFromHour, getHourFromGlobalHour, GlobalHour } from './GlobalHour';

type DateStringType = 'Z' | 'H';
type DateStringParts = [string, string, string, string, string, string, string | undefined, string | undefined];

/**
 * 2022-10-10T12:34Z
 * 2022-10-10T12:34:56Z
 * 2022-10-10T12:34:56.999Z
 */
const REGEX_DATE_UTC_ISO = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?Z$/

/**
 * 2022-10-10TA:34H
 * 2022-10-10TA:34:56H
 * 2022-10-10TA:34:56.999H
 */
const REGEX_DATE_HTIME = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]:([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?H$/

const REGEX_BREAKDOWN = /(\d+)|(?<=T)\w/gi;

function padNumber(number: string | number | undefined, length: number): string {
  return `${number || 0}`.padStart(length, '0');
}

export function isUtcIsoDateString(dateString: string): boolean {
  return REGEX_DATE_UTC_ISO.test(dateString);
}

export function isHTimeDateString(dateString: string): boolean {
  return REGEX_DATE_HTIME.test(dateString);
}

export function createDateString(
  type: DateStringType,
  year: string | number,
  month: string | number,
  day: string | number,
  hour: string | number,
  minute: string | number,
  second: string | number | undefined,
  millisecond: string | number | undefined,
): string {
  return padNumber(year, 2)
    + '-' + padNumber(month, 2)
    + '-' + padNumber(day, 2)
    + 'T' + (type === 'H' ? hour : padNumber(hour, 2))
    + ':' + padNumber(minute, 2)
    + ':' + padNumber(second, 2)
    + '.' + padNumber(millisecond, 3)
    + type;
}

export function breakdownDateString(dateString: string): DateStringParts {
  const type = dateString.charAt(dateString.length - 1) as DateStringType;
  const [year, month, day, hour, minute, second, millisecond] = dateString.match(REGEX_BREAKDOWN) as string[];

  return [type, year, month, day, hour, minute, second, millisecond];
}

export function formatUtcIsoDateStringAsHTimeDateString(utcDateString: string): string {
  const [, year, month, day, hour, minute, second, millisecond] = breakdownDateString(utcDateString);
  const globalHour = getGlobalHourFromHour(parseInt(hour));

  return createDateString('H', year, month, day, globalHour, minute, second, millisecond);
}

export function formatHTimeDateStringAsUtcIsoDateString(hTimeDateString: string): string {
  const [, year, month, day, globalHour, minute, second, millisecond] = breakdownDateString(hTimeDateString);
  const hour = getHourFromGlobalHour(globalHour as GlobalHour);

  return createDateString('Z', year, month, day, hour, minute, second, millisecond);
}

export function parseToUtcDate(dateString: string): Date {
  if (isUtcIsoDateString(dateString)) {
    return new Date(dateString);
  }

  if (isHTimeDateString(dateString)) {
    return new Date(formatHTimeDateStringAsUtcIsoDateString(dateString));
  }

  throw new Error(`[PARSE] "${dateString}" is an invalid date`);
}
