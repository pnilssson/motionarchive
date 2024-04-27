'use client';

import { WorkoutTypeResponse } from '@/src/types/workoutType';
import { useFormState } from 'react-dom';
import ErrorMessages from './error-messages';
import SubmitButton from './submit-button';
import { addWorkout } from '@/src/db/actions';
import { dateToDateInput } from '@/src/lib/utils';
import {
  Box,
  Card,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from '@radix-ui/themes';
import { AddWorkoutActionResponse } from '../types/workout';

export default function Component({
  date,
  workoutTypes,
}: {
  date: Date;
  workoutTypes: WorkoutTypeResponse[];
}) {
  const [state, action] = useFormState(
    (state: AddWorkoutActionResponse, formData: any) => {
      return addWorkout(state, formData);
    },
    {
      success: false,
      errors: [],
    }
  );

  return (
    <Card>
      <Box m="2">
        <Text as="div" size="4" weight="bold">
          Add workout
        </Text>
        <form action={action}>
          <Box mb="4">
            <VisuallyHidden>
              <TextField.Root
                size="3"
                type="date"
                name="date"
                defaultValue={dateToDateInput(date)}
              ></TextField.Root>
            </VisuallyHidden>
          </Box>

          <Box mb="2">
            <Text as="div" size="2" weight="bold" mb="2">
              Time
            </Text>
            <TextField.Root
              size="3"
              required
              type="number"
              placeholder="Time"
              name="time"
            ></TextField.Root>
          </Box>
          <ErrorMessages name="time" errors={state && state.errors} />

          <Flex mb="4" direction="column">
            <Text as="div" size="2" weight="bold" mb="2">
              Type
            </Text>
            <Select.Root
              size="3"
              required
              defaultValue={workoutTypes[0].name}
              name="type"
            >
              <Select.Trigger />
              <Select.Content position="popper" style={{ maxHeight: 200 }}>
                {workoutTypes.map((type: WorkoutTypeResponse) => (
                  <Select.Item key={type._id} value={type.name}>
                    {type.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          <ErrorMessages name="type" errors={state && state.errors} />

          <Box mb="4">
            <Text as="div" size="2" weight="bold" mb="2">
              Description
            </Text>
            <TextArea
              size="3"
              resize="vertical"
              placeholder="Description"
              name="description"
            />
          </Box>
          <ErrorMessages name="description" errors={state && state.errors} />
          <SubmitButton />
        </form>
      </Box>
    </Card>
  );
}
