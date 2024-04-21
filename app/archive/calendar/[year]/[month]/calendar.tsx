import clsx from 'clsx';
import Link from 'next/link';
import DesktopDay from './desktop-day';
import MobileDay from './mobile-day';
import dynamic from 'next/dynamic';
import { getWorkouts } from '@/app/db/queries';
import { Flex, Tooltip, Text, Grid, Box } from '@radix-ui/themes';
import { WorkoutResponse } from '@/app/types/workout';
const MobileDesktopSwitch = dynamic(
  () => import('@/app/components/mobile-desktop-switch'),
  {
    ssr: false,
  }
);

export default async function Calendar({ date }: { date: Date }) {
  const workouts = await getWorkouts(date);
  var monthName = date.toLocaleString(undefined, { month: 'long' });
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  let days = setDays();

  function setDays() {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let offset = firstDayOfMonth.getDay(); // Get the day of the week for the first day

    // Adjust the offset so Monday becomes the first day of the week
    if (offset === 0) {
      offset = 6; // Sunday
    } else {
      offset -= 1; // Shift other days by one position
    }

    // Generate an array of days in the month
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    // Add empty days to the beginning of the array based on the offset
    return [...Array(offset).fill(null), ...daysArray];
  }

  function isWeekend(day: number): boolean {
    const dayOfWeek = getDateOfDay(day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  function isToday(day: number): boolean {
    const today = new Date();
    const dateOfDay = getDateOfDay(day);
    return (
      dateOfDay.getDate() === today.getDate() &&
      dateOfDay.getMonth() === today.getMonth() &&
      dateOfDay.getFullYear() === today.getFullYear()
    );
  }

  function getDateOfDay(day: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), day);
  }

  function getPreviousMonthDateParameter() {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    return `${newYear}/${newMonth}`;
  }

  function getNextMonthDateParameter() {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    return `${newYear}/${newMonth}`;
  }

  function getWorkoutByDay(day: number) {
    const dateOfDay = getDateOfDay(day);
    const workoutsOfDay = workouts.filter((workout: WorkoutResponse) => {
      return (
        workout.date.getDate() === dateOfDay.getDate() &&
        workout.date.getMonth() === dateOfDay.getMonth() &&
        workout.date.getFullYear() === dateOfDay.getFullYear()
      );
    });
    return workoutsOfDay;
  }

  return (
    <>
      <Flex align={'center'} mb={'5'}>
        <Tooltip content="Previous month">
          <Link href={`/archive/calendar/${getPreviousMonthDateParameter()}`}>
            {leftArrow()}
          </Link>
        </Tooltip>
        <Text
          size={{ initial: '3', md: '5' }}
          mx={'3'}
        >{`${monthName} ${year}`}</Text>
        <Tooltip content="Next month">
          <Link href={`/archive/calendar/${getNextMonthDateParameter()}`}>
            {rightArrow()}
          </Link>
        </Tooltip>
      </Flex>
      <Grid columns={'7'} gap={'2'}>
        <Text>Mon</Text>
        <Text>Tue</Text>
        <Text>Wed</Text>
        <Text>Thu</Text>
        <Text>Fri</Text>
        <Text>Sat</Text>
        <Text>Sun</Text>
        {days.map((day, i) => (
          <Box
            key={i}
            className={clsx(
              'rounded-md',
              {
                'bg-red-200': isWeekend(day) && !isToday(day),
              },
              {
                'bg-gray-100': !isWeekend(day) && !isToday(day),
              },
              { 'bg-blue-200': isToday(day) },
              { 'bg-transparent': day === null }
            )}
          >
            {day ? (
              <MobileDesktopSwitch
                desktop={
                  <DesktopDay
                    day={day}
                    month={date.getMonth()}
                    workouts={getWorkoutByDay(day)}
                  />
                }
                mobile={<MobileDay day={day} month={date.getMonth()} />}
              />
            ) : null}
          </Box>
        ))}
      </Grid>
    </>
  );
}

function leftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

function rightArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
