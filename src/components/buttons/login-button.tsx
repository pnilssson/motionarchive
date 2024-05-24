'use client';

import { Session } from 'next-auth';
import { Button } from '../ui/button';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';
import { signIn, signOut } from 'next-auth/react';

interface ComponentProps {
  session: Session | null;
}

export default function Component({ session }: ComponentProps) {
  return (
    <>
      {session ? (
        <Button
          size="icon"
          className="h-8 w-8 bg-violet-100 hover:bg-violet-200"
          onClick={() => signOut()}
        >
          <ExitIcon className="text-violet-950" />
        </Button>
      ) : (
        <Button
          size="icon"
          className="h-8 w-8 bg-violet-100 hover:bg-violet-200"
          onClick={() => signIn()}
        >
          <EnterIcon className="text-violet-950" />
        </Button>
      )}
    </>
  );
}
