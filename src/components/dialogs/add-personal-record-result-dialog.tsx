'use client';

import {
  Box,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
  Tooltip,
  VisuallyHidden,
} from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import SubmitButton from '../buttons/submit-button';
import { useFormState } from 'react-dom';
import { addPersonalRecordResult } from '../../db/actions';
import { ActionResponse, PersonalRecordResponse } from '../../types/types';
import { dateToDateInput } from '@/src/lib/utils';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { PlusIcon } from '@radix-ui/react-icons';

export default function Component({
  personalRecord,
}: {
  personalRecord: PersonalRecordResponse;
}) {
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addPersonalRecordResult(formState, formData);
    },
    {
      success: false,
      errors: [],
    },
  );
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      toast({ description: 'Result added successfully.' });
    }
  }, [formState, toast]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Tooltip content="Add result">
        <Dialog.Trigger>
          <Dialog.Trigger>
            <Button
              size="icon"
              className="h-6 w-6 bg-violet-100 hover:bg-violet-200"
            >
              <PlusIcon className="text-violet-950" />
            </Button>
          </Dialog.Trigger>
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title mb="2">{personalRecord.name}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Congratulations on your new result!
        </Dialog.Description>
        <form action={action}>
          <Flex direction="column">
            <Box>
              <VisuallyHidden>
                <TextField.Root
                  size="3"
                  required
                  type="text"
                  name="id"
                  defaultValue={personalRecord._id.toString()}
                ></TextField.Root>
              </VisuallyHidden>
            </Box>

            <Box mb="4">
              <Text as="div" size="2" weight="bold" mb="2">
                Date
              </Text>
              <TextField.Root
                className="date-input"
                size="3"
                type="date"
                name="date"
                defaultValue={dateToDateInput(new Date())}
                placeholder="Date"
              ></TextField.Root>
              <ErrorMessages
                name="date"
                errors={formState && formState.errors}
              />
            </Box>

            <Box mb="4">
              <Text as="div" size="2" weight="bold" mb="2">
                Result
              </Text>
              <TextField.Root
                size="3"
                type="text"
                name="result"
                placeholder="Result"
              ></TextField.Root>
              <ErrorMessages
                name="name"
                errors={formState && formState.errors}
              />
            </Box>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="secondary" size="sm">
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
