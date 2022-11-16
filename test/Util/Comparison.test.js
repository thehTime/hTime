import { isBefore, isPast, isAfter, isFuture, isSame } from 'src/Util/Comparison';
import { createHTime } from 'src/Core/HTime';

let before, after, now;

beforeEach(() => {
  before = createHTime({
    dateString: '2000-10-10T12:12:12.000Z',
  });

  after = createHTime({
    dateString: '2100-10-10T12:12:12.000Z',
  });

  now = createHTime();
})

describe('isBefore()', () => {
  test('return ...', () => {
    expect(isBefore(before, after)).toBe(true);
    expect(isBefore(after, before)).toBe(false);
    expect(isBefore(now, now)).toBe(false);
  });
});

describe('isPast()', () => {
  test('return ...', () => {
    expect(isPast(before)).toBe(true);
    expect(isPast(after)).toBe(false);
  });
});

describe('isAfter()', () => {
  test('return ...', () => {
    expect(isAfter(after, before)).toBe(true);
    expect(isAfter(before, after)).toBe(false);
    expect(isAfter(now, now)).toBe(false);
  });
});

describe('isFuture()', () => {
  test('return ...', () => {
    expect(isFuture(after)).toBe(true);
    expect(isFuture(before)).toBe(false);
  });
});

describe('isSame()', () => {
  test('return ...', () => {
    expect(isSame(after, before)).toBe(false);
    expect(isSame(before, after)).toBe(false);
    expect(isSame(now, now)).toBe(true);
  });
});
