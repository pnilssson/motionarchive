import MonthPicker from '@/src/modules/calendar/month-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default async function Page({
  monthName,
  month,
  year,
}: {
  monthName: string;
  month: number;
  year: number;
}) {
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
    <div className="flex gap-2 items-center">
      <Link href={`/archive/calendar/${getPreviousMonthDateParameter()}`}>
        <ChevronLeftIcon />
      </Link>
      <MonthPicker monthName={monthName} year={year} />
      <Link href={`/archive/calendar/${getNextMonthDateParameter()}`}>
        <ChevronRightIcon />
      </Link>
    </div>
  );
}
