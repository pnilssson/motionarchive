import { getTypes, getWorkoutsForMonth } from '@/src/db/queries';
import { Text, Grid, Box } from '@radix-ui/themes';
import { WorkoutResponse } from '@/src/types/workout';
import CalendarNavigation from '../../archive/calendar/[year]/[month]/calendar-navigation';
import { DayCard } from './card/day-card';
import { Day } from './card/day';

export default async function Calendar({ date }: { date: Date }) {
  const workouts = await getWorkoutsForMonth(date);
  const workoutTypes = await getTypes();

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
                date={date}
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
