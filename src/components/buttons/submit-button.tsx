'use client';

import { Button, Spinner } from '@radix-ui/themes';
import { useFormStatus } from 'react-dom';

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} size="2">
      <Spinner loading={pending}></Spinner>
      Save
    </Button>
  );
}
