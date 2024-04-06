"use server";
import AddWorkoutForm from "./addWorkoutForm";

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
      <h1 className="text-4xl font-bold mb-6">Add workout</h1>
      <h3 className="text-xl">
        {date.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h3>
      <AddWorkoutForm date={date} />
    </div>
  );
}
