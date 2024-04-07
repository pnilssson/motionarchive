import { getTypes } from "@/lib/utils/db";
import Calendar from "./calendar";

export default async function Page() {
  const workoutTypes = await getTypes();

  return (
    <div>
      <h1 className="text-4xl font-bold">Calendar</h1>
      <Calendar workoutTypes={workoutTypes} />
    </div>
  );
}
