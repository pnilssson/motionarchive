import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("./calendar"), { ssr: false });

export default function Page() {
  console.log(process.env.NEXT_PUBLIC_URL);
  return (
    <div>
      <h1 className="text-4xl font-bold">Calendar</h1>
      <Calendar />
    </div>
  );
}
