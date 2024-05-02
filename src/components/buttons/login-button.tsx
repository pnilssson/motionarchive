'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { IconButton, Tooltip } from '@radix-ui/themes';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';

interface ComponentProps {
  session: Session | null;
}

export default function Component({ session }: ComponentProps) {
  if (session) {
    return (
      <Tooltip content="Sign out">
        <IconButton onClick={() => signOut()} variant="soft">
          <ExitIcon />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip content="Sign in">
      <IconButton onClick={() => signIn()} variant="soft">
        <EnterIcon />
      </IconButton>
    </Tooltip>
  );
}
