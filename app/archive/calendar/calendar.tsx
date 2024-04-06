"use client";

import { useState } from "react";
import Month from "./month";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [monthName, setMonthName] = useState(
    date.toLocaleString(undefined, { month: "long" })
  );
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const updateDate = (newMonth: number, newYear: number) => {
    const newDate = new Date(newYear, newMonth, 1);
    setDate(newDate);
    setMonth(newMonth);
    setYear(newYear);
    setMonthName(newDate.toLocaleString(undefined, { month: "long" }));
  };

  const handlePrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    updateDate(newMonth, newYear);
  };

  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    updateDate(newMonth, newYear);
  };

  return (
    <div>
      <div className="flex items-baseline my-6">
        <div className="tooltip" data-tip="Previous month">
          <button onClick={handlePrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-xl px-4">{`${monthName} ${year}`}</h3>
        <div className="tooltip" data-tip="Next month">
          <button onClick={handleNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <Month date={date} /> {/* Pass the first date of the month as a prop */}
    </div>
  );
}
