"use client";

import { addWorkout } from "@/app/actions";
import { WorkoutTypeResponse } from "@/lib/types/workoutType";

interface ComponentProps {
  date: Date;
  workoutTypes: WorkoutTypeResponse[];
}

export default function Component({ date, workoutTypes }: ComponentProps) {
  function formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <form action={addWorkout}>
        <label className="form-control w-full hidden">
          <div className="label">
            <span className="label-text font-bold">Date</span>
          </div>
          <input
            required
            type="date"
            name="date"
            defaultValue={formatDateLocal(date)}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Time</span>
          </div>
          <input
            required
            type="number"
            name="time"
            placeholder="Time"
            className="input input-bordered w-full"
          />
        </label>
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
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Description</span>
          </div>
          <textarea
            placeholder="Description"
            name="description"
            className="textarea textarea-bordered w-full"></textarea>
        </label>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 float-right">
          Save
        </button>
      </form>
    </div>
  );
}
