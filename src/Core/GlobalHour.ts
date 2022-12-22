import { fromMinutesToHours } from './Conversion';

const GLOBAL_HOURS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
] as const;

export type GlobalHour = typeof GLOBAL_HOURS[number];

export function getGlobalHourFromHour(hour: number): GlobalHour {
  return GLOBAL_HOURS[hour];
}

export function getHourFromGlobalHour(globalHour: GlobalHour): number {
  return GLOBAL_HOURS.indexOf(globalHour);
}

export function getGlobalHours(offsetInMinutes: number = 0): GlobalHour[] {
  const [hoursOffset] = fromMinutesToHours(offsetInMinutes);

  return [
    ...GLOBAL_HOURS.slice(-hoursOffset),
    ...GLOBAL_HOURS.slice(0, -hoursOffset),
  ]
}

export function isPreviousGlobalHour(targetHour: GlobalHour, comparisonHour: GlobalHour): boolean {
  const delta = GLOBAL_HOURS.indexOf(targetHour) - GLOBAL_HOURS.indexOf(comparisonHour);

  if (delta === - (GLOBAL_HOURS.length - 1)) {
    return true;
  }

  return delta === 1;
}

export function isNextGlobalHour(targetHour: GlobalHour, comparisonHour: GlobalHour): boolean {
  return isPreviousGlobalHour(comparisonHour, targetHour);
}
