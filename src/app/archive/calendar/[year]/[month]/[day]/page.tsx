import {
  getIllnessForDay,
  getTypes,
  getWorkoutsForDay,
} from '@/src/db/queries';
import { IllnessResponse, WorkoutResponse } from '@/src/types/types';
import WorkoutCard from './workout-card';
import AddSelectPopover from '@/src/components/dialogs/add-select-popover';
import IllnessCard from './illness-card';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
    day: string;
  };
}) {
  const year = parseInt(params.year);
  const month = parseInt(params.month);
  const day = parseInt(params.day);
  const workoutTypes = await getTypes();
  const workouts = await getWorkoutsForDay(year, month, day);
  const illness = await getIllnessForDay(year, month, day);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">Overview</h1>
        <AddSelectPopover
          day={day}
          month={month}
          year={year}
          workoutTypes={workoutTypes}
        />
      </div>
      <div className="mb-4">
        <p className="text-xl text-muted-foreground">
          {new Date(year, month - 1, day).toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-auto gap-2">
        {workouts && workouts.length > 0
          ? workouts.map((workout: WorkoutResponse) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))
          : null}
        {illness && illness.length > 0
          ? illness.map((illness: IllnessResponse) => (
              <IllnessCard key={illness._id} illness={illness} />
            ))
          : null}
      </div>
    </>
  );
}
