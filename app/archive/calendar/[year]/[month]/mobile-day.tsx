import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';

export default function MobileDay({
  day,
  month,
}: {
  day: number;
  month: number;
}) {
  return (
    <div className="flex justify-center">
      <Link href={getMonthAndDayLink(month, day)} className="flex">
        <div className="p-2">{day}</div>
      </Link>
    </div>
  );
}
