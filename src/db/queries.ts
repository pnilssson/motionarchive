import { cache } from 'react';
import collections from './db';
import { getSession } from '../lib/server-utils';
import { WorkoutResponse } from '../types/workout';

export const getTypes = cache(async () => {
  const workoutTypes = await collections.workoutTypes();
  const data = await workoutTypes.find({}).sort({ name: 1 }).toArray();
  return JSON.parse(JSON.stringify(data));
});

export const getWorkoutsForMonth = cache(async (date: Date) => {
  const session = await getSession();
  const workouts = await collections.workout();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const data = await workouts
    .find({
      date: { $gte: startDate, $lte: endDate },
      userId: session.user.userId,
    })
    .toArray();

  const mappedData: WorkoutResponse[] = mapWorkoutData(data);

  return mappedData;
});

export const getWorkoutsForDay = cache(async (date: Date) => {
  const session = await getSession();
  const workouts = await collections.workout();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 99);

  const data = await workouts
    .find({
      date: { $gte: startOfDay, $lte: endOfDay },
      userId: session.user.userId,
    })
    .toArray();

  const mappedData: WorkoutResponse[] = mapWorkoutData(data);

  return mappedData;
});

const mapWorkoutData = (data: any[]): WorkoutResponse[] => {
  return data.map(
    (workout: any) =>
      ({
        _id: workout._id.toString(),
        userId: workout.userId,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        type: workout.type,
        time: workout.time,
        description: workout.description,
        date: new Date(workout.date),
      } as WorkoutResponse)
  );
};
