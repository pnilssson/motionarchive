'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CheckIcon, LogInIcon, LogOutIcon, PencilIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface ComponentProps {
  session: Session | null;
}

export default function Component({ session }: ComponentProps) {
  return (
    <TooltipProvider>
      {session ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-8 w-8 bg-violet-100 hover:bg-violet-200"
              onClick={() => signOut}
            >
              <LogOutIcon className="h-3 w-3 text-violet-950" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign out</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-8 w-8 bg-violet-100 hover:bg-violet-200"
              onClick={() => signIn}
            >
              <LogInIcon className="h-3 w-3 text-violet-950" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in</p>
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
}
