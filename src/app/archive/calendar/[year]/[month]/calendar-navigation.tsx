import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Flex, Link, Text, Tooltip } from '@radix-ui/themes';

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
    <Flex align={'center'} mb={'5'}>
      <Tooltip content="Previous month">
        <Link href={`/archive/calendar/${getPreviousMonthDateParameter()}`}>
          <ChevronLeftIcon />
        </Link>
      </Tooltip>
      <Text
        size={{ initial: '3', md: '5' }}
        mx={'3'}
      >{`${monthName} ${year}`}</Text>
      <Tooltip content="Next month">
        <Link href={`/archive/calendar/${getNextMonthDateParameter()}`}>
          <ChevronRightIcon />
        </Link>
      </Tooltip>
    </Flex>
  );
}
