import { WorkoutResponse } from '@/src/types/workout';
import dynamic from 'next/dynamic';
import { WorkoutTypeResponse } from '@/src/types/workoutType';
import DayMobile from './day-mobile';
const MobileDesktopSwitch = dynamic(
  () => import('@/src/components/mobile-desktop-switch'),
  {
    ssr: false,
  }
);
const DayDesktop = dynamic(() => import('./day-desktop'), {
  ssr: false,
});

export async function Day({
  day,
  month,
  date,
  workouts,
  workoutTypes,
}: {
  day: number;
  month: number;
  date: Date;
  workouts: WorkoutResponse[];
  workoutTypes: WorkoutTypeResponse[];
}) {
  function getDateOfDay(day: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), day);
  }
  return (
    <MobileDesktopSwitch
      mobile={
        <DayMobile
          day={day}
          month={month}
          date={getDateOfDay(day)}
          workouts={workouts}
        />
      }
      desktop={
        <DayDesktop
          day={day}
          month={month}
          date={getDateOfDay(day)}
          workouts={workouts}
          workoutTypes={workoutTypes}
        />
      }
    />
  );
}
