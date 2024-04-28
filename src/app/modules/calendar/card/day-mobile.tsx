import { getMonthAndDayLink } from '@/src/lib/utils';
import { WorkoutResponse } from '@/src/types/workout';
import { Card, Flex, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import Link from 'next/link';
import { DayCard } from './day-card';

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
    <Flex>
      <Link href={getMonthAndDayLink(month, day)} className="w-full">
        <DayCard
          day={day}
          month={month}
          year={year}
          classes={workouts.length > 0 ? 'bg-violet-400' : ''}
        >
          <Flex justify="center">
            <Text weight="medium">{day}</Text>
          </Flex>
        </DayCard>
      </Link>
    </Flex>
  );
}
