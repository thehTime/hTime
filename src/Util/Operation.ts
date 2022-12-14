import { createHTime, HTime } from '../Core/HTime';
import { fromDaysToMilliseconds, fromHoursToMilliseconds, fromMinutesToMilliseconds, fromSecondsToMilliseconds, fromWeeksToMilliseconds } from '../Core/Conversion';

export function addMilliseconds(date: HTime, milliseconds: number): HTime {
  if (milliseconds === 0) {
    return date;
  }

  return createHTime({
    dateString: new Date(date.epochMilliseconds + milliseconds).toISOString(),
    timeZone: date.timeZone.name,
  });
}

export function addSeconds(date: HTime, seconds: number): HTime {
  return addMilliseconds(date, fromSecondsToMilliseconds(seconds));
}

export function addMinutes(date: HTime, minutes: number): HTime {
  return addMilliseconds(date, fromMinutesToMilliseconds(minutes));
}

export function addHours(date: HTime, hours: number): HTime {
  return addMilliseconds(date, fromHoursToMilliseconds(hours));
}

export function addDays(date: HTime, days: number): HTime {
  return addMilliseconds(date, fromDaysToMilliseconds(days));
}

export function addWeeks(date: HTime, weeks: number): HTime {
  return addMilliseconds(date, fromWeeksToMilliseconds(weeks));
}

export function subMilliseconds(date: HTime, milliseconds: number): HTime {
  return addMilliseconds(date, -milliseconds);
}

export function subSeconds(date: HTime, seconds: number): HTime {
  return addSeconds(date, -seconds);
}

export function subMinutes(date: HTime, minutes: number): HTime {
  return addMinutes(date, -minutes);
}

export function subHours(date: HTime, hours: number): HTime {
  return addHours(date, -hours);
}

export function subDays(date: HTime, days: number): HTime {
  return addDays(date, -days);
}

export function subWeeks(date: HTime, weeks: number): HTime {
  return addWeeks(date, -weeks);
}
