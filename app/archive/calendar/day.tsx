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

  return (
    <div>
      <div>{day}</div>
      <div>{today.toLocaleDateString()}</div>
    </div>
  );
}
