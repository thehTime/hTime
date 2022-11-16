import { addMinutes } from 'date-fns';
import { GlobalHour, getGlobalHourFromUTCHour } from './GlobalHour';
import { formatOffsetAsIsoString, getOffsetInMinutesFromSystemDate, getOffsetInMinutes } from './Offset';
import { formatIsoUTCDateStringAsHTimeDateString, parseToUTCDate } from './Parse';

interface DateTime<H = number> {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hours: H;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;
}

export interface HTimeInstanceOptions {
  dateString?: string;
  timeZone?: string;
}

export interface HTime {
  readonly utc: Readonly<DateTime>;
  readonly local: Readonly<DateTime>;
  readonly global: Readonly<DateTime<GlobalHour>>;
  readonly epochMilliseconds: number;
  readonly timeZone: {
    readonly name: string;
    readonly offset: number;
  };
  readonly dateString: {
    readonly UTCIso: string;
    readonly hTime: string;
  };
}

function createDateTime(date: Date): Readonly<DateTime> {
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

export function createHTime(options?: HTimeInstanceOptions): HTime {
  const { dateString, timeZone } = options || {};
  const UTCDate = dateString ? parseToUTCDate(dateString) : new Date;
  const timeZoneName = timeZone || formatOffsetAsIsoString(getOffsetInMinutesFromSystemDate(UTCDate));
  const timeZoneOffset = getOffsetInMinutes(timeZoneName, UTCDate);
  const localDate = getLocalDateFromUTCDate(UTCDate, timeZoneOffset);

  return Object.freeze({
    utc: createDateTime(UTCDate),
    local: createDateTime(localDate),
    global: createGlobalDateTime(UTCDate),

    epochMilliseconds: UTCDate.valueOf(),

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
