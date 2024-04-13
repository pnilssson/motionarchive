import Month from "./month";
import Link from "next/link";

interface ComponentProps {
  date: Date;
}

export default function Component({ date }: ComponentProps) {
  var monthName = date.toLocaleString(undefined, { month: "long" });
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  function getPreviousMonthDateParameter() {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    return `${newYear}/${newMonth}`;
  }

  function getNextMonthDateParameter() {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    return `${newYear}/${newMonth}`;
  }

  return (
    <>
      <div className="flex items-baseline mb-6">
        <div className="tooltip" data-tip="Previous month">
          <Link href={`/archive/calendar/${getPreviousMonthDateParameter()}`}>
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
          </Link>
        </div>
        <h3 className="text-xl px-4">{`${monthName} ${year}`}</h3>
        <div className="tooltip" data-tip="Next month">
          <Link href={`/archive/calendar/${getNextMonthDateParameter()}`}>
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
          </Link>
        </div>
      </div>
      <Month date={date} />
    </>
  );
}
