'use client';

import { getMonthAndDayLink, getAvatarcolor } from '@/src/lib/utils';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { DayCard } from './day-card';
import {
  IllnessResponse,
  WorkoutResponse,
  WorkoutTypeResponse,
} from '@/src/types/types';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import AddSelectPopover from '@/src/components/dialogs/add-select-popover';
import { HeartIcon } from '@radix-ui/react-icons';

export default function Component({
  day,
  month,
  year,
  workouts,
  illness,
  workoutTypes,
}: {
  day: number;
  month: number;
  year: number;
  workouts: WorkoutResponse[];
  illness: IllnessResponse[];
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
        <DayCard day={day} month={month} year={year} illness={illness} classes="min-h-24 h-full">
          <div className="flex justify-between mb-2">
            <p className="font-mediumbold">{day}</p>
            <div ref={addWorkoutButtonRef}>
              <AddSelectPopover
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
                        className={`${getAvatarcolor(workout.type, workoutTypes)} `}
                      >
                        {workout.type.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))
              : null}
            {illness
              ? illness.map((illness) => (
                  <div key={illness._id}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-red-100">
                        <HeartIcon className="h-4 w-4" />
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
