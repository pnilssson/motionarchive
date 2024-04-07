import { WorkoutTypeResponse } from "@/lib/types/workoutType";
import AddWorkoutForm from "./addWorkoutForm";
import { useRef } from "react";

interface ComponentProps {
  date: Date;
  workoutTypes: WorkoutTypeResponse[];
}

export default function Component({ date, workoutTypes }: ComponentProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <dialog id="add-workout-dialog" className="modal" ref={dialogRef}>
        <div className="modal-box text-left">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
          <h3 className="text-2xl font-bold">Add workout </h3>
          <h3 className="mb-4">
            {date.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <AddWorkoutForm date={date} workoutTypes={workoutTypes} />
        </div>
      </dialog>
    </>
  );
}
