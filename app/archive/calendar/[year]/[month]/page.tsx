import Calendar from './calendar';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
  };
}) {
  const date = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);

  return (
    <div>
      <h1 className="text-2xl md:text-4xl  font-bold mb-6">Calendar</h1>
      <Calendar date={date} />
    </div>
  );
}
