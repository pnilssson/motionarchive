import { getTypes, getWorkoutsForMonth } from '@/src/db/queries';
import { Day } from './card/day';
import { WorkoutResponse } from '@/src/types/types';

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
    <div className="grid grid-cols-7 gap-2">
      <p className="font-semibold">Mon</p>
      <p className="font-semibold">Tue</p>
      <p className="font-semibold">Wed</p>
      <p className="font-semibold">Thu</p>
      <p className="font-semibold">Fri</p>
      <p className="font-semibold">Sat</p>
      <p className="font-semibold">Sun</p>
      {days.map((day, i) => (
        <div key={i}>
          {day ? (
            <Day
              day={day}
              month={month}
              year={year}
              workouts={getWorkoutByDay(day)}
              workoutTypes={workoutTypes}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
