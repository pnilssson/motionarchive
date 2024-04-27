import { WorkoutResponse } from '@/src/types/workout';
import dynamic from 'next/dynamic';
import { WorkoutTypeResponse } from '@/src/types/workoutType';
import { MobileCard } from './mobile-card';
const MobileDesktopSwitch = dynamic(
  () => import('@/src/components/mobile-desktop-switch'),
  {
    ssr: false,
  }
);
const DesktopCard = dynamic(() => import('./desktop-card'), {
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
  return (
    <MobileDesktopSwitch
      mobile={
        <MobileCard day={day} month={month} date={date} workouts={workouts} />
      }
      desktop={
        <DesktopCard
          day={day}
          month={month}
          date={date}
          workouts={workouts}
          workoutTypes={workoutTypes}
        />
      }
    />
  );
}
