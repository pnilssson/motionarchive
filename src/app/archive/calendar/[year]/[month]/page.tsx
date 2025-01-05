import Calendar from '@/src/modules/calendar/calendar';
import CalendarNavigation from '@/src/modules/calendar/calendar-navigation';

export default async function Page(props: {
  params: Promise<{
    year: string;
    month: string;
  }>;
}) {
  const params = await props.params;
  const month = parseInt(params.month);
  const year = parseInt(params.year);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Calendar</h1>
        <CalendarNavigation
          monthName={new Date(year, month - 1, 1).toLocaleString(undefined, {
            month: 'long',
          })}
          month={month}
          year={year}
        />
      </div>
      <Calendar month={month} year={year} />
    </div>
  );
}
