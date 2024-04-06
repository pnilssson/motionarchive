import Link from "next/link";
import { useState, useEffect } from "react";

interface MonthProps {
  day: number;
  month: number;
  year: number;
}

export default function Day({ day, month, year }: MonthProps) {
  const [today, setToday] = useState(new Date(year, month, day));

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
            <Link href={`${getDateParameter()}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex md:hidden min-h-16">
        <Link
          href={`${getDateParameter()}`}
          className="flex justify-between items-baseline">
          <div>{day}</div>
        </Link>
      </div>
    </>
  );
}
