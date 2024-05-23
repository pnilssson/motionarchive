'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

export default function Component() {
  return <Button onClick={() => signIn()}>Get started</Button>;
}
