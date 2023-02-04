import { createHTime, HTime } from '../Core/HTime';
import { addMilliseconds } from './Operation';

export function createRunner(hTime: HTime = createHTime()): () => HTime {
  const millisecondsWhenCreated = Date.now();

  function getMillisecondsDelta(): number {
    return Date.now() - millisecondsWhenCreated;
  }

  return () => addMilliseconds(hTime, getMillisecondsDelta());
}
