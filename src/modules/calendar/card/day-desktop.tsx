'use client';

import AddWorkoutDialog from '@/src/components/dialogs/add-workout-dialog';
import { getMonthAndDayLink } from '@/src/lib/utils';
import { Box, Flex, Text, Avatar, Tooltip } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { DayCard } from './day-card';
import { avatarPropDefs } from '@radix-ui/themes/props';
import { WorkoutResponse, WorkoutTypeResponse } from '@/src/types/types';

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

  function getAvatarcolor(type: string): typeof avatarPropDefs.color.default {
    const workoutType = workoutTypes.find((a) => a.name === type);
    switch (workoutType?.subcategory.toLowerCase()) {
      case 'strength':
        return 'red';
      case 'conditioning':
        return 'blue';
      case 'mobility':
        return 'jade';
      case 'sport':
        return 'orange';
      default:
        return 'violet';
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
                        color={getAvatarcolor(workout.type)}
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
