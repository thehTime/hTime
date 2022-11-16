import { createHTime, HTime } from '../Core/HTime';

const COMPARISON_ACCURACY = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
] as const;

type ComparisonAccuracy = typeof COMPARISON_ACCURACY[number];

export function isBefore(date: HTime, comparison: HTime): boolean {
  return date.epochMilliseconds < comparison.epochMilliseconds;
}

export function isAfter(date: HTime, comparison: HTime): boolean {
  return date.epochMilliseconds > comparison.epochMilliseconds;
}

export function isPast(date: HTime): boolean {
  return isBefore(date, createHTime());
}

export function isFuture(date: HTime): boolean {
  return isAfter(date, createHTime());
}

export function isSame(date: HTime, comparison: HTime, accuracy: ComparisonAccuracy = 'millisecond'): boolean {
  if (accuracy === 'millisecond') {
    return date.epochMilliseconds === comparison.epochMilliseconds;
  }

  const props = COMPARISON_ACCURACY.slice(0, COMPARISON_ACCURACY.indexOf(accuracy));

  return props.every((prop: ComparisonAccuracy) => date.global[prop] === comparison.global[prop]);
}
