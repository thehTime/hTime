import { getJustHoursOffset } from '@/Core/Offset';

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

export function getGlobalHourFromUTCHour(hour: number): GlobalHour {
  return GLOBAL_HOURS[hour];
}

export function getUTCHourFromGlobalHour(globalHour: GlobalHour): number {
  return GLOBAL_HOURS.indexOf(globalHour);
}

export function getGlobalHours(offsetInMinutes: number = 0): GlobalHour[] {
  const hoursOffset = getJustHoursOffset(offsetInMinutes);

  return [
    ...GLOBAL_HOURS.slice(-hoursOffset),
    ...GLOBAL_HOURS.slice(0, -hoursOffset),
  ]
}