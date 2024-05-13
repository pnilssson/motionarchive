import { cache } from 'react';
import collections from './db';
import { getSession } from '../lib/server-utils';
import { PersonalRecordResponse, WorkoutResponse } from '../types/types';

export const getTypes = cache(async () => {
  const workoutTypes = await collections.workoutType();
  const data = await workoutTypes.find({}).sort({ name: 1 }).toArray();
  return JSON.parse(JSON.stringify(data));
});

export const getTypeByName = cache(async (name: string) => {
  const workoutTypes = await collections.workoutType();
  const data = await workoutTypes.findOne({ name: name });
  return JSON.parse(JSON.stringify(data));
});

export const getWorkoutsForMonth = cache(
  async (year: number, month: number) => {
    const session = await getSession();
    const workouts = await collections.workout();
    const data = await workouts
      .find({
        year: year,
        month: month,
        userId: session.user.userId,
      })
      .toArray();

    const mappedData: WorkoutResponse[] = mapWorkoutData(data);
    return mappedData;
  },
);

export const getWorkoutsForDay = cache(
  async (year: number, month: number, day: number) => {
    const session = await getSession();
    const workouts = await collections.workout();

    const data = await workouts
      .find({
        year: year,
        month: month,
        day: day,
        userId: session.user.userId,
      })
      .toArray();

    const mappedData: WorkoutResponse[] = mapWorkoutData(data);

    return mappedData;
  },
);

const mapWorkoutData = (data: any[]): WorkoutResponse[] => {
  return data.map(
    (workout: WorkoutResponse) =>
      ({
        _id: workout._id.toString(),
        userId: workout.userId,
        type: workout.type,
        category: workout.category,
        time: workout.time,
        description: workout.description,
        year: workout.year,
        month: workout.month,
        day: workout.day,
      }) as WorkoutResponse,
  );
};

export const getPersonalRecords = cache(async () => {
  const session = await getSession();
  const workouts = await collections.personalRecord();

  const data = await workouts
    .find({
      userId: session.user.userId,
    })
    .sort({ name: 1 })
    .toArray();

  const mappedData: PersonalRecordResponse[] = mapPersonalRecordData(data);
  return mappedData;
});

const mapPersonalRecordData = (data: any[]): PersonalRecordResponse[] => {
  return data.map(
    (personalRecord: PersonalRecordResponse) =>
      ({
        _id: personalRecord._id.toString(),
        userId: personalRecord.userId,
        name: personalRecord.name,
        results: personalRecord.results.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      }) as PersonalRecordResponse,
  );
};
