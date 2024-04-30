import { getTypes, getWorkoutsForMonth } from '@/src/db/queries';
import { Text, Grid, Box } from '@radix-ui/themes';
import { Day } from './card/day';
import { WorkoutResponse } from '@/src/types/types';
import CalendarNavigation from './calendar-navigation';

export default async function Calendar({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const workouts = await getWorkoutsForMonth(year, month);
  const workoutTypes = await getTypes();

  const date = new Date(year, month - 1, 1);
  const monthName = date.toLocaleString(undefined, { month: 'long' });
  let days = setDays();

  function setDays() {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
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
      (_, index) => index + 1,
    );

    // Add empty days to the beginning of the array based on the offset
    return [...Array(offset).fill(null), ...daysArray];
  }

  function getWorkoutByDay(day: number) {
    const workoutsOfDay = workouts.filter((workout: WorkoutResponse) => {
      return (
        workout.day === day && workout.month === month && workout.year === year
      );
    });
    return workoutsOfDay;
  }

  return (
    <>
      <CalendarNavigation monthName={monthName} month={month} year={year} />
      <Grid columns={'7'} gap={'2'}>
        <Text weight="medium">Mon</Text>
        <Text weight="medium">Tue</Text>
        <Text weight="medium">Wed</Text>
        <Text weight="medium">Thu</Text>
        <Text weight="medium">Fri</Text>
        <Text weight="medium">Sat</Text>
        <Text weight="medium">Sun</Text>
        {days.map((day, i) => (
          <Box key={i}>
            {day ? (
              <Day
                day={day}
                month={month}
                year={year}
                workouts={getWorkoutByDay(day)}
                workoutTypes={workoutTypes}
              />
            ) : null}
          </Box>
        ))}
      </Grid>
    </>
  );
}
