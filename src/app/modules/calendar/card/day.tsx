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
  year,
  workouts,
  workoutTypes,
}: {
  day: number;
  month: number;
  year: number;
  workouts: WorkoutResponse[];
  workoutTypes: WorkoutTypeResponse[];
}) {
  return (
    <MobileDesktopSwitch
      mobile={
        <DayMobile day={day} month={month} year={year} workouts={workouts} />
      }
      desktop={
        <DayDesktop
          day={day}
          month={month}
          year={year}
          workouts={workouts}
          workoutTypes={workoutTypes}
        />
      }
    />
  );
}
