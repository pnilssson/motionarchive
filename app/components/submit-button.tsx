'use client';

import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Button, Flex, Spinner } from '@radix-ui/themes';
import { useFormStatus } from 'react-dom';

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <Flex width="100%" justify="end">
      <Button type="submit" aria-disabled={pending} size="3">
        <Spinner loading={pending}>
          <PaperPlaneIcon /> Save
        </Spinner>
      </Button>
    </Flex>
  );
}
