import Link from 'next/link';
import { getMonthAndDayLink } from '@/app/lib/utils';
import MobileDesktopSwitch from '@/app/components/mobile-desktop-switch';

export default function Day({ day, month }: { day: number; month: number }) {
  function desktopDay() {
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

  function mobileDay() {
    return (
      <div className="flex justify-center">
        <Link href={getMonthAndDayLink(month, day)} className="flex">
          <div className="p-2">{day}</div>
        </Link>
      </div>
    );
  }

  return <MobileDesktopSwitch desktop={desktopDay()} mobile={mobileDay()} />;
}
