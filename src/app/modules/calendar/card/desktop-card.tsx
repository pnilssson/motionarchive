'use client';

import AddWorkoutDialog from '@/src/components/add-workout-dialog';
import { getMonthAndDayLink } from '@/src/lib/utils';
import { Box, Flex, Badge, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { DayCard } from './day-card';
import { WorkoutResponse } from '@/src/types/workout';
import { WorkoutTypeResponse } from '@/src/types/workoutType';
import { useRef } from 'react';

export default function DesktopCard({
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
    console.log(isAddWorkoutButton);

    if (!isAddWorkoutButton && desktopCardButton) {
      router.push(getMonthAndDayLink(month, day));
    }
  }

  function getBadgeColor(workoutTypeName: string): string {
    const workoutType = workoutTypes.find(
      (type) => type.name === workoutTypeName
    );
    switch (workoutType?.subcategory) {
      case 'Strength':
        return 'red';
      case 'Conditioning':
        return 'blue';
      case 'Mobility':
        return 'green';
      case 'Sport':
        return 'orange';
      default:
        return 'gray';
    }
  }

  return (
    <Box
      ref={desktopCardRef}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <DayCard day={day} date={date} classes="min-h-24 h-full">
        <Flex justify="between" mb="2">
          <Text weight="medium">{day}</Text>
          <Box ref={addWorkoutButtonRef}>
            <AddWorkoutDialog
              date={date}
              workoutTypes={workoutTypes}
              triggerType="plus"
            />
          </Box>
        </Flex>
        <Flex gap="1" className="flex-wrap">
          {workouts
            ? workouts.map((workout) => (
                <Flex key={workout._id}>
                  <Badge color={getBadgeColor(workout.type)}>
                    {workout.type}
                  </Badge>
                </Flex>
              ))
            : null}
        </Flex>
      </DayCard>
    </Box>
  );
}
