"use server";

import AddWorkoutForm from "./addWorkoutForm";
import DailyOverview from "./dailyOverview";

interface PageProps {
  params: {
    date: string;
  };
}

export default async function Page({ params }: PageProps) {
  const date = createDateFromString();
  function createDateFromString(): Date {
    const day = parseInt(params.date.substring(0, 2));
    const month = parseInt(params.date.substring(2, 4)) - 1;
    const year = parseInt(params.date.substring(4, 8));
    return new Date(year, month, day);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        {date.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>
      <div className="">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3">
            <DailyOverview />
          </div>
          <div className="md:w-1/3">
            <h3 className="text-xl">Add workout</h3>
            <AddWorkoutForm date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
