import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Inset,
  Text,
} from '@radix-ui/themes';
import DeleteWorkoutButton from './delete-workout-button';
import { WorkoutResponse } from '@/src/types/types';
import clsx from 'clsx';
import { TrashIcon } from '@radix-ui/react-icons';

export default async function Component({
  workout,
}: {
  workout: WorkoutResponse;
}) {
  return (
    <Card key={workout._id} className="h-fit">
      <Inset clip="padding-box" side="top" pb="current">
        <Flex
          justify="between"
          p="4"
          className={clsx(
            'text-radix-white',
            {
              'bg-gradient-to-tr from-sky-600 to-blue-400':
                workout.category.toLowerCase() == 'conditioning',
            },
            {
              'bg-gradient-to-tr from-amber-600 to-orange-400':
                workout.category.toLowerCase() == 'sport',
            },
            {
              'bg-gradient-to-tr from-emerald-600 to-green-400':
                workout.category.toLowerCase() == 'mobility',
            },
            {
              'bg-gradient-to-tr from-rose-600 to-pink-400':
                workout.category.toLowerCase() == 'strength',
            },
          )}
        >
          <Flex direction="column">
            <Heading as="h3" size="3" weight="medium">
              {workout.type}
            </Heading>
            <Text as="div" size="2">
              {workout.time} min
            </Text>
          </Flex>
          <Flex>
            <DeleteWorkoutButton id={workout._id} />
          </Flex>
        </Flex>
      </Inset>
      <Flex justify="between" align="center"></Flex>
      {workout.description ? (
        <Text
          as="div"
          size="2"
          dangerouslySetInnerHTML={{ __html: workout.description }}
        ></Text>
      ) : (
        <Text as="div" size="2">
          No description.
        </Text>
      )}
    </Card>
  );
}
