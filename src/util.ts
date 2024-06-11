import { addMinutes, format, parse } from 'date-fns';

export function applyDelay(when?: Date, minutes: number) {
  if (!when) return undefined;
  return addMinutes(when, minutes);
}

export function formatTime(when?: Date) {
  if (!when) return 'NA';
  return format(when, 'h:mm aaa');
}

export function parseDelay(str?: string) {
  const m = str && /^([0-9]+) min(s?)$/.exec(str);
  return m ? Number(m[1]) : undefined;
}

export function parseTime(str?: string) {
  if (!str || /na/i.test(str)) return undefined;
  return parse(str, 'h:mma', new Date());
}
