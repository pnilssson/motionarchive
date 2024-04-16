import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';
import { Box, Flex } from '@radix-ui/themes';

export default function DesktopDay({
  day,
  month,
}: {
  day: number;
  month: number;
}) {
  return (
    <Link href={getMonthAndDayLink(month, day)}>
      <Box p={'4'}>
        <Flex className="min-h-14">
          <Box>{day}</Box>
        </Flex>
      </Box>
    </Link>
  );
}
