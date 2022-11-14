import { isBefore, isAfter, isSame } from '@/Util/Comparison';
import { createHTime } from '@/Core/HTime';

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
  test('return new htime with added milliseconds', () => {
    expect(isBefore(before, after)).toBe(true);
    expect(isBefore(after, before)).toBe(false);
    expect(isBefore(now, now)).toBe(false);
  });
});

describe('isAfter()', () => {
  test('return new htime with added milliseconds', () => {
    expect(isAfter(after, before)).toBe(true);
    expect(isAfter(before, after)).toBe(false);
    expect(isAfter(now, now)).toBe(false);
  });
});

describe('isSame()', () => {
  test('return new htime with added milliseconds', () => {
    expect(isSame(after, before)).toBe(false);
    expect(isSame(before, after)).toBe(false);
    expect(isSame(now, now)).toBe(true);
  });
});
