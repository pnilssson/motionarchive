import Calendar from "./calendar";

interface PageProps {
  params: {
    year: string;
    month: string;
  };
}

export default async function Page({ params }: PageProps) {
  const date = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Calendar</h1>
      <Calendar date={date} />
    </div>
  );
}
