import { fromMinutesToMilliseconds } from './Conversion';
import { GlobalHour, getGlobalHourFromHour } from './GlobalHour';
import { formatOffsetAsIsoString, getOffsetInMinutesFromSystemDate, getOffsetInMinutes } from './Offset';
import { formatUtcIsoDateStringAsHTimeDateString, parseToUtcDate } from './Parse';

interface DateTime<H = number> {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: H;
  readonly minute: number;
  readonly second: number;
  readonly millisecond: number;
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
    readonly utcIso: string;
    readonly hTime: string;
  };
}

function createDateTime(date: Date): Readonly<DateTime> {
  return Object.freeze({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds(),
  })
}

function createGlobalDateTime(date: Date): Readonly<DateTime<GlobalHour>> {
  return Object.freeze({
    ...createDateTime(date),
    hour: getGlobalHourFromHour(date.getUTCHours()),
  })
}

export function getLocalDateFromUtcDate(utcDate: Date, timeZoneOffset: number): Date {
  return new Date(utcDate.valueOf() + fromMinutesToMilliseconds(timeZoneOffset));
}

export function createHTime(options?: HTimeInstanceOptions): HTime {
  const { dateString, timeZone } = options || {};
  const utcDate = dateString ? parseToUtcDate(dateString) : new Date;
  const timeZoneName = timeZone || formatOffsetAsIsoString(getOffsetInMinutesFromSystemDate(utcDate));
  const timeZoneOffset = getOffsetInMinutes(timeZoneName, utcDate);
  const localDate = getLocalDateFromUtcDate(utcDate, timeZoneOffset);

  return Object.freeze({
    utc: createDateTime(utcDate),
    local: createDateTime(localDate),
    global: createGlobalDateTime(utcDate),

    epochMilliseconds: utcDate.valueOf(),

    timeZone: {
      name: timeZoneName,
      offset: timeZoneOffset,
    },

    dateString: {
      utcIso: utcDate.toISOString(),
      hTime: formatUtcIsoDateStringAsHTimeDateString(utcDate.toISOString()),
    },

    toString() {
      return utcDate.toISOString();
    },
  });
}
