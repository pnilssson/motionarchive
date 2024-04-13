import dynamic from 'next/dynamic';
import DailyOverview from './daily-overview';
import { getTypes } from '@/app/db/queries';
const AddWorkoutDialog = dynamic(
  () => import('@/app/components/add-workout-dialog'),
  {
    ssr: false,
  }
);

interface PageProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}

export default async function Page({ params }: PageProps) {
  const workoutTypes = await getTypes();
  const date = new Date(
    parseInt(params.year),
    parseInt(params.month) - 1,
    parseInt(params.day)
  );

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold mb-6">Overview</h1>

        <div className="hidden md:block">
          <AddWorkoutDialog
            date={date}
            workoutTypes={workoutTypes}
            buttonStyle="button"
          />
        </div>
      </div>
      <h1 className="text-xl mb-6">
        {date.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h1>

      <div className="">
        <DailyOverview />
      </div>
      <div className="md:hidden absolute bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <AddWorkoutDialog
          date={date}
          workoutTypes={workoutTypes}
          buttonStyle="button"
        />
      </div>
    </div>
  );
}
