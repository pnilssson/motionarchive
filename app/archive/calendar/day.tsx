import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { WorkoutTypesContext } from "./calendar";
import AddWorkoutDialog from "@/components/addWorkoutDialog";

interface MonthProps {
  day: number;
  month: number;
  year: number;
}

export default function Day({ day, month, year }: MonthProps) {
  const [today, setToday] = useState(new Date(year, month, day));
  const workoutTypes = useContext(WorkoutTypesContext);

  useEffect(() => {
    setToday(new Date(year, month, day));
  }, [day, month, year]);

  function getDateParameter() {
    const dayString = day < 10 ? "0" + day.toString() : day.toString();
    const monthString = month < 10 ? "0" + month.toString() : month.toString();
    const yearString = year.toString();

    return dayString + monthString + yearString;
  }

  return (
    <>
      <div className="hidden md:block min-h-16">
        <div className="flex justify-between items-baseline">
          <div>{day}</div>
          <div className="tooltip" data-tip="Add workout">
            <AddWorkoutDialog date={today} workoutTypes={workoutTypes} />
          </div>
        </div>
      </div>
      <div className="flex justify-center md:hidden">
        <Link href={`${getDateParameter()}`} className="flex">
          <div>{day}</div>
        </Link>
      </div>
    </>
  );
}
