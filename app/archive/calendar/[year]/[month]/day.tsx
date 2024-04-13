import Link from 'next/link';
import { getTypes } from '@/app/db/queries';
import dynamic from 'next/dynamic';
import { getMonthAndDayLink } from '@/app/lib/utils';
import MobileDesktopSwitch from '@/app/components/mobile-desktop-switch';

const AddWorkoutDialog = dynamic(
  () => import('@/app/components/add-workout-dialog'),
  {
    ssr: false,
  }
);

interface MonthProps {
  day: number;
  month: number;
  year: number;
}

export default async function Day({ day, month, year }: MonthProps) {
  const today = new Date(year, month, day);
  const workoutTypes = await getTypes();

  return (
    <MobileDesktopSwitch
      desktop={
        <Link href={getMonthAndDayLink(month, day)}>
          <div className=" p-4">
            <div className="flex justify-between items-baseline min-h-16">
              <div>{day}</div>
              <div className="tooltip" data-tip="Add workout">
                <AddWorkoutDialog
                  date={today}
                  workoutTypes={workoutTypes}
                  buttonStyle="plus"
                />
              </div>
            </div>
          </div>
        </Link>
      }
      mobile={
        <div className="flex justify-center">
          <Link href={getMonthAndDayLink(month, day)} className="flex">
            <div className="p-2">{day}</div>
          </Link>
        </div>
      }
    />
  );
}
