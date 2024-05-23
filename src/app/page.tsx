import Image from 'next/image';
import Footer from '../components/footer';
import GetStartedButton from '../components/buttons/get-started-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-16 md:mt-24">
        <div className="flex flex-col gap-6 items-center max-w-[720px]">
          <h1 className="text-4xl md:text-6xl text-center font-bold">
            Time to say goodbye to coffee-stained notes.
          </h1>
          <div className="text-center max-w-[560px]">
            Motion archive is a simple yet powerful online tool for keeping all
            training related notes in one place.
          </div>
          <div className="mx-auto">
            <GetStartedButton />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Card className="shadow-md max-w-[960px]">
          <Image
            className="rounded-lg"
            src={'/calendar_example.jpg'}
            alt="calendar"
            width={1177}
            height={718}
          />
        </Card>
      </div>
      <div className="flex flex-col justify-center mt-16 md:mt-24">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-4xl font-bold text-center">Our tools</h2>
          <p className="text-center">
            We are not trying to impress you with unncessary features. We
            believe in keeping it simple.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-auto">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {' '}
                Use the calendar to get an overlook of your latest training
                sessions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personal Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Keep track of your personal records and the progression of them.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>See trends in your training using the dashboard.</p>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="bg-rose-600 text-slate-50">
                Coming soon
              </Badge>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
