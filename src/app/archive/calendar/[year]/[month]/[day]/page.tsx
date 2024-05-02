import { getTypes, getWorkoutsForDay } from '@/src/db/queries';
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import AddWorkoutDialog from '@/src/components/dialogs/add-workout-dialog';
import DeleteWorkout from './delete-workout';
import { WorkoutResponse } from '@/src/types/types';
import WorkoutCard from './workout-card';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
    day: string;
  };
}) {
  const year = parseInt(params.year);
  const month = parseInt(params.month);
  const day = parseInt(params.day);
  const workoutTypes = await getTypes();
  const workouts = await getWorkoutsForDay(year, month, day);

  return (
    <>
      <Flex justify={'between'}>
        <Heading
          as="h3"
          size={{ initial: '6', md: '8' }}
          weight={'bold'}
          mb={'4'}
        >
          Overview
        </Heading>
        <AddWorkoutDialog
          day={day}
          month={month}
          year={year}
          workoutTypes={workoutTypes}
        />
      </Flex>
      <Box mb="4">
        {' '}
        <Text size={'5'}>
          {new Date(year, month, day).toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </Box>
      <Grid columns={{ initial: '1', md: '4' }} gap="2" width="auto">
        {workouts && workouts.length > 0
          ? workouts.map((workout: WorkoutResponse) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))
          : null}
      </Grid>
    </>
  );
}
