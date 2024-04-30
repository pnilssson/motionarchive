'use client';

import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import ErrorMessages from './error-messages';
import SubmitButton from './submit-button';
import { useFormState } from 'react-dom';
import { addWorkout } from '../db/actions';
import { PlusIcon } from '@radix-ui/react-icons';
import { ActionResponse, WorkoutTypeResponse } from '../types/types';
import { showSuccessToast } from './toast';

export default function Component({
  day,
  month,
  year,
  triggerType = 'button',
  workoutTypes,
}: {
  day: number;
  month: number;
  year: number;
  triggerType?: 'button' | 'plus';
  workoutTypes: WorkoutTypeResponse[];
}) {
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addWorkout(formState, formData);
    },
    {
      success: false,
      errors: [],
    },
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      showSuccessToast('Workout added successfully.');
    }
  }, [formState]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {triggerType === 'button' ? (
        <Dialog.Trigger>
          <Button>Add workout</Button>
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger>
          <IconButton size="1" variant="soft">
            <PlusIcon />
          </IconButton>
        </Dialog.Trigger>
      )}

      <Dialog.Content maxWidth="450px">
        <Dialog.Title mb="2">Add workout</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          On{' '}
          {new Date(year, month, day).toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Dialog.Description>
        <form action={action}>
          <Flex direction="column">
            <Box>
              <VisuallyHidden>
                <TextField.Root
                  size="3"
                  required
                  type="number"
                  name="year"
                  defaultValue={year}
                ></TextField.Root>
                <TextField.Root
                  size="3"
                  required
                  type="number"
                  name="month"
                  defaultValue={month}
                ></TextField.Root>
                <TextField.Root
                  size="3"
                  required
                  type="number"
                  name="day"
                  defaultValue={day}
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
            <ErrorMessages name="time" errors={formState && formState.errors} />

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
            <ErrorMessages name="type" errors={formState && formState.errors} />

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
            <ErrorMessages
              name="description"
              errors={formState && formState.errors}
            />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" size="2">
                Cancel
              </Button>
            </Dialog.Close>
            <Flex justify="end">
              <SubmitButton />
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
