import { Card } from '@radix-ui/themes';
import clsx from 'clsx';

export async function DayCard({
  day,
  date,
  children,
  classes,
}: {
  day: number;
  date: Date;
  children: React.ReactNode;
  classes?: string;
}) {
  function getDateOfDay(day: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), day);
  }

  function isWeekend(day: number): boolean {
    const dayOfWeek = getDateOfDay(day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  function isToday(day: number): boolean {
    const today = new Date();
    const dateOfDay = getDateOfDay(day);
    return (
      dateOfDay.getDate() === today.getDate() &&
      dateOfDay.getMonth() === today.getMonth() &&
      dateOfDay.getFullYear() === today.getFullYear()
    );
  }
  return (
    <Card
      className={clsx(classes && `${classes}`, {
        'bg-red-200': isWeekend(day) && !isToday(day),
        'bg-gray-100': !isWeekend(day) && !isToday(day),
        'bg-blue-200': isToday(day),
        'bg-transparent': day === null,
      })}
    >
      {children}
    </Card>
  );
}
