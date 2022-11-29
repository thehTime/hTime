import { parseToUtcDate, formatUtcIsoDateStringAsHTimeDateString, formatHTimeDateStringAsUtcIsoDateString, isUtcIsoDateString, isHTimeDateString, createDateString, breakdownDateString } from 'src/Core/Parse';

const correct = [
  // iso | htime | full iso | full htime
  ['2022-10-10T00:34Z', '2022-10-10TA:34H', '2022-10-10T00:34:00.000Z', '2022-10-10TA:34:00.000H'],
  ['2022-10-10T12:34:56Z', '2022-10-10TN:34:56H', '2022-10-10T12:34:56.000Z', '2022-10-10TN:34:56.000H'],
  ['2022-10-10T23:34:56.999Z', '2022-10-10TZ:34:56.999H', '2022-10-10T23:34:56.999Z', '2022-10-10TZ:34:56.999H'],
  ['2022-10-10T12:12:12.000Z', '2022-10-10TN:12:12.000H', '2022-10-10T12:12:12.000Z', '2022-10-10TN:12:12.000H'],
];

const incorrect = [
  '2022-10-10T12:34:0Z',
  '2022-10-10T12:34.00Z',
  '2022-10-10T12:34',
  '2022-13-10T12:34Z',
  '2022-12-10TA:34Z',
  '2022-12-10T12:34H',
  '2022-12-10T25:34Z',
  '2022-10-10T012:12:12.000Z',
];

describe('isUtcIsoDateString()', () => {
  test('check if a string is an iso date string', () => {
    correct.forEach(([isoDateString, htimeDateString, isoFullRepresentation]) => {
      expect(isUtcIsoDateString(isoDateString)).toBe(true);
      expect(isUtcIsoDateString(htimeDateString)).toBe(false);
      expect(isUtcIsoDateString(isoFullRepresentation)).toBe(true);
    });

    incorrect.forEach((incorrectDateString) => {
      expect(isUtcIsoDateString(incorrectDateString)).toBe(false);
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

describe('createDateString()', () => {
  test('convert htime string to iso string', () => {
    expect(createDateString('Z', '2022', '10', '10', 1, '34', 56, 999)).toEqual('2022-10-10T01:34:56.999Z');
    expect(createDateString('H', 2022, 10, 10, 'H', 34, 56, 999)).toEqual('2022-10-10TH:34:56.999H');
    expect(createDateString('H', 2022, 10, 10, 'T', 34, 56)).toEqual('2022-10-10TT:34:56.000H');
    expect(createDateString('H', 2022, 10, 10, 'Z', 34)).toEqual('2022-10-10TZ:34:00.000H');
  });
});

describe('breakdownDateString()', () => {
  test('convert htime string to iso string', () => {
    expect(breakdownDateString('2022-10-10T23:34:56.999Z')).toEqual(['Z', '2022', '10', '10', '23', '34', '56', '999']);
    expect(breakdownDateString('2022-10-10TH:34:56.999H')).toEqual(['H', '2022', '10', '10', 'H', '34', '56', '999']);
    expect(breakdownDateString('2022-10-10TT:34:56H')).toEqual(['H', '2022', '10', '10', 'T', '34', '56', undefined]);
    expect(breakdownDateString('2022-10-10TZ:34H')).toEqual(['H', '2022', '10', '10', 'Z', '34', undefined, undefined]);
  });
});

describe('formatUtcIsoDateStringAsHTimeDateString()', () => {
  test('convert htime string to iso string', () => {
    correct.forEach(([isoDateString, , , htimeFullDateString]) => {
      expect(formatUtcIsoDateStringAsHTimeDateString(isoDateString)).toBe(htimeFullDateString);
    });
  });
});

describe('formatHTimeDateStringAsUtcIsoDateString()', () => {
  test('convert iso string to htime string', () => {
    correct.forEach(([, htimeDateString, isoFullDateString]) => {
      expect(formatHTimeDateStringAsUtcIsoDateString(htimeDateString)).toBe(isoFullDateString);
    });
  });
});

describe('parseToDate()', () => {
  test('parse iso string dates to date', () => {
    correct.forEach(([isoDateString, , isoFullRepresentation]) => {
      expect(parseToUtcDate(isoDateString)).toEqual(new Date(isoFullRepresentation));
    });
  });

  test('parse htime string dates to date', () => {
    correct.forEach(([, htimeDateString, isoFullRepresentation]) => {
      expect(parseToUtcDate(htimeDateString)).toEqual(new Date(isoFullRepresentation));
    });
  });

  test('fail when incorrect date string is passed', () => {
    incorrect.forEach((incorrectDateString) => {
      expect(() => parseToUtcDate(incorrectDateString)).toThrow();
    });
  });
});
