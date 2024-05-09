'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import collections from './db';
import { getSession } from '../lib/server-utils';
import { ObjectId } from 'mongodb';
import { ActionResponse, PersonalRecordResponse } from '../types/types';
import { getTypeByName } from './queries';

const createWorkoutSchema = z.object({
  userId: z.string(),
  type: z.string({ required_error: 'Type is required.' }),
  category: z.string({ required_error: 'Category could not be found.' }),
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
  const type = formData.get('type');
  const workoutType = await getTypeByName(type?.toString() as string);

  const request = {
    userId: session?.user?.userId,
    type: formData.get('type'),
    category: workoutType.subcategory,
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

const deleteWorkoutId = z.string({ required_error: 'Workout id is required.' });

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

const createPersonalRecordTypeSchema = z.object({
  userId: z.string(),
  name: z.string({ required_error: 'Name is required.' }),
  results: z.array(z.object({})),
});

export async function addPersonalRecordType(
  _: any,
  formData: FormData,
): Promise<ActionResponse> {
  const session = await getSession();

  const request = {
    userId: session?.user?.userId,
    name: formData.get('name'),
    results: [],
  };

  const validated = createPersonalRecordTypeSchema.safeParse(request);
  if (!validated.success) {
    return {
      success: validated.success,
      errors: validated.error.issues,
    };
  }

  const workouts = await collections.personalRecord();
  await workouts.insertOne(validated.data);

  revalidatePath('/archive/personal-records');
  return {
    success: validated.success,
    errors: [],
  };
}

const createPersonalRecordResultSchema = z.object({
  date: z.coerce.date({ required_error: 'Date is required.' }),
  result: z.string({ required_error: 'Name is required.' }),
  id: z.string(),
});

export async function addPersonalRecordResult(
  _: any,
  formData: FormData,
): Promise<ActionResponse> {
  const personalRecordId = formData.get('id') as unknown as string;
  const request = {
    date: formData.get('date'),
    result: formData.get('result'),
    id: crypto.randomUUID(),
  };

  const validated = createPersonalRecordResultSchema.safeParse(request);
  if (!validated.success) {
    return {
      success: validated.success,
      errors: validated.error.issues,
    };
  }

  const personalRecords = await collections.personalRecord();
  const personalRecord = (await personalRecords.findOne({
    _id: new ObjectId(personalRecordId),
  })) as unknown as PersonalRecordResponse;

  await personalRecords.updateOne(
    { _id: new ObjectId(personalRecordId) },
    { $set: { results: [validated.data, ...personalRecord.results] } },
  );

  revalidatePath('/archive/personal-records');
  return {
    success: validated.success,
    errors: [],
  };
}

const deletePersonalRecordId = z.string({
  required_error: 'Personal record id is required.',
});

export async function deletePersonalRecord(
  id: string,
): Promise<ActionResponse> {
  const session = await getSession();

  const validated = deletePersonalRecordId.safeParse(id);
  if (!validated.success) {
    return {
      success: validated.success,
      errors: validated.error.issues,
    };
  }

  const personalRecords = await collections.personalRecord();
  await personalRecords.deleteOne({
    _id: new ObjectId(validated.data),
    userId: session.user.userId,
  });

  revalidatePath('/archive/personal-records');
  return {
    success: validated.success,
    errors: [],
  };
}

const deletePersonalRecordResultSchema = z.object({
  personalRecordId: z.string({
    required_error: 'Personal record id is required.',
  }),
  resultId: z.string({ required_error: 'Result record id is required.' }),
});

export async function deletePersonalRecordResult(
  personalRecordId: string,
  resultId: string,
): Promise<ActionResponse> {
  const request = {
    personalRecordId: personalRecordId,
    resultId: resultId,
  };

  const validated = deletePersonalRecordResultSchema.safeParse(request);
  if (!validated.success) {
    return {
      success: validated.success,
      errors: validated.error.issues,
    };
  }

  const personalRecords = await collections.personalRecord();
  const personalRecord = (await personalRecords.findOne({
    _id: new ObjectId(personalRecordId),
  })) as unknown as PersonalRecordResponse;

  await personalRecords.updateOne(
    { _id: new ObjectId(personalRecordId) },
    {
      $set: {
        results: [...personalRecord.results.filter((a) => a.id != resultId)],
      },
    },
  );

  revalidatePath('/archive/personal-records');
  return {
    success: validated.success,
    errors: [],
  };
}
