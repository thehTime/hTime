import { toDate } from 'date-fns-tz';
import { getGlobalHourFromUTCHour, getUTCHourFromGlobalHour, GlobalHour } from '@/Core/GlobalHour';

/**
 * 2022-10-10T12:34Z
 * 2022-10-10T12:34:56Z
 * 2022-10-10T12:34:56.999Z
 */
const REGEX_DATE_ISO_UTC = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?Z$/
const REGEX_HOUR_ISO_UTC = /T([0-9]{2})/;

/**
 * 2022-10-10TA:34H
 * 2022-10-10TA:34:56H
 * 2022-10-10TA:34:56.999H
 */
const REGEX_DATE_HTIME = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]:([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?H$/
const REGEX_HOUR_HTIME = /T([a-zA-Z]{1})/;

export function isIsoUTCDateString(dateString: string): boolean {
  return REGEX_DATE_ISO_UTC.test(dateString);
}

export function isHTimeDateString(dateString: string): boolean {
  return REGEX_DATE_HTIME.test(dateString);
}

export function formatIsoUTCDateStringAsHTimeDateString(isoDateString: string): string {
  const [match] = (isoDateString.match(REGEX_HOUR_ISO_UTC) || []) as string[];
  const isoHour = match.slice(1);
  const globalHour = getGlobalHourFromUTCHour(parseInt(isoHour));
  const [day, time] = isoDateString.split(match);
  const formattedTime = time.replace(/Z$/, 'H');

  return `${day}T${globalHour}${formattedTime}`;
}

export function formatHTimeDateStringAsIsoUTCDateString(hTimeDateString: string): string {
  const [match] = (hTimeDateString.match(REGEX_HOUR_HTIME) || []) as string[];
  const globalHour = match.charAt(1) as GlobalHour;
  const localHour = getUTCHourFromGlobalHour(globalHour);
  const [day, time] = hTimeDateString.split(match);
  const formattedLocalHour = localHour < 10 ? `0${localHour}` : localHour;
  const formattedTime = time.replace(/H$/, 'Z');

  return `${day}T${formattedLocalHour}${formattedTime}`;
}

export function parseToUTCDate(dateString: string): Date {
  if (isIsoUTCDateString(dateString)) {
    return toDate(dateString);
  }

  if (isHTimeDateString(dateString)) {
    return parseToUTCDate(formatHTimeDateStringAsIsoUTCDateString(dateString));
  }

  throw new Error(`"${dateString}" is an invalid date`);
}
