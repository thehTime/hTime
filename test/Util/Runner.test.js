import { createRunner } from 'src/Util/Runner';
import { isAfter } from 'src/Util/Comparison';

async function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(() => resolve(), milliseconds));
}

describe('createRunner()', () => {
  test('create a runner that dynamically update the time when called', async () => {
    const runner = createRunner();
    const date = runner();

    await wait(100);
    const date2 = runner();
    expect(isAfter(date2, date)).toBe(true);

    await wait(100);
    const date3 = runner();
    expect(isAfter(date3, date2)).toBe(true);
  });
});
