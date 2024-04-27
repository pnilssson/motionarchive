import Link from 'next/link';
import { getWorkoutsForMonth } from '@/src/db/queries';
import { Flex, Tooltip, Text, Grid, Box } from '@radix-ui/themes';
import { WorkoutResponse } from '@/src/types/workout';
import DayCard from './day-card';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export default async function Calendar({ date }: { date: Date }) {
  const workouts = await getWorkoutsForMonth(date);
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
            <ChevronLeftIcon />
          </Link>
        </Tooltip>
        <Text
          size={{ initial: '3', md: '5' }}
          mx={'3'}
        >{`${monthName} ${year}`}</Text>
        <Tooltip content="Next month">
          <Link href={`/archive/calendar/${getNextMonthDateParameter()}`}>
            <ChevronRightIcon />
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
          <Box key={i}>
            {day ? (
              <DayCard
                day={day}
                month={month}
                date={date}
                workouts={getWorkoutByDay(day)}
              />
            ) : null}
          </Box>
        ))}
      </Grid>
    </>
  );
}
