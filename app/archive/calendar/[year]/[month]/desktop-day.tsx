import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';

export default function DesktopDay({
  day,
  month,
}: {
  day: number;
  month: number;
}) {
  return (
    <Link href={getMonthAndDayLink(month, day)}>
      <div className=" p-4">
        <div className="flex min-h-16">
          <div>{day}</div>
        </div>
      </div>
    </Link>
  );
}
