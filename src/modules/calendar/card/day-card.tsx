import { Card } from '@/src/components/ui/card';
import { IllnessResponse } from '@/src/types/types';
import clsx from 'clsx';

export function DayCard({
  day,
  month,
  year,
  illness,
  children,
  classes,
}: {
  day: number;
  month: number;
  year: number;
  illness: IllnessResponse[];
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
      className={clsx(classes && `${classes}`, 'p-2 sm:p-3', {
        'bg-blue-200': isToday(),
      }, {
        'bg-red-200': illness.length > 0 && !isToday(),
      })}
    >
      {children}
    </Card>
  );
}
