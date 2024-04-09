import { createDateFromString } from "@/lib/utils/date";
import DailyOverview from "./daily-overview";
import { getTypes } from "@/lib/utils/db";
import AddWorkoutDialog from "@/lib/components/add-workout-dialog";

interface PageProps {
  params: {
    date: string;
  };
}

export default async function Page({ params }: PageProps) {
  const workoutTypes = await getTypes();
  const date = createDateFromString(params.date);

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
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
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
