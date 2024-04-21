'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import collections from './db';
import { AddWorkoutActionResponse } from '../types/workout';
import { getSession } from '../lib/server-utils';

const schema = z.object({
  userId: z.string(),
  type: z.string({ required_error: 'Type is required.' }),
  time: z.coerce
    .number({ required_error: 'Time is required.' })
    .min(1, { message: 'Minimum workout length is 1 minute.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .max(4000, { message: 'Description must be less than 4000 characters.' }),
  date: z.coerce.date({ required_error: 'Date is required.' }),
});

async function addWorkout(
  _: any,
  formData: FormData
): Promise<AddWorkoutActionResponse> {
  const session = await getSession();

  const request = {
    userId: session?.user?.userId,
    type: formData.get('type'),
    time: formData.get('time'),
    description: formData.get('description'),
    date: formData.get('date'),
  };

  const validatedRequest = schema.safeParse(request);
  console.log(validatedRequest);
  if (!validatedRequest.success) {
    return {
      success: validatedRequest.success,
      errors: validatedRequest.error.issues,
    };
  }

  const workouts = await collections.workout();
  await workouts.insertOne(validatedRequest.data);
  revalidatePath('/archive/calendar');
  return {
    success: validatedRequest.success,
    errors: [],
  };
}

export { addWorkout };
