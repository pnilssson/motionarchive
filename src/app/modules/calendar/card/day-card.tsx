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
