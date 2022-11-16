import { toDate } from 'date-fns-tz';
import { getJustHoursOffset, getJustMinutesOffset, getOffsetInMinutes, formatOffsetAsIsoString, getOffsetInMinutesFromSystemDate } from 'src/Core/Offset';

describe('getOffsetInMinutes()', () => {
  const UTCDate = toDate('2022-10-10T012:34:56Z');

  test('work with Europe/Berlin', () => {
    expect(getOffsetInMinutes('Europe/Berlin', UTCDate)).toEqual(120);
  });

  test('work with PST', () => {
    expect(getOffsetInMinutes('PST', UTCDate)).toEqual(-420);
  });

  test('work with +0110', () => {
    expect(getOffsetInMinutes('+0110', UTCDate)).toEqual(70);
  });
});

describe('getOffsetInMinutesFromSystemDate()', () => {
  const date = new Date;

  test('extract the offset from system date object', () => {
    expect(getOffsetInMinutesFromSystemDate(date)).toEqual(0 - date.getTimezoneOffset());
  });
});

describe('getJustHoursOffset()', () => {
  test('get just the hours offset from a full timezone offset in minutes', () => {
    expect(getJustHoursOffset(0)).toEqual(0);
    expect(getJustHoursOffset(50)).toEqual(0);
    expect(getJustHoursOffset(-110)).toEqual(-1);
  });
});

describe('getJustMinutesOffset()', () => {
  test('get just the minutes offset from a full timezone offset in minutes', () => {
    expect(getJustMinutesOffset(0)).toEqual(0);
    expect(getJustMinutesOffset(50)).toEqual(50);
    expect(getJustMinutesOffset(-110)).toEqual(-50);
  });
});

describe('formatOffsetAsIsoString()', () => {
  test('format offset to iso standard', () => {
    expect(formatOffsetAsIsoString(0)).toEqual('+0000');
    expect(formatOffsetAsIsoString(30)).toEqual('+0030');
    expect(formatOffsetAsIsoString(60)).toEqual('+0100');
    expect(formatOffsetAsIsoString(-110)).toEqual('-0150');
  });
});
