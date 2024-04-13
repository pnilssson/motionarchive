'use client';

import { WorkoutTypeResponse } from '@/app/types/workoutType';
import { useFormState } from 'react-dom';
import ErrorMessages from './error-messages';
import SubmitButton from './submit-button';
import { addWorkout } from '@/app/db/actions';
import { dateToDateInput } from '@/app/lib/utils';

export default function Component({
  date,
  workoutTypes,
}: {
  date: Date;
  workoutTypes: WorkoutTypeResponse[];
}) {
  const [state, action] = useFormState(addWorkout, {
    errors: [],
  });

  return (
    <form action={action}>
      <label className="form-control w-full hidden">
        <div className="label">
          <span className="label-text font-bold">Date</span>
        </div>
        <input
          required
          type="date"
          name="date"
          defaultValue={dateToDateInput(date)}
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">Time</span>
        </div>
        <input
          type="number"
          name="time"
          placeholder="Time"
          className="input input-bordered w-full"
        />
      </label>
      <ErrorMessages name="time" errors={state && state.errors} />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">Type</span>
        </div>
        <select required name="type" className="select select-bordered">
          {workoutTypes.map((type: WorkoutTypeResponse) => (
            <option key={type._id}>{type.name}</option>
          ))}
        </select>
      </label>
      <ErrorMessages name="type" errors={state && state.errors} />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">Description</span>
        </div>
        <textarea
          placeholder="Description"
          name="description"
          className="textarea textarea-bordered w-full"
        ></textarea>
      </label>
      <ErrorMessages name="description" errors={state && state.errors} />
      <SubmitButton />
    </form>
  );
}
