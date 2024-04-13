'use client';

import { WorkoutTypeResponse } from '@/app/types/workoutType';
import { useRef } from 'react';
import AddWorkoutForm from './add-workout-form';

export default function Component({
  date,
  workoutTypes,
  buttonStyle,
}: {
  date: Date;
  workoutTypes: WorkoutTypeResponse[];
  buttonStyle: 'button' | 'plus';
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.showModal();
  }

  function closeModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
  }

  return (
    <>
      {buttonStyle === 'button' ? (
        <button onClick={(e) => openModal(e)} className="btn btn-primary">
          Add workout
        </button>
      ) : (
        <button onClick={(e) => openModal(e)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}
      <dialog id="add-workout-dialog" className="modal" ref={dialogRef}>
        <div className="modal-box text-left">
          <button
            onClick={(e) => closeModal(e)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-2xl font-bold">Add workout</h3>
          <h3>
            {date.toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <AddWorkoutForm date={date} workoutTypes={workoutTypes} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={(e) => closeModal(e)}>close</button>
        </form>
      </dialog>
    </>
  );
}
