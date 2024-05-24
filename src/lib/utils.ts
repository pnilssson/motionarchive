import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WorkoutTypeResponse } from '../types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthAndDayLink(month: number, day: number) {
  return `${month.toString()}/${day.toString()}`;
}

export function getDayLink(day: number) {
  return `${day.toString()}`;
}

function getUrl(path: string) {
  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

  const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
  const INCLUDES_FORWARD_SLASH_AT_START = (string: string) =>
    INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);

  return `${BASE_URL}${
    !INCLUDES_FORWARD_SLASH_AT_START(path) ? '/' : ''
  }${path}`;
}

export function dateToDateInput(date: Date): string {
  const currentMonth = date.getMonth() + 1;
  const year = date.getFullYear();
  const month = currentMonth.toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getAvatarcolor(
  type: string,
  workoutTypes: WorkoutTypeResponse[],
) {
  const workoutType = workoutTypes.find((a) => a.name === type);
  switch (workoutType?.subcategory.toLowerCase()) {
    case 'strength':
      return 'bg-rose-100';
    case 'conditioning':
      return 'bg-blue-100';
    case 'mobility':
      return 'bg-emerald-100';
    case 'sport':
      return 'bg-orange-100';
  }
}
