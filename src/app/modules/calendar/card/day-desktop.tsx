'use client';

import AddWorkoutDialog from '@/src/components/add-workout-dialog';
import { getMonthAndDayLink } from '@/src/lib/utils';
import { Box, Flex, Text, Avatar, Tooltip } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { WorkoutResponse } from '@/src/types/workout';
import { WorkoutTypeResponse } from '@/src/types/workoutType';
import { useRef } from 'react';
import { DayCard } from './day-card';

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
      <Box
        ref={desktopCardRef}
        onClick={handleCardClick}
        className="cursor-pointer"
      >
        <DayCard day={day} month={month} year={year} classes="min-h-24 h-full">
          <Flex justify="between" mb="2">
            <Text weight="medium">{day}</Text>
            <Box ref={addWorkoutButtonRef}>
              <AddWorkoutDialog
                day={day}
                month={month}
                year={year}
                workoutTypes={workoutTypes}
                triggerType="plus"
              />
            </Box>
          </Flex>
          <Flex gap="1" className="flex-wrap">
            {workouts
              ? workouts.map((workout) => (
                  <Box key={workout._id}>
                    <Tooltip content={workout.type}>
                      <Avatar
                        size="2"
                        radius="full"
                        variant="soft"
                        fallback={workout.type.substring(0, 1)}
                      ></Avatar>
                    </Tooltip>
                  </Box>
                ))
              : null}
          </Flex>
        </DayCard>
      </Box>
    </>
  );
}
