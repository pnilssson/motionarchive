import { useState, useEffect } from "react";
import Day from "./day";
import clsx from "clsx";

interface MonthProps {
  date: Date;
}

export default function Month({ date }: MonthProps) {
  const [days, setDays] = useState<number[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

  useEffect(() => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    // Remove 1 to make Monday the first day of the week
    let offset = firstDayOfMonth.getDay() - 1;

    setFirstDayOfWeek(offset);

    // Generate an array of days in the month
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    // Add empty days to the beginning of the array based on the offset
    const shiftedDays = [...Array(offset).fill(null), ...daysArray];
    setDays(shiftedDays);
  }, [date]);

  const isWeekend = (day: any) => {
    if (day === null) return false;
    const weekday = (firstDayOfWeek + day) % 7;
    return weekday === 6 || weekday === 0; // Sunday (0) or Saturday (6)
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      <p>Mon</p>
      <p>Tue</p>
      <p>Wed</p>
      <p>Thu</p>
      <p>Fri</p>
      <p>Sat</p>
      <p>Sun</p>
      {days.map((day, i) => (
        <div
          key={i}
          className={clsx(
            " p-4 rounded-md",
            {
              "bg-red-200": isWeekend(day),
            },
            {
              "bg-gray-100": !isWeekend(day),
            }
          )}>
          {day && (
            <Day day={day} month={date.getMonth()} year={date.getFullYear()} />
          )}
        </div>
      ))}
    </div>
  );
}
