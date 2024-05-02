'use client';

import { Button } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';

export default function Component() {
  return (
    <Button onClick={() => signIn()} variant="soft" size="3">
      Get started
    </Button>
  );
}
