'use client';

import {
  Box,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from '@radix-ui/themes';
import { WorkoutTypeResponse } from '../types/workoutType';
import { useEffect, useState } from 'react';
import { dateToDateInput } from '../lib/utils';
import ErrorMessages from './error-messages';
import SubmitButton from './submit-button';
import { useFormState } from 'react-dom';
import { addWorkout } from '../db/actions';
import { AddWorkoutActionResponse } from '../types/workout';

export default function Page({
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Add workout</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add workout</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          On{' '}
          {date.toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Dialog.Description>
        <form action={action}>
          <Flex direction="column">
            <Box mb="4">
              <VisuallyHidden>
                <TextField.Root
                  size="3"
                  required
                  defaultValue={dateToDateInput(date)}
                  type="date"
                  name="date"
                ></TextField.Root>
              </VisuallyHidden>
            </Box>

            <Box mb="2">
              <Text as="div" size="2" weight="bold" mb="2">
                Time
              </Text>
              <TextField.Root
                size="3"
                type="number"
                name="time"
                placeholder="Time"
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
                resize="vertical"
                size="3"
                placeholder="Description"
                name="description"
              />
            </Box>
            <ErrorMessages name="description" errors={state && state.errors} />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" size="2">
                Cancel
              </Button>
            </Dialog.Close>
            <SubmitButton />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
