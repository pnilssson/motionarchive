'use client';

import AddWorkoutDialog from '@/src/components/dialogs/add-workout-dialog';
import { getMonthAndDayLink, getAvatarcolor } from '@/src/lib/utils';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { DayCard } from './day-card';
import { WorkoutResponse, WorkoutTypeResponse } from '@/src/types/types';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';

export default function Component({
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
  const router = useRouter();
  const addWorkoutButtonRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);

  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    const isAddWorkoutButton =
      addWorkoutButtonRef.current &&
      e.target instanceof Node &&
      addWorkoutButtonRef.current.contains(e.target as Node);

    const desktopCardButton =
      desktopCardRef.current &&
      e.target instanceof Node &&
      desktopCardRef.current.contains(e.target as Node);

    if (!isAddWorkoutButton && desktopCardButton) {
      router.push(getMonthAndDayLink(month, day));
    }
  }

  return (
    <>
      <div
        ref={desktopCardRef}
        onClick={handleCardClick}
        className="cursor-pointer"
      >
        <DayCard day={day} month={month} year={year} classes="min-h-24 h-full">
          <div className="flex justify-between mb-2">
            <p className="font-mediumbold">{day}</p>
            <div ref={addWorkoutButtonRef}>
              <AddWorkoutDialog
                day={day}
                month={month}
                year={year}
                workoutTypes={workoutTypes}
                triggerType="plus"
              />
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {workouts
              ? workouts.map((workout) => (
                  <div key={workout._id}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={`${getAvatarcolor(workout.type, workoutTypes)} font-semibold`}
                      >
                        {workout.type.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))
              : null}
          </div>
        </DayCard>
      </div>
    </>
  );
}
