import { getOffsetInMinutes, formatOffsetAsIsoString, getOffsetInMinutesFromSystemDate } from 'src/Core/Offset';

describe('getOffsetInMinutes()', () => {
  const utcDate = new Date('2022-10-10T12:34:56Z');

  test('work with Europe/Berlin', () => {
    expect(getOffsetInMinutes('Europe/Berlin', utcDate)).toEqual(120);
  });

  test('work with PST', () => {
    expect(getOffsetInMinutes('PST', utcDate)).toEqual(-420);
  });

  test('work with +0110', () => {
    expect(getOffsetInMinutes('+0110', utcDate)).toEqual(70);
  });
});

describe('getOffsetInMinutesFromSystemDate()', () => {
  const date = new Date;

  test('extract the offset from system date object', () => {
    expect(getOffsetInMinutesFromSystemDate(date)).toEqual(0 - date.getTimezoneOffset());
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
