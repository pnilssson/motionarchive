import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';
import { Card, Flex } from '@radix-ui/themes';

export default function MobileDay({
  day,
  month,
}: {
  day: number;
  month: number;
}) {
  return (
    <Flex>
      <Link href={getMonthAndDayLink(month, day)} className="w-full">
        <Card>
          <Flex justify="center">{day}</Flex>
        </Card>
      </Link>
    </Flex>
  );
}
