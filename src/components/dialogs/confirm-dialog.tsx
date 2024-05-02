'use client';

import { Button, Dialog, Flex } from '@radix-ui/themes';

export default function Component({
  title,
  content,
  onConfirm,
  children,
}: {
  title: string;
  content: string;
  onConfirm: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{content}</Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" size="2">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close onClick={onConfirm}>
            <Button size="2">Confirm</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}