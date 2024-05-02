import MonthPicker from '@/src/modules/calendar/month-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Flex, Link, Tooltip } from '@radix-ui/themes';

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
    <Flex align={'center'} mb={'5'} gap="2">
      <Tooltip content="Previous month">
        <Link href={`/archive/calendar/${getPreviousMonthDateParameter()}`}>
          <ChevronLeftIcon />
        </Link>
      </Tooltip>
      <MonthPicker monthName={monthName} year={year} />
      <Tooltip content="Next month">
        <Link href={`/archive/calendar/${getNextMonthDateParameter()}`}>
          <ChevronRightIcon />
        </Link>
      </Tooltip>
    </Flex>
  );
}
