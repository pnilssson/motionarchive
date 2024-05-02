import { Card, Flex, Text } from '@radix-ui/themes';
import DeleteWorkout from './delete-workout';
import { WorkoutResponse } from '@/src/types/types';

export default async function Component({
  workout,
}: {
  workout: WorkoutResponse;
}) {
  return (
    <Card key={workout._id} className="p-4 h-fit">
      <Flex justify="between" align="center">
        <Text as="div" size="3" weight="bold">
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
  );
}
