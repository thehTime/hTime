import { toDate } from 'date-fns-tz';
import { parseToUTCDate, formatIsoUTCDateStringAsHTimeDateString, formatHTimeDateStringAsIsoUTCDateString, isIsoUTCDateString, isHTimeDateString } from '../../src/Core/Parser';

const correct = [
  // iso | htime | full iso
  ['2022-10-10T00:34Z', '2022-10-10TA:34H', '2022-10-10T00:34:00.000Z'],
  ['2022-10-10T12:34:56Z', '2022-10-10TN:34:56H', '2022-10-10T12:34:56.000Z'],
  ['2022-10-10T23:34:56.999Z', '2022-10-10TZ:34:56.999H', '2022-10-10T23:34:56.999Z'],
  ['2022-10-10T12:12:12.000Z', '2022-10-10TN:12:12.000H', '2022-10-10T12:12:12.000Z'],
];

const incorrect = [
  '2022-10-10T12:34:0Z',
  '2022-10-10T12:34.00Z',
  '2022-10-10T12:34',
  '2022-13-10T12:34Z',
  '2022-12-10TA:34Z',
  '2022-12-10T12:34H',
  '2022-12-10T25:34Z',
];

describe('isIsoUTCDateString()', () => {
  test('check if a string is an iso date string', () => {
    correct.forEach(([isoDateString, htimeDateString, isoFullRepresentation]) => {
      expect(isIsoUTCDateString(isoDateString)).toBe(true);
      expect(isIsoUTCDateString(htimeDateString)).toBe(false);
      expect(isIsoUTCDateString(isoFullRepresentation)).toBe(true);
    });

    incorrect.forEach((incorrectDateString) => {
      expect(isIsoUTCDateString(incorrectDateString)).toBe(false);
    });
  });
});

describe('isHTimeDateString()', () => {
  test('check if a string is an htime date string', () => {
    correct.forEach(([isoDateString, htimeDateString, isoFullRepresentation]) => {
      expect(isHTimeDateString(htimeDateString)).toBe(true);
      expect(isHTimeDateString(isoDateString)).toBe(false);
      expect(isHTimeDateString(isoFullRepresentation)).toBe(false);
    });

    incorrect.forEach((incorrectDateString) => {
      expect(isHTimeDateString(incorrectDateString)).toBe(false);
    });
  });
});

describe('formatIsoUTCDateStringAsHTimeDateString()', () => {
  test('convert htime string to iso string', () => {
    correct.forEach(([isoDateString, htimeDateString]) => {
      expect(formatIsoUTCDateStringAsHTimeDateString(isoDateString)).toBe(htimeDateString);
    });
  });
});

describe('formatHTimeDateStringAsIsoUTCDateString()', () => {
  test('convert iso string to htime string', () => {
    correct.forEach(([isoDateString, htimeDateString]) => {
      expect(formatHTimeDateStringAsIsoUTCDateString(htimeDateString)).toBe(isoDateString);
    });
  });
});

describe('parseToDate()', () => {
  test('parse iso string dates to date', () => {
    correct.forEach(([isoDateString, , isoFullRepresentation]) => {
      expect(parseToUTCDate(isoDateString)).toEqual(toDate(isoFullRepresentation));
    });
  });

  test('parse htime string dates to date', () => {
    correct.forEach(([, htimeDateString, isoFullRepresentation]) => {
      expect(parseToUTCDate(htimeDateString)).toEqual(toDate(isoFullRepresentation));
    });
  });

  test('fail when incorrect date string is passed', () => {
    incorrect.forEach((incorrectDateString) => {
      expect(() => parseToUTCDate(incorrectDateString)).toThrow();
    });
  });
});
