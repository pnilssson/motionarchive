import Link from 'next/link';
import { getMonthAndDayLink } from '@/src/lib/utils';
import { Badge, Box, Card, Flex } from '@radix-ui/themes';
import { WorkoutResponse } from '@/src/types/workout';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
const MobileDesktopSwitch = dynamic(
  () => import('@/src/components/mobile-desktop-switch'),
  {
    ssr: false,
  }
);

export default function DesktopDay({
  day,
  month,
  date,
  workouts,
}: {
  day: number;
  month: number;
  date: Date;
  workouts?: WorkoutResponse[];
}) {
  function getDateOfDay(day: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), day);
  }

  function isWeekend(day: number): boolean {
    const dayOfWeek = getDateOfDay(day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  function isToday(day: number): boolean {
    const today = new Date();
    const dateOfDay = getDateOfDay(day);
    return (
      dateOfDay.getDate() === today.getDate() &&
      dateOfDay.getMonth() === today.getMonth() &&
      dateOfDay.getFullYear() === today.getFullYear()
    );
  }

  function DesktopCard() {
    return (
      <Link href={getMonthAndDayLink(month, day)}>
        <Card
          className={clsx(
            'min-h-24 h-full',
            {
              'bg-red-200': isWeekend(day) && !isToday(day),
            },
            {
              'bg-gray-100': !isWeekend(day) && !isToday(day),
            },
            { 'bg-blue-200': isToday(day) },
            { 'bg-transparent': day === null }
          )}
        >
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

  function MobileCard() {
    return (
      <Flex>
        <Link href={getMonthAndDayLink(month, day)} className="w-full">
          <Card
            className={clsx(
              {
                'bg-red-200': isWeekend(day) && !isToday(day),
              },
              {
                'bg-gray-100': !isWeekend(day) && !isToday(day),
              },
              { 'bg-blue-200': isToday(day) },
              { 'bg-transparent': day === null }
            )}
          >
            <Flex justify="center">{day}</Flex>
          </Card>
        </Link>
      </Flex>
    );
  }

  return (
    <MobileDesktopSwitch mobile={<MobileCard />} desktop={<DesktopCard />} />
  );
}
