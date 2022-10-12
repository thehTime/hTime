import { addMinutes } from 'date-fns';
import { GlobalHour, getGlobalHourFromUTCHour } from './GlobalHour';
import { formatOffsetAsIsoString, getOffsetInMinutesFromSystemDate, getOffsetInMinutes } from './Offset';
import { formatIsoUTCDateStringAsHTimeDateString, parseToUTCDate } from './Parser';

interface DateTime<H> {
  readonly year: Readonly<number>;
  readonly month: Readonly<number>;
  readonly day: Readonly<number>;
  readonly hours: Readonly<H>;
  readonly minutes: Readonly<number>;
  readonly seconds: Readonly<number>;
  readonly milliseconds: Readonly<number>;
}

export interface HTImeInstanceOptions {
  dateString?: string;
  timeZone?: string;
}

export interface HTime {
  readonly utc: Readonly<DateTime<number>>;
  readonly local: Readonly<DateTime<number>>;
  readonly global: Readonly<DateTime<GlobalHour>>;
  readonly timeZone: {
    name: Readonly<string>;
    offset: Readonly<number>;
  };
  readonly dateString: {
    UTCIso: Readonly<string>;
    hTime: Readonly<string>;
  };
}

function createDateTime(date: Date): Readonly<DateTime<number>> {
  return Object.freeze({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
    milliseconds: date.getUTCMilliseconds(),
  })
}

function createGlobalDateTime(date: Date): Readonly<DateTime<GlobalHour>> {
  return Object.freeze({
    ...createDateTime(date),
    hours: getGlobalHourFromUTCHour(date.getUTCHours()),
  })
}

export function getLocalDateFromUTCDate(UTCDate: Date, timeZoneOffset: number): Date {
  return addMinutes(UTCDate, timeZoneOffset);
}

export function createHTime(options?: HTImeInstanceOptions): HTime {
  const { dateString, timeZone } = options || {};
  const UTCDate = dateString ? parseToUTCDate(dateString) : new Date;
  const timeZoneName = timeZone || formatOffsetAsIsoString(getOffsetInMinutesFromSystemDate(UTCDate));
  const timeZoneOffset = getOffsetInMinutes(timeZoneName, UTCDate);
  const localDate = getLocalDateFromUTCDate(UTCDate, timeZoneOffset);

  return Object.freeze({
    utc: createDateTime(UTCDate),
    local: createDateTime(localDate),
    global: createGlobalDateTime(UTCDate),

    timeZone: {
      name: timeZoneName,
      offset: timeZoneOffset,
    },

    dateString: {
      UTCIso: UTCDate.toISOString(),
      hTime: formatIsoUTCDateStringAsHTimeDateString(UTCDate.toISOString()),
    },

    toString() {
      return UTCDate.toISOString();
    },
  });
}


