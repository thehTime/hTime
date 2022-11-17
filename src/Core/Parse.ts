import { getGlobalHourFromHour, getHourFromGlobalHour, GlobalHour } from './GlobalHour';

/**
 * 2022-10-10T12:34Z
 * 2022-10-10T12:34:56Z
 * 2022-10-10T12:34:56.999Z
 */
const REGEX_DATE_UTC_ISO = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?Z$/
const REGEX_HOUR_UTC_ISO = /T([0-9]{2})/;

/**
 * 2022-10-10TA:34H
 * 2022-10-10TA:34:56H
 * 2022-10-10TA:34:56.999H
 */
const REGEX_DATE_HTIME = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]:([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?H$/
const REGEX_HOUR_HTIME = /T([a-zA-Z]{1})/;

export function isUtcIsoDateString(dateString: string): boolean {
  return REGEX_DATE_UTC_ISO.test(dateString);
}

export function isHTimeDateString(dateString: string): boolean {
  return REGEX_DATE_HTIME.test(dateString);
}

export function formatUtcIsoDateStringAsHTimeDateString(utcDateString: string): string {
  const [match] = (utcDateString.match(REGEX_HOUR_UTC_ISO) || []) as string[];
  const isoHour = match.slice(1);
  const globalHour = getGlobalHourFromHour(parseInt(isoHour));
  const [day, time] = utcDateString.split(match);
  const formattedTime = time.replace(/Z$/, 'H');

  return `${day}T${globalHour}${formattedTime}`;
}

export function formatHTimeDateStringAsUtcIsoDateString(hTimeDateString: string): string {
  const [match] = (hTimeDateString.match(REGEX_HOUR_HTIME) || []) as string[];
  const globalHour = match.charAt(1) as GlobalHour;
  const localHour = getHourFromGlobalHour(globalHour);
  const [day, time] = hTimeDateString.split(match);
  const formattedLocalHour = localHour < 10 ? `0${localHour}` : localHour;
  const formattedTime = time.replace(/H$/, 'Z');

  return `${day}T${formattedLocalHour}${formattedTime}`;
}

export function parseToUtcDate(dateString: string): Date {
  if (isUtcIsoDateString(dateString)) {
    return new Date(dateString);
  }

  if (isHTimeDateString(dateString)) {
    return new Date(formatHTimeDateStringAsUtcIsoDateString(dateString));
  }

  throw new Error(`"${dateString}" is an invalid date`);
}
