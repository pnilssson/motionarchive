'use server';

import { getSession } from '../lib/server-utils';
import { promises as fs } from 'fs';
import collections from './db';
import { WorkoutRequest } from '../types/types';

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

export async function importWorkouts() {
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
      type: capitalizeFirstLetter(type),
      time: workout.Time,
      description: workout.Comment.replaceAll('&ouml;', 'ö')
        .replaceAll('&aring;', 'å')
        .replaceAll('&auml;', 'ä'),
      year: new Date(workout._date).getFullYear(),
      month: new Date(workout._date).getMonth() + 1,
      day: new Date(workout._date).getDate(),
    };
    const workouts = await collections.workout();
    await workouts.insertOne(request);
  });
}

export async function checkTypes() {
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
