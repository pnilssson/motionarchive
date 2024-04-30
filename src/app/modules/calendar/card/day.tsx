import dynamic from 'next/dynamic';
import DayMobile from './day-mobile';
import { WorkoutResponse, WorkoutTypeResponse } from '@/src/types/types';
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
