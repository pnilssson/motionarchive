import { useState, useEffect } from "react";
import Day from "./day";

interface MonthProps {
  date: Date;
}

export default function Month({ date }: MonthProps) {
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, index) => index + 1));
  }, [date]);

  return (
    <div className="grid grid-cols-7">
      {days.map((day, i) => (
        <div key={day} className="bg-gray-50 p-4">
          <Day day={i + 1} month={date.getMonth()} year={date.getFullYear()} />
        </div>
      ))}
    </div>
  );
}
