import { addMilliseconds, addDays } from 'src/Util/Operation';
import { createHTime } from 'src/Core/HTime';

let date;

beforeEach(() => {
  date = createHTime({
    dateString: '2022-10-10T12:12:12.000Z',
  });
})

describe('addMilliseconds()', () => {
  test('return new htime with added milliseconds', () => {
    const d0 = addMilliseconds(date, 0);
    const d400 = addMilliseconds(date, 400);
    const dm1200 = addMilliseconds(date, -1200);

    expect(d0.epochMilliseconds).toEqual(date.epochMilliseconds);
    expect(d400.epochMilliseconds).toEqual(date.epochMilliseconds + 400);
    expect(d400.global.millisecond).toEqual(400);
    expect(dm1200.epochMilliseconds).toEqual(date.epochMilliseconds - 1200);
    expect(dm1200.global.second).toEqual(10); // 12 - ~2
    expect(dm1200.global.millisecond).toEqual(800);
  });
});

describe('addDays()', () => {
  test('return new htime with added days', () => {
    const d0 = addDays(date, 0);
    const d10 = addDays(date, 10);
    const dm20 = addDays(date, -20);

    expect(d0.epochMilliseconds).toEqual(date.epochMilliseconds);
    expect(d10.global.day).toEqual(date.global.day + 10);
    expect(d10.global.day).toEqual(20);
    expect(dm20.global.day).toEqual(20);
    expect(dm20.global.month).toEqual(9);
  });
});
