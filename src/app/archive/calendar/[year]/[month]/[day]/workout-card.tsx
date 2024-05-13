import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Inset,
  Text,
} from '@radix-ui/themes';
import DeleteWorkoutButton from './delete-workout-button';
import { WorkoutResponse, WorkoutTypeResponse } from '@/src/types/types';
import clsx from 'clsx';
import { TrashIcon } from '@radix-ui/react-icons';
import { getAvatarcolor } from '@/src/lib/utils';

export default async function Component({
  workout,
  workoutTypes,
}: {
  workout: WorkoutResponse;
  workoutTypes: WorkoutTypeResponse[];
}) {
  return (
    <Card key={workout._id} className="h-fit shadow-sm">
      <Flex gap="4" align="center" pb="4">
        <Avatar
          size="3"
          radius="full"
          variant="soft"
          color={getAvatarcolor(workout.type, workoutTypes)}
          fallback={workout.type.substring(0, 1)}
        ></Avatar>
        <Flex direction="column" width="100%">
          <Flex direction="row" justify="between">
            <Heading as="h3" size="3" weight="bold">
              {workout.type}
            </Heading>
            <DeleteWorkoutButton id={workout._id} />
          </Flex>
          <Text as="div" size="2">
            {workout.time} min
          </Text>
        </Flex>
      </Flex>
      <Flex justify="between" align="center"></Flex>
      {workout.description ? (
        <Text as="div" size="2" className="whitespace-pre-wrap">
          {workout.description}
        </Text>
      ) : (
        <Text as="div" size="2">
          No description.
        </Text>
      )}
    </Card>
  );
}
