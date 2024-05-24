import { getMonthAndDayLink } from '@/src/lib/utils';
import Link from 'next/link';
import { DayCard } from './day-card';
import { WorkoutResponse } from '@/src/types/types';

export default function Component({
  day,
  month,
  year,
  workouts,
}: {
  day: number;
  month: number;
  year: number;
  workouts: WorkoutResponse[];
}) {
  return (
    <div className="flex">
      <Link href={getMonthAndDayLink(month, day)} className="w-full">
        <DayCard
          day={day}
          month={month}
          year={year}
          classes={workouts.length > 0 ? 'bg-violet-300' : ''}
        >
          <div className="flex justify-center">
            <p className="font-semibold">{day}</p>
          </div>
        </DayCard>
      </Link>
    </div>
  );
}
