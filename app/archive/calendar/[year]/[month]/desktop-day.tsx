import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';
import { Badge, Box, Card, Flex } from '@radix-ui/themes';
import { WorkoutResponse } from '@/app/types/workout';

export default function DesktopDay({
  day,
  month,
  workouts,
}: {
  day: number;
  month: number;
  workouts?: WorkoutResponse[];
}) {
  return (
    <Link href={getMonthAndDayLink(month, day)}>
      <Card className="min-h-24 h-full">
        <Box>{day}</Box>
        <Flex gap="1" className="flex-wrap">
          {workouts
            ? workouts.map((workout) => (
                <Flex key={workout._id}>
                  <Badge>{workout.type}</Badge>
                </Flex>
              ))
            : null}
        </Flex>
      </Card>
    </Link>
  );
}
