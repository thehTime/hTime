import { createHTime, HTime } from '../Core/HTime';
import { addMilliseconds } from './Operation';

export type Runner = () => HTime;

export function createRunner(hTime: HTime = createHTime()): Runner {
  const millisecondsWhenCreated = Date.now();

  function getMillisecondsDelta(): number {
    return Date.now() - millisecondsWhenCreated;
  }

  return () => addMilliseconds(hTime, getMillisecondsDelta());
}
