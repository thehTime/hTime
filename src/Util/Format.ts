import { format as formatDate } from 'date-fns';
import { isOdd } from '../Core/Math';
import { HTime } from '../Core/HTime';
import { GlobalHour } from '../Core/GlobalHour';

interface FormatOptions {
  useLocal?: boolean;
}

const FORMAT_HTIME_REGEX = /F{1}/g;
const FORMAT_ESCAPE_CHAR = "'";

function getDateFromHTime(hTime: HTime, useLocal?: boolean): Date {
  const date = useLocal ? hTime.local : hTime.utc;
  return new Date(date.year, date.month - 1, date.day, date.hour, date.minute, date.second, date.millisecond);
}

function replaceHTimePatternIfNotEscaped(hour: GlobalHour) {
  return (fragment: string, index: number): string => {
    if (isOdd(index)) {
      return fragment;
    }

    return fragment
      .replaceAll(FORMAT_HTIME_REGEX, `${FORMAT_ESCAPE_CHAR}${hour}${FORMAT_ESCAPE_CHAR}`)
      .replaceAll(`${FORMAT_ESCAPE_CHAR}${FORMAT_ESCAPE_CHAR}`, '');
  }
}

export function format(date: HTime, template: string, options?: FormatOptions): string {
  const escapedTemplate = template
    .split(FORMAT_ESCAPE_CHAR)
    .map(replaceHTimePatternIfNotEscaped(date.global.hour))
    .join(FORMAT_ESCAPE_CHAR);

  return formatDate(getDateFromHTime(date, options?.useLocal), escapedTemplate);
}
