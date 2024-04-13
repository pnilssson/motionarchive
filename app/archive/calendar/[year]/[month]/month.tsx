import Day from "./day";
import clsx from "clsx";

interface MonthProps {
  date: Date;
}

export default function Month({ date }: MonthProps) {
  let days: any[] = [];
  setDays();

  function setDays() {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let offset = firstDayOfMonth.getDay(); // Get the day of the week for the first day

    // Adjust the offset so Monday becomes the first day of the week
    if (offset === 0) {
      offset = 6; // Sunday
    } else {
      offset -= 1; // Shift other days by one position
    }

    // Generate an array of days in the month
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    // Add empty days to the beginning of the array based on the offset
    days = [...Array(offset).fill(null), ...daysArray];
  }

  function isWeekend(day: number): boolean {
    const dayOfWeek = getDayOfWeek(day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  function isToday(day: number): boolean {
    const today = new Date();
    const dayOfWeek = getDayOfWeek(day);
    return (
      dayOfWeek.getDate() === today.getDate() &&
      dayOfWeek.getMonth() === today.getMonth() &&
      dayOfWeek.getFullYear() === today.getFullYear()
    );
  }

  function getDayOfWeek(day: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), day);
  }

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
            "rounded-md",
            {
              "bg-red-200": isWeekend(day) && !isToday(day),
            },
            {
              "bg-gray-100": !isWeekend(day) && !isToday(day),
            },
            { "bg-blue-200": isToday(day) },
            { "bg-transparent": day === null }
          )}>
          {day && (
            <Day day={day} month={date.getMonth()} year={date.getFullYear()} />
          )}
        </div>
      ))}
    </div>
  );
}