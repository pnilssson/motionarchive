import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';
import { Box, Flex } from '@radix-ui/themes';

export default function MobileDay({
  day,
  month,
}: {
  day: number;
  month: number;
}) {
  return (
    <Flex justify={'center'}>
      <Link href={getMonthAndDayLink(month, day)} className="flex">
        <Box p={'2'}>{day}</Box>
      </Link>
    </Flex>
  );
}
