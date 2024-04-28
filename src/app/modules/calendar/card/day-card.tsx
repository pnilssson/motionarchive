import { Card } from '@radix-ui/themes';
import clsx from 'clsx';

export async function DayCard({
  day,
  month,
  year,
  children,
  classes,
}: {
  day: number;
  month: number;
  year: number;
  children: React.ReactNode;
  classes?: string;
}) {
  function getDateOfDay(day: number): Date {
    return new Date(year, month, day);
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
        'bg-blue-400': isToday(day),
      })}
    >
      {children}
    </Card>
  );
}
