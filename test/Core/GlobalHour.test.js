import { getGlobalHourFromHour, getHourFromGlobalHour, getGlobalHours } from 'src/Core/GlobalHour';

describe('getGlobalHourFromHour()', () => {
  test('return correct global hour', () => {
    expect(getGlobalHourFromHour(0)).toEqual('A');
    expect(getGlobalHourFromHour(23)).toEqual('Z');
  });
});

describe('getHourFromGlobalHour()', () => {
  test('return correct hour', () => {
    expect(getHourFromGlobalHour('A')).toEqual(0);
    expect(getHourFromGlobalHour('Z')).toEqual(23);
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
