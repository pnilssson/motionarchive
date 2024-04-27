'use client';

import { Button, Flex, Spinner } from '@radix-ui/themes';
import { useFormStatus } from 'react-dom';

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <Flex justify="end">
      <Button type="submit" aria-disabled={pending} size="2">
        <Spinner loading={pending}>Save</Spinner>
      </Button>
    </Flex>
  );
}
