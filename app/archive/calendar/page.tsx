import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("./calendar"), { ssr: false });

export default function Page() {
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log(process.env.NODE_ENV);
  return (
    <div>
      <h1 className="text-4xl font-bold">Calendar</h1>
      <Calendar />
    </div>
  );
}
