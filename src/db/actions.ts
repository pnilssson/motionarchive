'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import collections from './db';
import { AddWorkoutActionResponse, WorkoutRequest } from '../types/workout';
import { getSession } from '../lib/server-utils';
import { promises as fs } from 'fs';
import { ObjectId } from 'mongodb';

const schema = z.object({
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
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

  const now = new Date();
  console.log(now);
  const request = {
    userId: session?.user?.userId,
    createdAt: now.toISOString(),
    updatedAt: null,
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

export const deleteWorkout = async (workoutId: string) => {
  const session = await getSession();
  const workouts = await collections.workout();
  await workouts.deleteOne({
    _id: new ObjectId(workoutId),
    userId: session.user.userId,
  });
};

function getActivityType(activitiesData: any, id: string) {
  switch (id) {
    case '23392':
      return 'Skiing';
    case '1':
      return 'Running';
    case '2':
      return 'Walk';
    case '3':
      return 'Cycling';
    case '4':
      return 'Swimming';
    case '23404':
      return 'Swimming';
    case '23383':
      return 'Soccer';
    case '23385':
      return 'Floorball';
    case '23386':
      return 'Tennis';
    case '23423':
      return 'Thai Boxing';
    case '23382':
      return 'Padel';
    case '23389':
      return 'Badminton';
    case '23420':
      return 'Surfing';
    case '23381':
      return 'Climbing';
    case '23415':
      return 'Rowing';
    case '23403':
      return 'Gymnastics';
    case '188162':
      return 'Functional Fitness';
  }
  const activity = activitiesData.Activities.find(
    (activity: any) => activity._id === id
  );
  if (activity && activity.__cdata) {
    if (activity.__cdata == 'cardiogym') {
      return 'Cardio';
    }
    return activity.__cdata;
  } else return null;
}

async function importWorkouts() {
  const session = await getSession();

  const workoutFile = await fs.readFile(
    process.cwd() + '/src/types/workouts.json',
    'utf8'
  );
  const activitiesFile = await fs.readFile(
    process.cwd() + '/src/types/activities.json',
    'utf8'
  );
  const workoutData = JSON.parse(workoutFile);
  const activitiesData = JSON.parse(activitiesFile);

  workoutData.Workouts.forEach(async (workout: any) => {
    let type =
      workout.ActivityId != null && workout.ActivityId.__text != null
        ? getActivityType(activitiesData, workout.ActivityId.__text)
        : workout._type;
    if (type == 'strength') type = 'Strength Training';
    if (type == 'cardiogym') type = 'Cardio';

    const request: WorkoutRequest = {
      userId: session?.user?.userId,
      createdAt: new Date(workout._created_at),
      updatedAt: undefined,
      type: capitalizeFirstLetter(type),
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

async function checkTypes() {
  const workoutsCollection = await collections.workout();
  const workouts = await workoutsCollection.find().toArray();
  const workoutTypesCollection = await collections.workoutTypes();
  const workoutTypes = await workoutTypesCollection.find().toArray();

  workouts.forEach(async (workout: any) => {
    const typeExists = workoutTypes.some(
      (type: any) => type.name === workout.type
    );
    if (!typeExists) {
      console.log(
        `Workout type "${workout.type}" does not exist in workout_type collection.`
      );
    }
  });
}

function capitalizeFirstLetter(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export { addWorkout, importWorkouts, checkTypes };
