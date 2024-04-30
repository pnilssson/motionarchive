'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import collections from './db';
import { getSession } from '../lib/server-utils';
import { ObjectId } from 'mongodb';
import { ActionResponse } from '../types/types';

const createWorkoutSchema = z.object({
  userId: z.string(),
  type: z.string({ required_error: 'Type is required.' }),
  time: z.coerce
    .number({ required_error: 'Time is required.' })
    .min(1, { message: 'Minimum workout length is 1 minute.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .max(4000, { message: 'Description must be less than 4000 characters.' }),
  year: z.coerce.number({ required_error: 'Date is required.' }),
  month: z.coerce.number({ required_error: 'Date is required.' }),
  day: z.coerce.number({ required_error: 'Date is required.' }),
});

export async function addWorkout(
  _: any,
  formData: FormData,
): Promise<ActionResponse> {
  const session = await getSession();

  const request = {
    userId: session?.user?.userId,
    type: formData.get('type'),
    time: formData.get('time'),
    description: formData.get('description'),
    year: formData.get('year'),
    month: formData.get('month'),
    day: formData.get('day'),
  };

  const validated = createWorkoutSchema.safeParse(request);
  if (!validated.success) {
    return {
      success: validated.success,
      errors: validated.error.issues,
    };
  }

  const workouts = await collections.workout();
  await workouts.insertOne(validated.data);

  revalidatePath('/archive/calendar');
  return {
    success: validated.success,
    errors: [],
  };
}

const deleteWorkoutId = z.string({ required_error: 'Id is required.' });

export async function deleteWorkout(id: string): Promise<ActionResponse> {
  const session = await getSession();

  const validated = deleteWorkoutId.safeParse(id);
  if (!validated.success) {
    return {
      success: validated.success,
      errors: validated.error.issues,
    };
  }

  const workouts = await collections.workout();
  await workouts.deleteOne({
    _id: new ObjectId(validated.data),
    userId: session.user.userId,
  });

  revalidatePath('/archive/calendar');
  return {
    success: validated.success,
    errors: [],
  };
}
