import DailyOverview from './daily-overview';
import { getTypes } from '@/app/db/queries';
import AddWorkoutForm from '@/app/components/add-workout-form';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
const MobileDesktopSwitch = dynamic(
  () => import('@/app/components/mobile-desktop-switch'),
  {
    ssr: false,
  }
);

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
    day: string;
  };
}) {
  const workoutTypes = await getTypes();
  const date = new Date(
    parseInt(params.year),
    parseInt(params.month) - 1,
    parseInt(params.day)
  );

  return (
    <>
      <Flex justify={'between'}>
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Overview</h1>
        <Link href={''} className="hidden md:block"></Link>
      </Flex>
      <Box mb="4">
        {' '}
        <Text size={'5'}>
          {date.toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </Box>
      <Grid columns={{ initial: '1', md: '2' }} gap="3" width="auto">
        <MobileDesktopSwitch
          mobile={<AddWorkoutForm date={date} workoutTypes={workoutTypes} />}
          desktop={<DailyOverview />}
        />
        <MobileDesktopSwitch
          mobile={<DailyOverview />}
          desktop={<AddWorkoutForm date={date} workoutTypes={workoutTypes} />}
        />
      </Grid>
    </>
  );
}
