'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import collections from './db';
import { AddWorkoutActionResponse, WorkoutRequest } from '../types/workout';
import { getSession } from '../lib/server-utils';
import { promises as fs } from 'fs';

const schema = z.object({
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
    createdAt: Date.now(),
    updatedAt: Date.now(),
    type: formData.get('type'),
    time: formData.get('time'),
    description: formData.get('description'),
    date: formData.get('date'),
  };

  const validatedRequest = schema.safeParse(request);
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

async function importWorkouts() {
  const session = await getSession();

  const file = await fs.readFile(
    process.cwd() + '/app/types/workouts.json',
    'utf8'
  );
  const data = JSON.parse(file);
  data.Workouts.forEach(async (workout: any) => {
    const request: WorkoutRequest = {
      userId: session?.user?.userId,
      createdAt: new Date(workout._created_at),
      updatedAt: undefined,
      type: workout._type,
      time: workout.Time,
      description: workout.Comment.replaceAll('&ouml;', 'ö')
        .replaceAll('&aring;', 'å')
        .replaceAll('&auml;', 'ä'),
      date: new Date(workout._date),
    };

    const workouts = await collections.workout();
    await workouts.insertOne(request);
  });
}

export { addWorkout, importWorkouts };
