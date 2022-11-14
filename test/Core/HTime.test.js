import { getGlobalHourFromUTCHour } from '@/Core/GlobalHour';
import { createHTime, getLocalDateFromUTCDate } from '@/Core/HTime';
import { getOffsetInMinutesFromSystemDate } from '@/Core/Offset';
import { parseToUTCDate } from '@/Core/Parse';

function compareHTimeDateTimeToDate(htimeDateTime, date, expectedHour) {
  expect(htimeDateTime.year).toEqual(date.getUTCFullYear());
  expect(htimeDateTime.month).toEqual(date.getUTCMonth() + 1);
  expect(htimeDateTime.day).toEqual(date.getUTCDate());
  expect(htimeDateTime.hours).toEqual(expectedHour || date.getUTCHours());
  expect(htimeDateTime.minutes).toEqual(date.getUTCMinutes());
  expect(htimeDateTime.seconds).toEqual(date.getUTCSeconds());
  expect(htimeDateTime.milliseconds).toEqual(date.getUTCMilliseconds());
}

describe('createHTime()', () => {
  let date, htime;

  beforeAll(() => {
    date = new Date();
    htime = createHTime({
      dateString: date.toISOString(),
    });
  });

  // this test might fail if run on the edge of a 9th second tick
  test('create an hTime instance that is equal to the current date (ISO string comparison)', () => {
    expect(createHTime().dateString.UTCIso.slice(0, -6)).toEqual(date.toISOString().slice(0, -6));
  });

  test('create an hTime instance using the current date (ISO string comparison)', () => {
    expect(htime.dateString.UTCIso).toEqual(date.toISOString());
  });

  test('create an hTime instance with correct utc date', () => {
    compareHTimeDateTimeToDate(htime.utc, date);
  });

  test('create an hTime instance with correct global date', () => {
    compareHTimeDateTimeToDate(htime.global, date, getGlobalHourFromUTCHour(date.getUTCHours()));
  });

  test('create an hTime instance with correct local date', () => {
    const offset = getOffsetInMinutesFromSystemDate(date);
    const localDate = getLocalDateFromUTCDate(date, offset);

    compareHTimeDateTimeToDate(htime.local, localDate);
  });

  test('create an hTime instance set to PST using date strings', () => {
    const dateStrings = ['2022-10-10T12:12:12Z', '2022-10-10TN:12:12H'];

    dateStrings.forEach((dateString) => {
      const timeZone = 'PST';
      const date = parseToUTCDate(dateString)
      const htime = createHTime({
        timeZone,
        dateString,
      });
      const localDate = getLocalDateFromUTCDate(date, htime.timeZone.offset);

      compareHTimeDateTimeToDate(htime.utc, date);
      compareHTimeDateTimeToDate(htime.local, localDate);
      compareHTimeDateTimeToDate(htime.global, date, getGlobalHourFromUTCHour(date.getUTCHours()));
      expect(htime.utc.hours).toEqual(12);
      expect(htime.local.hours).toEqual(5);
      expect(htime.global.hours).toEqual('N');
    });
  });
});
