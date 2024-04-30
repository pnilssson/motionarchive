import { getTypes, getWorkoutsForDay } from '@/src/db/queries';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import AddWorkoutDialog from '@/src/components/add-workout-dialog';
import DeleteWorkout from './delete-workout';
import { WorkoutResponse } from '@/src/types/types';

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
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Overview</h1>
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
        {workouts.length > 0 ? (
          <>
            {workouts.map((workout: WorkoutResponse) => (
              <Card key={workout._id} variant="surface">
                <Flex justify="between" align="center">
                  <Text as="div" size="2" weight="bold">
                    {workout.type}
                  </Text>
                  <DeleteWorkout id={workout._id} />
                </Flex>
                <Text as="div" size="2" mb="2">
                  {workout.time} min
                </Text>

                {workout.description ? (
                  <Text
                    as="div"
                    size="2"
                    dangerouslySetInnerHTML={{ __html: workout.description }}
                  ></Text>
                ) : null}
              </Card>
            ))}
          </>
        ) : null}
      </Grid>
    </>
  );
}
