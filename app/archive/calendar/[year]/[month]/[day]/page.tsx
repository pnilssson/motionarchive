import dynamic from 'next/dynamic';
import DailyOverview from './daily-overview';
import { getTypes } from '@/app/db/queries';
import AddWorkoutForm from '@/app/components/add-workout-form';
import Link from 'next/link';
import MobileDesktopSwitch from '@/app/components/mobile-desktop-switch';
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

        <Link href={''} className="hidden md:block"></Link>
      </div>
      <h1 className="text-xl mb-6">
        {date.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h1>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <MobileDesktopSwitch
            mobile={<AddWorkoutForm date={date} workoutTypes={workoutTypes} />}
            desktop={<DailyOverview />}
          />
        </div>
        <div className="md:w-1/3">
          <MobileDesktopSwitch
            mobile={<DailyOverview />}
            desktop={<AddWorkoutForm date={date} workoutTypes={workoutTypes} />}
          />
        </div>
      </div>
    </div>
  );
}
