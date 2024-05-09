import { avatarPropDefs } from '@radix-ui/themes/props';
import { WorkoutTypeResponse } from '../types/types';

function getMonthAndDayLink(month: number, day: number) {
  return `${month.toString()}/${day.toString()}`;
}

function getDayLink(day: number) {
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

function dateToDateInput(date: Date): string {
  const currentMonth = date.getMonth() + 1;
  const year = date.getFullYear();
  const month = currentMonth.toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getAvatarcolor(
  type: string,
  workoutTypes: WorkoutTypeResponse[],
): typeof avatarPropDefs.color.default {
  const workoutType = workoutTypes.find((a) => a.name === type);
  switch (workoutType?.subcategory.toLowerCase()) {
    case 'strength':
      return 'red';
    case 'conditioning':
      return 'blue';
    case 'mobility':
      return 'jade';
    case 'sport':
      return 'orange';
    default:
      return 'violet';
  }
}

export {
  getMonthAndDayLink,
  getDayLink,
  getUrl,
  dateToDateInput,
  getAvatarcolor,
};
