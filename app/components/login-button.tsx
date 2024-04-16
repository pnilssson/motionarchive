'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { Button, Tooltip } from '@radix-ui/themes';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';

interface ComponentProps {
  session: Session | null;
}

export default function Component({ session }: ComponentProps) {
  if (session) {
    return (
      <Tooltip content="Sign out">
        <Button onClick={() => signOut()} color="gray" variant="soft">
          <ExitIcon />
        </Button>
      </Tooltip>
    );
  }
  return (
    <Tooltip content="Sign in">
      <Button onClick={() => signIn()}>
        <EnterIcon />
      </Button>
    </Tooltip>
  );
}
