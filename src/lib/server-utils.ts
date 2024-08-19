'use server';

import { Session } from 'next-auth';
import { auth } from '../app/auth';

async function getSession(): Promise<Session | null> {
  let session = await auth();

  return session;
}

export { getSession };
