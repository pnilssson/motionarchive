'use server';

import { Session } from 'next-auth';
import { auth } from '../auth';

async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export { getSession };
