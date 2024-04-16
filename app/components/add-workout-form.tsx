'use client';

import { WorkoutTypeResponse } from '@/app/types/workoutType';
import { useFormState } from 'react-dom';
import ErrorMessages from './error-messages';
import SubmitButton from './submit-button';
import { addWorkout } from '@/app/db/actions';
import { dateToDateInput } from '@/app/lib/utils';
import {
  Box,
  Card,
  Select,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from '@radix-ui/themes';
import { useState } from 'react';

export default function Component({
  date,
  workoutTypes,
}: {
  date: Date;
  workoutTypes: WorkoutTypeResponse[];
}) {
  const [type, setType] = useState(workoutTypes[0].name);
  const [state, action] = useFormState(addWorkout, {
    errors: [],
  });

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
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </VisuallyHidden>
          </Box>

          <Box mb="2">
            <Text as="div" size="2" weight="bold" mb="1">
              Time
            </Text>
            <TextField.Root
              size="3"
              required
              type="number"
              name="time"
              placeholder="Time"
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Box>
          <ErrorMessages name="time" errors={state && state.errors} />

          <Box mb="4">
            <Text as="div" size="2" weight="bold" mb="1">
              Type
            </Text>
            <Select.Root
              size="3"
              defaultValue={type}
              onValueChange={setType}
              name="type"
            >
              <Select.Trigger />
              <Select.Content>
                {workoutTypes.map((type: WorkoutTypeResponse) => (
                  <Select.Item key={type._id} value={type.name}>
                    {type.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <VisuallyHidden>
              <TextField.Root size="3" type="text" name="type" value={type}>
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </VisuallyHidden>
          </Box>
          <ErrorMessages name="type" errors={state && state.errors} />

          <Box mb="4">
            <Text as="div" size="2" weight="bold" mb="1">
              Description
            </Text>
            <TextArea
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
