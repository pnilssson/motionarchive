import { getMonthAndDayLink } from '@/src/lib/utils';
import { WorkoutResponse } from '@/src/types/workout';
import { Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { DayCard } from './day-card';

export function MobileCard({
  day,
  month,
  date,
  workouts,
}: {
  day: number;
  month: number;
  date: Date;
  workouts: WorkoutResponse[];
}) {
  return (
    <Flex>
      <Link href={getMonthAndDayLink(month, day)} className="w-full">
        <DayCard day={day} date={date}>
          <Flex justify="center">
            <Text weight="medium">{day}</Text>
          </Flex>
        </DayCard>
      </Link>
    </Flex>
  );
}
