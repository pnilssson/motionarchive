import Calendar from '@/src/modules/calendar/calendar';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
  };
}) {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Calendar</h1>
      <Calendar month={parseInt(params.month)} year={parseInt(params.year)} />
    </div>
  );
}
