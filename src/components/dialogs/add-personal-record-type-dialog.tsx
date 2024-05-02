'use client';

import { Box, Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import SubmitButton from '../buttons/submit-button';
import { useFormState } from 'react-dom';
import { addBenchmarkType } from '../../db/actions';
import { ActionResponse } from '../../types/types';
import { showSuccessToast } from '../toast';

export default function Component() {
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addBenchmarkType(formState, formData);
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
      showSuccessToast('Personal record type added successfully.');
    }
  }, [formState]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Add record</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title mb="2">New personal record</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          New type of personal record, results can be added once the personal
          record type has been created.
        </Dialog.Description>
        <form action={action}>
          <Flex direction="column">
            <Box mb="2">
              <Text as="div" size="2" weight="bold" mb="2">
                Name
              </Text>
              <TextField.Root
                size="3"
                type="text"
                name="name"
                placeholder="Name"
              ></TextField.Root>
              <ErrorMessages
                name="name"
                errors={formState && formState.errors}
              />
            </Box>
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
