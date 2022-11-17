import { getGlobalHourFromHour } from 'src/Core/GlobalHour';
import { createHTime, getLocalDateFromUtcDate } from 'src/Core/HTime';
import { getOffsetInMinutesFromSystemDate } from 'src/Core/Offset';
import { parseToUtcDate } from 'src/Core/Parse';

function compareHTimeDateTimeToDate(htimeDateTime, date, expectedHour) {
  expect(htimeDateTime.year).toEqual(date.getUTCFullYear());
  expect(htimeDateTime.month).toEqual(date.getUTCMonth() + 1);
  expect(htimeDateTime.day).toEqual(date.getUTCDate());
  expect(htimeDateTime.hour).toEqual(expectedHour || date.getUTCHours());
  expect(htimeDateTime.minute).toEqual(date.getUTCMinutes());
  expect(htimeDateTime.second).toEqual(date.getUTCSeconds());
  expect(htimeDateTime.millisecond).toEqual(date.getUTCMilliseconds());
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
    expect(createHTime().dateString.utcIso.slice(0, -6)).toEqual(date.toISOString().slice(0, -6));
  });

  test('create an hTime instance using the current date (ISO string comparison)', () => {
    expect(htime.dateString.utcIso).toEqual(date.toISOString());
  });

  test('create an hTime instance with correct utc date', () => {
    compareHTimeDateTimeToDate(htime.utc, date);
  });

  test('create an hTime instance with correct global date', () => {
    compareHTimeDateTimeToDate(htime.global, date, getGlobalHourFromHour(date.getUTCHours()));
  });

  test('create an hTime instance with correct local date', () => {
    const offset = getOffsetInMinutesFromSystemDate(date);
    const localDate = getLocalDateFromUtcDate(date, offset);

    compareHTimeDateTimeToDate(htime.local, localDate);
  });

  test('create an hTime instance set to PST using date strings', () => {
    const dateStrings = ['2022-10-10T12:12:12Z', '2022-10-10TN:12:12H'];

    dateStrings.forEach((dateString) => {
      const timeZone = 'PST';
      const date = parseToUtcDate(dateString)
      const htime = createHTime({
        timeZone,
        dateString,
      });
      const localDate = getLocalDateFromUtcDate(date, htime.timeZone.offset);

      compareHTimeDateTimeToDate(htime.utc, date);
      compareHTimeDateTimeToDate(htime.local, localDate);
      compareHTimeDateTimeToDate(htime.global, date, getGlobalHourFromHour(date.getUTCHours()));
      expect(htime.utc.hour).toEqual(12);
      expect(htime.local.hour).toEqual(5);
      expect(htime.global.hour).toEqual('N');
    });
  });
});
