import { getGlobalHourFromUTCHour, getUTCHourFromGlobalHour, getGlobalHours } from '@/Core/GlobalHour';

describe('getGlobalHourFromUTCHour()', () => {
  test('return correct global hour', () => {
    expect(getGlobalHourFromUTCHour(0)).toEqual('A');
    expect(getGlobalHourFromUTCHour(23)).toEqual('Z');
  });
});

describe('getUTCHourFromGlobalHour()', () => {
  test('return correct hour', () => {
    expect(getUTCHourFromGlobalHour('A')).toEqual(0);
    expect(getUTCHourFromGlobalHour('Z')).toEqual(23);
  });
});

describe('getGlobalHours()', () => {
  test('start with A and end Z when no offset is passed (UTC)', () => {
    expect(getGlobalHours()[0]).toEqual('A');
  });

  test('shift clockwise when 120min offset is passed', () => {
    expect(getGlobalHours(120)[0]).toBe('Y');
    expect(getGlobalHours(120)[23]).toBe('X');
  });

  test('shift counter-clockwise when -120min offset is passed', () => {
    expect(getGlobalHours(-120)[0]).toBe('C');
    expect(getGlobalHours(-120)[23]).toBe('B');
  });

  test('shift clockwise when 100min offset is passed', () => {
    expect(getGlobalHours(100)[0]).toBe('Z');
    expect(getGlobalHours(100)[23]).toBe('Y');
  });

  test('shift counter-clockwise when -100min offset is passed', () => {
    expect(getGlobalHours(-100)[0]).toBe('B');
    expect(getGlobalHours(-100)[23]).toBe('A');
  });
});
