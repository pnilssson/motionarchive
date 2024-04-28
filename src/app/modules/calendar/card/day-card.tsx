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
  function isToday(): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear()
    );
  }

  return (
    <Card
      className={clsx(classes && `${classes}`, {
        'bg-blue-300': isToday(),
      })}
    >
      {children}
    </Card>
  );
}
