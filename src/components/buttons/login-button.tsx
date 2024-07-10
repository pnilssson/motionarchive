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
          variant="link"
          className="text-lg text-black px-0 font-medium"
          onClick={() => signOut()}
        >
          <ExitIcon className="mr-4 h-5 w-5" /> Sign out
        </Button>
      ) : (
        <Button
          variant="link"
          className="text-lg text-black px-0 font-medium"
          onClick={() => signIn()}
        >
          <EnterIcon className="mr-4 h-5 w-5" /> Sign in
        </Button>
      )}
    </>
  );
}
