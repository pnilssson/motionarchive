import Link from "next/link";
import { getDateParameter } from "@/lib/utils/date";
import { getTypes } from "@/lib/utils/db";
import dynamic from "next/dynamic";

const AddWorkoutDialog = dynamic(
  () => import("@/lib/components/add-workout-dialog"),
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
    <>
      <Link href={`/archive/${getDateParameter(today)}`}>
        <div className="hidden md:block min-h-16">
          <div className="flex justify-between items-baseline">
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
      <div className="flex justify-center md:hidden">
        <Link href={`/archive/${getDateParameter(today)}`} className="flex">
          <div>{day}</div>
        </Link>
      </div>
    </>
  );
}
